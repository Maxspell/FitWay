/**
 * FitWay Google Indexing API Client
 *
 * Submits URLs directly to Google's Indexing API for rapid crawling and indexing.
 * Supports both Google Service Accounts and OAuth 2.0 with persistent token caching.
 *
 * Usage:
 *   # Submit one or more URLs:
 *   node scripts/indexing/index.js https://fitway.best/blog/my-post
 *   node scripts/indexing/index.js https://fitway.best/blog/post-1 https://fitway.best/workouts/workout-2
 *
 *   # Inspect indexing notification status for a URL:
 *   node scripts/indexing/index.js --status https://fitway.best/blog/my-post
 *
 *   # Submit URL deletion:
 *   node scripts/indexing/index.js --type URL_DELETED https://fitway.best/blog/old-post
 *
 *   # Submit from file (one URL per line):
 *   node scripts/indexing/index.js --file urls.txt
 *
 *   # Complete OAuth2 setup with authorization code:
 *   node scripts/indexing/index.js --code 4/0AY0e-g...
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { google } = require('googleapis');

// Project directories
const PROJECT_ROOT = path.resolve(__dirname, '../..');
const CREDENTIALS_DIR = path.join(PROJECT_ROOT, 'credentials');

const OAUTH_CLIENT_SECRET_FILE = path.join(CREDENTIALS_DIR, 'google_indexing_client_secret.json');
const OAUTH_TOKEN_FILE = path.join(CREDENTIALS_DIR, 'google_indexing_token.json');

const SCOPES = [
    'https://www.googleapis.com/auth/indexing',
    'https://www.googleapis.com/auth/webmasters'
];

/**
 * Searches for a Google Service Account JSON in the credentials directory.
 */
function findServiceAccountKey() {
    if (!fs.existsSync(CREDENTIALS_DIR)) return null;
    const files = fs.readdirSync(CREDENTIALS_DIR);
    for (const file of files) {
        if (file.endsWith('.json') && !file.includes('client_secret') && !file.includes('token')) {
            try {
                const fullPath = path.join(CREDENTIALS_DIR, file);
                const content = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
                if (content.type === 'service_account') {
                    return fullPath;
                }
            } catch (e) {
                // Ignore parse errors for non-JSON or malformed files
            }
        }
    }
    return null;
}

/**
 * Creates an OAuth2 client from client_secret.json.
 */
function createOAuth2Client() {
    if (!fs.existsSync(OAUTH_CLIENT_SECRET_FILE)) {
        throw new Error(`OAuth client secret file not found at: ${OAUTH_CLIENT_SECRET_FILE}`);
    }
    const credentials = JSON.parse(fs.readFileSync(OAUTH_CLIENT_SECRET_FILE, 'utf8'));
    const config = credentials.installed || credentials.web;
    if (!config) {
        throw new Error('Invalid client_secret.json: missing "installed" or "web" configuration');
    }
    const { client_secret, client_id, redirect_uris } = config;
    const redirectUri = (redirect_uris && redirect_uris[0]) || 'http://localhost';
    return new google.auth.OAuth2(client_id, client_secret, redirectUri);
}

/**
 * Saves refreshed OAuth tokens to disk.
 */
function saveTokens(tokens) {
    if (!fs.existsSync(CREDENTIALS_DIR)) {
        fs.mkdirSync(CREDENTIALS_DIR, { recursive: true });
    }
    let existingTokens = {};
    if (fs.existsSync(OAUTH_TOKEN_FILE)) {
        try {
            existingTokens = JSON.parse(fs.readFileSync(OAUTH_TOKEN_FILE, 'utf8'));
        } catch (_) {}
    }
    const merged = { ...existingTokens, ...tokens };
    fs.writeFileSync(OAUTH_TOKEN_FILE, JSON.stringify(merged, null, 2), 'utf8');
}

/**
 * Normalizes authorization code (in case user pasted full localhost redirect URL).
 */
function sanitizeAuthCode(rawCode) {
    if (!rawCode) return null;
    const trimmed = rawCode.trim();
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
        try {
            const parsed = new URL(trimmed);
            const codeParam = parsed.searchParams.get('code');
            if (codeParam) return codeParam;
        } catch (_) {}
    }
    return trimmed;
}

/**
 * Gets an authenticated client using Service Account or OAuth2.
 */
async function getAuthClient({ preferOAuth = false, authCode = null } = {}) {
    const cleanCode = sanitizeAuthCode(authCode);
    const serviceAccountPath = findServiceAccountKey();

    // 1. If service account is available and OAuth is not explicitly forced, try Service Account
    if (serviceAccountPath && !preferOAuth && !cleanCode && !fs.existsSync(OAUTH_TOKEN_FILE)) {
        try {
            const auth = new google.auth.GoogleAuth({
                keyFile: serviceAccountPath,
                scopes: ['https://www.googleapis.com/auth/indexing']
            });
            const client = await auth.getClient();
            // Validate service account by testing access
            return { client, type: 'Service Account', keyFile: path.basename(serviceAccountPath) };
        } catch (e) {
            console.log(`⚠️ Service Account initialization notice: ${e.message}`);
        }
    }

    // 2. OAuth 2.0 Flow
    const oAuth2Client = createOAuth2Client();

    // Listen for refreshed tokens and save them automatically
    oAuth2Client.on('tokens', (tokens) => {
        saveTokens(tokens);
    });

    // Check if code was provided via CLI argument
    if (cleanCode) {
        console.log('🔄 Exchanging authorization code for OAuth tokens...');
        const { tokens } = await oAuth2Client.getToken(cleanCode);
        saveTokens(tokens);
        oAuth2Client.setCredentials(tokens);
        console.log(`✅ OAuth tokens successfully obtained and cached in credentials/${path.basename(OAUTH_TOKEN_FILE)}`);
        return { client: oAuth2Client, type: 'OAuth 2.0 (New Token)' };
    }

    // Check if token file already exists
    if (fs.existsSync(OAUTH_TOKEN_FILE)) {
        try {
            const tokens = JSON.parse(fs.readFileSync(OAUTH_TOKEN_FILE, 'utf8'));
            oAuth2Client.setCredentials(tokens);
            return { client: oAuth2Client, type: 'OAuth 2.0 (Cached Token)' };
        } catch (e) {
            console.error(`⚠️ Failed to parse cached token: ${e.message}. Re-authenticating...`);
        }
    }

    // If Service Account is available, try it as fallback before requiring OAuth interactive prompt
    if (serviceAccountPath && !preferOAuth) {
        const auth = new google.auth.GoogleAuth({
            keyFile: serviceAccountPath,
            scopes: ['https://www.googleapis.com/auth/indexing']
        });
        const client = await auth.getClient();
        return { client, type: 'Service Account', keyFile: path.basename(serviceAccountPath) };
    }

    // 3. No token and no service account: need OAuth authorization
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
        prompt: 'consent'
    });

    console.log('\n============================================================');
    console.log('🔐 GOOGLE INDEXING API AUTHORIZATION REQUIRED');
    console.log('============================================================');
    console.log('1. Open this URL in your browser:\n');
    console.log(`   ${authUrl}\n`);
    console.log('2. Sign in with the Google Account that manages FitWay in Search Console.');
    console.log('3. Grant access. The browser will redirect to http://localhost/?code=...');
    console.log('4. Copy the code from the address bar or page, then run:');
    console.log(`   node scripts/indexing/index.js --code YOUR_CODE_HERE\n`);
    console.log('   (or paste it below if running interactively)\n');
    console.log('============================================================\n');

    if (process.stdin.isTTY) {
        const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
        const code = await new Promise((resolve) => {
            rl.question('Enter authorization code: ', (ans) => {
                rl.close();
                resolve(ans);
            });
        });

        if (code && code.trim()) {
            const { tokens } = await oAuth2Client.getToken(code.trim());
            saveTokens(tokens);
            oAuth2Client.setCredentials(tokens);
            console.log(`✅ Token saved to ${OAUTH_TOKEN_FILE}`);
            return { client: oAuth2Client, type: 'OAuth 2.0 (Interactive)' };
        }
    }

    throw new Error('Authorization required. Please authorize using the URL above and pass --code <code>.');
}

/**
 * Submits a URL notification to Google Indexing API.
 */
async function publishUrl(indexing, url, type = 'URL_UPDATED') {
    try {
        const res = await indexing.urlNotifications.publish({
            requestBody: {
                url: url,
                type: type
            }
        });
        return { success: true, data: res.data };
    } catch (err) {
        const details = err.response?.data?.error || err.message;
        return { success: false, error: details };
    }
}

/**
 * Gets URL metadata status from Google Indexing API.
 */
async function getUrlStatus(indexing, url) {
    try {
        const res = await indexing.urlNotifications.getMetadata({
            url: url
        });
        return { success: true, data: res.data };
    } catch (err) {
        const details = err.response?.data?.error || err.message;
        return { success: false, error: details };
    }
}

/**
 * CLI parser and main runner.
 */
async function main() {
    const args = process.argv.slice(2);
    let actionType = 'URL_UPDATED';
    let authCode = null;
    let preferOAuth = false;
    let statusUrl = null;
    let filePath = null;
    const urls = [];

    for (let i = 0; i < args.length; i++) {
        const arg = args[i];
        if (arg === '--code' && args[i + 1]) {
            authCode = args[++i];
        } else if (arg === '--oauth') {
            preferOAuth = true;
        } else if (arg === '--type' && args[i + 1]) {
            actionType = args[++i].toUpperCase();
        } else if (arg === '--status' && args[i + 1]) {
            statusUrl = args[++i];
        } else if (arg === '--file' && args[i + 1]) {
            filePath = args[++i];
        } else if (arg === '--help' || arg === '-h') {
            console.log(`
FitWay Google Indexing API Tool
--------------------------------
Usage:
  node scripts/indexing/index.js [options] [URLs...]

Options:
  --code <code>           Provide OAuth authorization code to generate token.json
  --oauth                 Force OAuth 2.0 authentication even if Service Account exists
  --type <TYPE>           Notification type: URL_UPDATED (default) or URL_DELETED
  --status <url>          Check last notification metadata for a URL
  --file <path>           Read URLs to index from a text file (one URL per line)
  --help, -h              Show this help message

Examples:
  node scripts/indexing/index.js https://fitway.best/blog/best-compound-exercises-muscle-growth
  node scripts/indexing/index.js --status https://fitway.best/blog/best-compound-exercises-muscle-growth
  node scripts/indexing/index.js https://fitway.best/workouts/workout-1 https://fitway.best/workouts/workout-2
            `);
            process.exit(0);
        } else if (!arg.startsWith('--')) {
            urls.push(arg);
        }
    }

    if (filePath) {
        const fullFilePath = path.resolve(process.cwd(), filePath);
        if (fs.existsSync(fullFilePath)) {
            const lines = fs.readFileSync(fullFilePath, 'utf8')
                .split('\n')
                .map(l => l.trim())
                .filter(l => l && !l.startsWith('#') && (l.startsWith('http://') || l.startsWith('https://')));
            urls.push(...lines);
        } else {
            console.error(`❌ File not found: ${fullFilePath}`);
            process.exit(1);
        }
    }

    if (!authCode && !statusUrl && urls.length === 0) {
        console.error('❌ Error: No URL provided to index or inspect.');
        console.error('Run "node scripts/indexing/index.js --help" for usage.');
        process.exit(1);
    }

    // Authenticate
    let authClientInfo;
    try {
        authClientInfo = await getAuthClient({ preferOAuth, authCode });
    } catch (err) {
        console.error(`\n❌ Authentication error: ${err.message}`);
        process.exit(1);
    }

    // If only --code was passed without URLs, finish early
    if (authCode && urls.length === 0 && !statusUrl) {
        console.log('✅ Authentication complete! Ready to submit URLs.');
        process.exit(0);
    }

    const indexing = google.indexing({
        version: 'v3',
        auth: authClientInfo.client
    });

    console.log(`\n🚀 Google Indexing API Client`);
    console.log(`   • Auth Method: ${authClientInfo.type}${authClientInfo.keyFile ? ` (${authClientInfo.keyFile})` : ''}`);
    console.log(`   • Action: ${statusUrl ? 'STATUS CHECK' : actionType}`);
    console.log(`   • Timestamp: ${new Date().toISOString()}\n`);

    // 1. Status Check
    if (statusUrl) {
        console.log(`🔎 Checking notification status for: ${statusUrl}`);
        const statusRes = await getUrlStatus(indexing, statusUrl);
        if (statusRes.success) {
            console.log('✅ Status Metadata:', JSON.stringify(statusRes.data, null, 2));
        } else {
            console.error('❌ Error checking status:', statusRes.error);
        }
        return;
    }

    // 2. Publish URLs
    let successCount = 0;
    let failureCount = 0;

    for (const url of urls) {
        console.log(`📤 Submitting [${actionType}]: ${url}`);
        const result = await publishUrl(indexing, url, actionType);

        if (result.success) {
            successCount++;
            const notifyTime = result.data.urlNotificationMetadata?.latestUpdate?.notifyTime;
            const timeInfo = notifyTime ? ` (Notification time: ${notifyTime})` : '';
            console.log(`   ✅ Success! Google Indexing API accepted notification.${timeInfo}`);
            if (result.data) {
                console.log(`   📄 Response:`, JSON.stringify(result.data));
            }
        } else {
            failureCount++;
            const errMsg = typeof result.error === 'object' ? JSON.stringify(result.error) : result.error;
            console.log(`   ❌ Failed: ${errMsg}`);

            // If Service Account failed due to API not enabled or 403, advise on solution
            if (String(errMsg).includes('SERVICE_DISABLED') || String(errMsg).includes('Indexing API has not been used')) {
                console.log(`\n💡 Tip: Web Search Indexing API is disabled on this Google Cloud project.`);
                console.log(`   To use Service Account seamlessly, open this link and click "Enable":`);
                console.log(`   https://console.developers.google.com/apis/api/indexing.googleapis.com/overview?project=772584293974\n`);
                console.log(`   Alternatively, authorize OAuth 2.0 using your existing client credentials by running:`);
                console.log(`   node scripts/indexing/index.js --oauth https://fitway.best/...\n`);
            }
        }
    }

    console.log(`\n============================================================`);
    console.log(`📊 Summary: ${successCount} succeeded, ${failureCount} failed out of ${urls.length} URLs.`);
    console.log(`============================================================\n`);

    if (failureCount > 0 && successCount === 0) {
        process.exit(1);
    }
}

main().catch((err) => {
    console.error('Unexpected error:', err);
    process.exit(1);
});
