/**
 * FitWay Pinterest API v5 Auto-Publisher
 *
 * Manages OAuth 2.0 authentication (with automatic refresh token rotation),
 * board discovery, queue validation, and scheduled Pin publishing via POST /v5/pins.
 *
 * Credentials & tokens are stored strictly in gitignored `credentials/`:
 *   - credentials/pinterest_app.json   ({ "app_id": "...", "app_secret": "...", "redirect_uri": "http://localhost:8787/callback" })
 *   - credentials/pinterest_token.json (auto-created by --auth and auto-refreshed)
 *   - credentials/pinterest_boards.json (auto-cached by --boards)
 *
 * Usage:
 *   node scripts/pinterest/index.js --auth
 *   node scripts/pinterest/index.js --code <AUTHORIZATION_CODE>
 *   node scripts/pinterest/index.js --boards
 *   node scripts/pinterest/index.js --validate
 *   node scripts/pinterest/index.js --publish-next [--dry-run] [--id <pin-id>] [--sandbox] [--force]
 */

const fs = require('fs');
const path = require('path');
const http = require('http');
const crypto = require('crypto');

const PROJECT_ROOT = path.resolve(__dirname, '../..');
const CREDENTIALS_DIR = path.join(PROJECT_ROOT, 'credentials');
const APP_CONFIG_FILE = path.join(CREDENTIALS_DIR, 'pinterest_app.json');
const PROD_TOKEN_FILE = path.join(CREDENTIALS_DIR, 'pinterest_token.json');
const SANDBOX_TOKEN_FILE = path.join(CREDENTIALS_DIR, 'pinterest_sandbox_token.json');
const PROD_BOARDS_CACHE_FILE = path.join(CREDENTIALS_DIR, 'pinterest_boards.json');
const SANDBOX_BOARDS_CACHE_FILE = path.join(CREDENTIALS_DIR, 'pinterest_sandbox_boards.json');

function getTokenFile(isSandbox) {
    return isSandbox ? SANDBOX_TOKEN_FILE : PROD_TOKEN_FILE;
}

function getBoardsCacheFile(isSandbox) {
    return isSandbox ? SANDBOX_BOARDS_CACHE_FILE : PROD_BOARDS_CACHE_FILE;
}

function getApiBase(isSandbox) {
    return isSandbox ? SANDBOX_API_BASE : PROD_API_BASE;
}

const QUEUE_FILE = path.join(__dirname, 'queue.json');
const ASSETS_DIR = path.join(__dirname, 'assets');
const EXISTING_PINS_FILE = path.join(
    PROJECT_ROOT,
    '.agents/skills/fitway-social-generator/references/existing-pins.md'
);

const DEFAULT_REDIRECT_URI = 'http://localhost:8787/callback';
const SCOPES = 'boards:read,boards:write,pins:read,pins:write';
const PROD_API_BASE = 'https://api.pinterest.com/v5';
const SANDBOX_API_BASE = 'https://api-sandbox.pinterest.com/v5';

const VALID_BOARDS = [
    'Muscle Building & Hypertrophy',
    'Fitness Calculators & Tools',
    'Stretching & Mobility Routines',
    'Calorie Deficit & Fat Loss',
    'Nutrition & Macro Tracking'
];

function parseArgs(argv) {
    const args = { _: [] };
    for (let i = 0; i < argv.length; i++) {
        const token = argv[i];
        if (token.startsWith('--')) {
            const key = token.slice(2);
            const next = argv[i + 1];
            if (next && !next.startsWith('--')) {
                args[key] = next;
                i++;
            } else {
                args[key] = true;
            }
        } else {
            args._.push(token);
        }
    }
    return args;
}

function ensureDir(dirPath) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
}

function readJson(filePath) {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function writeJson(filePath, data) {
    ensureDir(path.dirname(filePath));
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
}

function loadAppConfig() {
    let fileConfig = {};
    if (fs.existsSync(APP_CONFIG_FILE)) {
        fileConfig = readJson(APP_CONFIG_FILE);
    }

    const appId = process.env.PINTEREST_APP_ID || fileConfig.app_id;
    const appSecret = process.env.PINTEREST_APP_SECRET || fileConfig.app_secret;
    const redirectUri =
        process.env.PINTEREST_REDIRECT_URI ||
        fileConfig.redirect_uri ||
        DEFAULT_REDIRECT_URI;

    if (!appId || !appSecret) {
        throw new Error(
            `Missing Pinterest App credentials. Create ${APP_CONFIG_FILE} with:\n` +
            JSON.stringify(
                {
                    app_id: 'YOUR_PINTEREST_APP_ID',
                    app_secret: 'YOUR_PINTEREST_APP_SECRET',
                    redirect_uri: DEFAULT_REDIRECT_URI
                },
                null,
                2
            )
        );
    }

    return {
        appId: String(appId).trim(),
        appSecret: String(appSecret).trim(),
        redirectUri: String(redirectUri).trim()
    };
}

function buildBasicAuthHeader(appId, appSecret) {
    const encoded = Buffer.from(`${appId}:${appSecret}`, 'utf8').toString('base64');
    return `Basic ${encoded}`;
}

function saveTokenResponse(tokenData, isSandbox = false) {
    const tokenFile = getTokenFile(isSandbox);
    const nowSec = Math.floor(Date.now() / 1000);
    const existing = fs.existsSync(tokenFile) ? readJson(tokenFile) : {};

    const payload = {
        access_token: tokenData.access_token,
        token_type: tokenData.token_type || 'bearer',
        refresh_token: tokenData.refresh_token || existing.refresh_token || null,
        scope: tokenData.scope || existing.scope || SCOPES,
        expires_in: tokenData.expires_in || null,
        expires_at: tokenData.expires_in
            ? nowSec + Number(tokenData.expires_in)
            : tokenData.expires_at || existing.expires_at || null,
        refresh_token_expires_in: tokenData.refresh_token_expires_in || null,
        refresh_token_expires_at: tokenData.refresh_token_expires_in
            ? nowSec + Number(tokenData.refresh_token_expires_in)
            : tokenData.refresh_token_expires_at || existing.refresh_token_expires_at || null,
        updated_at: new Date().toISOString()
    };

    writeJson(tokenFile, payload);
    return payload;
}

async function exchangeCodeForToken(code, isSandbox = false) {
    const { appId, appSecret, redirectUri } = loadAppConfig();
    const apiBase = getApiBase(isSandbox);
    const tokenFile = getTokenFile(isSandbox);
    const body = new URLSearchParams({
        grant_type: 'authorization_code',
        code: code.trim(),
        redirect_uri: redirectUri
    });

    const res = await fetch(`${apiBase}/oauth/token`, {
        method: 'POST',
        headers: {
            Authorization: buildBasicAuthHeader(appId, appSecret),
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: body.toString()
    });

    const data = await res.json();
    if (!res.ok) {
        throw new Error(`Token exchange failed (${res.status}): ${JSON.stringify(data)}`);
    }

    const saved = saveTokenResponse(data, isSandbox);
    console.log(`OAuth tokens saved to ${tokenFile}`);
    console.log(`Granted scope: ${saved.scope}`);
    return saved;
}

async function refreshAccessToken(tokenState, isSandbox = false) {
    if (!tokenState.refresh_token) {
        const flag = isSandbox ? ' --sandbox' : '';
        throw new Error(
            `Access token expired and no refresh_token is available. Run \`node scripts/pinterest/index.js --auth${flag}\` again.`
        );
    }

    const { appId, appSecret } = loadAppConfig();
    const apiBase = getApiBase(isSandbox);
    const body = new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: tokenState.refresh_token
    });

    const res = await fetch(`${apiBase}/oauth/token`, {
        method: 'POST',
        headers: {
            Authorization: buildBasicAuthHeader(appId, appSecret),
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: body.toString()
    });

    const data = await res.json();
    if (!res.ok) {
        throw new Error(`Token refresh failed (${res.status}): ${JSON.stringify(data)}`);
    }

    return saveTokenResponse(data, isSandbox);
}

async function getValidAccessToken(isSandbox = false) {
    const tokenFile = getTokenFile(isSandbox);
    if (!fs.existsSync(tokenFile)) {
        const flag = isSandbox ? ' --sandbox' : '';
        throw new Error(
            `Token file not found at ${tokenFile}. Run: node scripts/pinterest/index.js --auth${flag}`
        );
    }

    let tokenState = readJson(tokenFile);
    const nowSec = Math.floor(Date.now() / 1000);
    const bufferSec = 300; // Refresh 5 minutes before expiry

    if (tokenState.expires_at && nowSec >= tokenState.expires_at - bufferSec) {
        console.log('Refreshing expired Pinterest access token...');
        tokenState = await refreshAccessToken(tokenState, isSandbox);
    }

    return tokenState.access_token;
}

async function runInteractiveAuth(isSandbox = false) {
    const { appId, redirectUri } = loadAppConfig();
    const state = crypto.randomBytes(16).toString('hex');
    const authUrl = new URL('https://www.pinterest.com/oauth/');
    authUrl.searchParams.set('client_id', appId);
    authUrl.searchParams.set('redirect_uri', redirectUri);
    authUrl.searchParams.set('response_type', 'code');
    authUrl.searchParams.set('scope', SCOPES);
    authUrl.searchParams.set('state', state);

    const parsedRedirect = new URL(redirectUri);
    const isLocalhost =
        parsedRedirect.hostname === 'localhost' || parsedRedirect.hostname === '127.0.0.1';

    console.log('\n1. Open this URL in your browser and authorize FitWay Pinterest app:\n');
    console.log(authUrl.toString());
    console.log('');

    if (!isLocalhost) {
        console.log(
            '2. After approval, copy the `code` parameter from the redirect URL and run:\n' +
            '   node scripts/pinterest/index.js --code <AUTHORIZATION_CODE>\n'
        );
        return;
    }

    const port = Number(parsedRedirect.port || 80);
    const callbackPath = parsedRedirect.pathname || '/callback';

    await new Promise((resolve, reject) => {
        const server = http.createServer(async (req, res) => {
            try {
                const reqUrl = new URL(req.url, `http://localhost:${port}`);
                if (reqUrl.pathname !== callbackPath) {
                    res.writeHead(404);
                    res.end('Not found');
                    return;
                }

                const returnedState = reqUrl.searchParams.get('state');
                const code = reqUrl.searchParams.get('code');
                const error = reqUrl.searchParams.get('error');

                if (error) {
                    res.writeHead(400, { 'Content-Type': 'text/plain' });
                    res.end(`Authorization error: ${error}`);
                    server.close();
                    reject(new Error(`Pinterest authorization denied: ${error}`));
                    return;
                }

                if (!code || returnedState !== state) {
                    res.writeHead(400, { 'Content-Type': 'text/plain' });
                    res.end('Missing code or state mismatch.');
                    server.close();
                    reject(new Error('OAuth callback missing code or state mismatch.'));
                    return;
                }

                await exchangeCodeForToken(code, isSandbox);
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end(
                    '<h2>Pinterest OAuth connected for FitWay!</h2><p>You can close this tab and return to the terminal.</p>'
                );
                server.close();
                if (typeof server.closeAllConnections === 'function') {
                    server.closeAllConnections();
                }
                resolve();
            } catch (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end(err.message);
                server.close();
                reject(err);
            }
        });

        server.on('error', (err) => {
            console.log(
                `Could not bind local callback server on port ${port} (${err.message}).\n` +
                'Complete consent in the browser and run:\n' +
                '  node scripts/pinterest/index.js --code <AUTHORIZATION_CODE>\n'
            );
            resolve();
        });

        server.listen(port, () => {
            console.log(`Waiting for OAuth callback on ${redirectUri} ...`);
        });
    });
}

async function fetchBoards(isSandbox = false) {
    const apiBase = getApiBase(isSandbox);
    const cacheFile = getBoardsCacheFile(isSandbox);
    const accessToken = await getValidAccessToken(isSandbox);
    const res = await fetch(`${apiBase}/boards?page_size=100`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });

    const data = await res.json();
    if (!res.ok) {
        throw new Error(`GET /v5/boards failed (${res.status}): ${JSON.stringify(data)}`);
    }

    const boards = (data.items || []).map((b) => ({
        id: b.id,
        name: b.name,
        privacy: b.privacy,
        pin_count: b.pin_count ?? null
    }));

    writeJson(cacheFile, {
        fetched_at: new Date().toISOString(),
        boards
    });

    return boards;
}

function getContentTypeForImage(imagePath) {
    const ext = path.extname(imagePath).toLowerCase();
    if (ext === '.png') return 'image/png';
    if (ext === '.jpg' || ext === '.jpeg') return 'image/jpeg';
    throw new Error(
        `Unsupported image format "${ext}" for Pinterest image_base64 (${imagePath}). Use .png or .jpg/.jpeg (convert WebP with: sips -s format png input.webp --out output.png).`
    );
}

function validatePinEntry(pin) {
    const errors = [];

    if (!pin.id) errors.push('Missing pin.id');
    if (!pin.board || !VALID_BOARDS.includes(pin.board)) {
        errors.push(`Invalid or unknown board "${pin.board}". Expected one of: ${VALID_BOARDS.join(', ')}`);
    }
    if (!pin.title || pin.title.length > 100) {
        errors.push(`Title must be 1-100 chars (got ${pin.title ? pin.title.length : 0})`);
    }
    if (!pin.description || pin.description.length > 500) {
        errors.push(`Description must be 1-500 chars (got ${pin.description ? pin.description.length : 0})`);
    }
    if (pin.alt_text && pin.alt_text.length > 500) {
        errors.push(`Alt text must be <= 500 chars (got ${pin.alt_text.length})`);
    }
    if (!pin.link || !pin.link.startsWith('https://fitway.best/')) {
        errors.push(`Link must start with https://fitway.best/ (got "${pin.link}")`);
    }

    const combinedText = `${pin.title || ''} ${pin.description || ''} ${pin.alt_text || ''}`;
    if (combinedText.includes('—') || combinedText.includes('–')) {
        errors.push('Humanizer violation: em dash (—) or en dash (–) detected in pin copy');
    }

    const imagePath = pin.image ? path.resolve(ASSETS_DIR, pin.image) : null;
    if (!imagePath || !fs.existsSync(imagePath)) {
        errors.push(`Image file missing in scripts/pinterest/assets/: ${pin.image || '(unset)'}`);
    } else {
        try {
            getContentTypeForImage(imagePath);
        } catch (err) {
            errors.push(err.message);
        }
    }

    return { errors, imagePath };
}

function validateQueue() {
    if (!fs.existsSync(QUEUE_FILE)) {
        throw new Error(`Queue file not found: ${QUEUE_FILE}`);
    }
    const queue = readJson(QUEUE_FILE);
    const pins = queue.pins || [];

    if (pins.length === 0) {
        console.log('Queue is empty (0 pins).');
        return { queue, valid: true };
    }

    let hasErrors = false;
    for (const pin of pins) {
        if (pin.status === 'published') continue;
        const { errors } = validatePinEntry(pin);
        if (errors.length > 0) {
            hasErrors = true;
            console.log(`[INVALID] ${pin.id || '(no id)'} (${pin.status}):`);
            for (const err of errors) {
                console.log(`  - ${err}`);
            }
        } else {
            console.log(`[READY] ${pin.id} -> ${pin.board} (${pin.scheduled_for || 'immediate'})`);
        }
    }

    return { queue, valid: !hasErrors };
}

function appendToExistingPinsRegistry(pin, publishedPinId) {
    if (!fs.existsSync(EXISTING_PINS_FILE)) return;
    let content = fs.readFileSync(EXISTING_PINS_FILE, 'utf8');

    const cleanPath = pin.link.replace('https://fitway.best', '').split('?')[0];
    const urlObj = new URL(pin.link);
    const utmCampaign = urlObj.searchParams.get('utm_campaign') || pin.id;
    if (content.includes(`pin/${publishedPinId}`) || content.includes(`\`${utmCampaign}\``)) {
        return;
    }

    const rowMatches = content.match(/^\| \d+ \|/gm) || [];
    const nextIndex = rowMatches.length + 1;
    const safeTitle = pin.title.replace(/\|/g, '-');
    const note = (pin.visual_angle || 'Auto-published Pin via Pinterest API v5').replace(/\|/g, '-');
    const newRow = `| ${nextIndex} | **${safeTitle}** | \`${pin.board}\` | \`${cleanPath}\` | \`${utmCampaign}\` | ${note} (\`pin/${publishedPinId}\`) |`;

    content = content.trimEnd() + '\n' + newRow + '\n';
    content = content.replace(
        /Всего опубликовано пинов: \*\*\d+\*\*/,
        `Всего опубликовано пинов: **${nextIndex}**`
    );
    content = content.replace(
        /## Опубликованные пины \(\d+\)/,
        `## Опубликованные пины (${nextIndex})`
    );
    content = content.replace(
        /Последняя сверка: \d{4}-\d{2}-\d{2}/,
        `Последняя сверка: ${new Date().toISOString().slice(0, 10)}`
    );

    fs.writeFileSync(EXISTING_PINS_FILE, content, 'utf8');
}

async function resolveBoardId(boardName, isSandbox = false) {
    const apiBase = getApiBase(isSandbox);
    const cacheFile = getBoardsCacheFile(isSandbox);
    if (fs.existsSync(cacheFile)) {
        const cache = readJson(cacheFile);
        const match = (cache.boards || []).find((b) => b.name === boardName);
        if (match) return match.id;
    }

    const boards = await fetchBoards(isSandbox);
    const match = boards.find((b) => b.name === boardName);
    if (match) return match.id;

    if (isSandbox) {
        const sandboxBoardName = `${boardName} (Sandbox)`;
        const existingSandbox = boards.find((b) => b.name === sandboxBoardName);
        if (existingSandbox) return existingSandbox.id;

        console.log(`Creating Sandbox board "${sandboxBoardName}"...`);
        const accessToken = await getValidAccessToken(true);
        const res = await fetch(`${apiBase}/boards`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: sandboxBoardName,
                privacy: 'PUBLIC'
            })
        });
        const created = await res.json();
        if (!res.ok) {
            throw new Error(`POST /v5/boards (Sandbox) failed (${res.status}): ${JSON.stringify(created)}`);
        }
        await fetchBoards(true);
        return created.id;
    }

    throw new Error(
        `Board "${boardName}" not found in Pinterest account. Available boards: ${boards.map((b) => b.name).join(', ')}`
    );
}

async function publishNext(args) {
    const isSandbox = Boolean(args.sandbox);
    const apiBase = getApiBase(isSandbox);
    const dryRun = Boolean(args['dry-run']);
    const force = Boolean(args.force);
    const targetId = typeof args.id === 'string' ? args.id : null;

    if (!fs.existsSync(QUEUE_FILE)) {
        throw new Error(`Queue file not found: ${QUEUE_FILE}`);
    }
    const queue = readJson(QUEUE_FILE);
    const pins = queue.pins || [];
    const now = new Date();

    const candidate = pins.find((pin) => {
        if (targetId) return pin.id === targetId;
        if (pin.status !== 'pending') return false;
        if (!force && pin.scheduled_for) {
            const sched = new Date(pin.scheduled_for);
            if (!Number.isNaN(sched.getTime()) && sched > now) {
                return false;
            }
        }
        return true;
    });

    if (!candidate) {
        console.log('No eligible pending pins ready for publishing.');
        return;
    }

    const { errors, imagePath } = validatePinEntry(candidate);
    if (errors.length > 0) {
        throw new Error(`Pin "${candidate.id}" failed validation:\n- ${errors.join('\n- ')}`);
    }

    const contentType = getContentTypeForImage(imagePath);
    const imageBase64 = fs.readFileSync(imagePath).toString('base64');

    if (dryRun) {
        console.log(`[DRY RUN] Would publish pin "${candidate.id}":`);
        console.log(`  Endpoint: ${apiBase}/pins`);
        console.log(`  Board:    ${candidate.board}`);
        console.log(`  Title:    ${candidate.title}`);
        console.log(`  Link:     ${candidate.link}`);
        console.log(`  Image:    ${candidate.image} (${contentType}, ${Math.round(imageBase64.length / 1024)} KB b64)`);
        return;
    }

    const boardId = (!isSandbox && candidate.board_id) || (await resolveBoardId(candidate.board, isSandbox));
    const accessToken = await getValidAccessToken(isSandbox);

    const payload = {
        board_id: boardId,
        title: candidate.title,
        description: candidate.description,
        link: candidate.link,
        alt_text: candidate.alt_text || candidate.title,
        media_source: {
            source_type: 'image_base64',
            content_type: contentType,
            data: imageBase64
        }
    };

    const res = await fetch(`${apiBase}/pins`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });

    const data = await res.json();
    if (!res.ok) {
        candidate.last_error = `${res.status}: ${JSON.stringify(data)}`;
        candidate.last_attempt_at = new Date().toISOString();
        writeJson(QUEUE_FILE, queue);
        throw new Error(`POST /v5/pins failed (${res.status}): ${JSON.stringify(data)}`);
    }

    if (isSandbox) {
        candidate.sandbox_tested_pin_id = data.id;
        candidate.sandbox_tested_at = new Date().toISOString();
        delete candidate.last_error;
        delete candidate.last_attempt_at;
        writeJson(QUEUE_FILE, queue);
        console.log(`Published Sandbox test pin "${candidate.id}" -> id=${data.id}`);
        return;
    }

    candidate.status = 'published';
    candidate.board_id = boardId;
    candidate.published_pin_id = data.id;
    candidate.pin_url = `https://www.pinterest.com/pin/${data.id}/`;
    candidate.published_at = new Date().toISOString();
    delete candidate.last_error;
    delete candidate.last_attempt_at;

    writeJson(QUEUE_FILE, queue);

    appendToExistingPinsRegistry(candidate, data.id);

    console.log(`Published pin "${candidate.id}" -> ${candidate.pin_url}`);
}

async function main() {
    const args = parseArgs(process.argv.slice(2));
    const isSandbox = Boolean(args.sandbox);

    if (args.auth) {
        await runInteractiveAuth(isSandbox);
        return;
    }

    if (typeof args.code === 'string') {
        await exchangeCodeForToken(args.code, isSandbox);
        return;
    }

    if (args.boards) {
        const boards = await fetchBoards(isSandbox);
        console.log(`FitWay Pinterest Boards (${isSandbox ? 'Sandbox' : 'Production'}):`);
        for (const b of boards) {
            console.log(`  - ${b.name} | id=${b.id} | pins=${b.pin_count} | privacy=${b.privacy}`);
        }
        return;
    }

    if (args.validate) {
        const { valid } = validateQueue();
        process.exit(valid ? 0 : 1);
    }

    if (args['publish-next']) {
        await publishNext(args);
        return;
    }

    console.log(
        'FitWay Pinterest API v5 Publisher\n\n' +
        'Commands:\n' +
        '  --auth                   Start OAuth 2.0 flow and save tokens\n' +
        '  --code <AUTH_CODE>       Exchange manual OAuth code for tokens\n' +
        '  --boards                 Fetch and cache board IDs\n' +
        '  --validate               Validate queue.json and local images\n' +
        '  --publish-next           Publish next due pending pin\n' +
        '    [--dry-run]            Validate and print payload without posting\n' +
        '    [--id <pin-id>]        Publish a specific pin from queue.json\n' +
        '    [--sandbox]            Target api-sandbox.pinterest.com\n' +
        '    [--force]              Ignore scheduled_for timestamp\n'
    );
}

main().catch((err) => {
    console.error(`Error: ${err.message}`);
    process.exit(1);
});
