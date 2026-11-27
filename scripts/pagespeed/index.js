/**
 * FitWay Google PageSpeed Insights (PSI) v5 API Client
 *
 * Queries https://www.googleapis.com/pagespeedonline/v5/runPagespeed for
 * Lighthouse Lab Data (Performance, Accessibility, Best Practices, SEO),
 * Core Web Vitals, CrUX Field Data, and actionable failing audits/errors.
 * Saves structured results to brain/data/psi-latest.json for AI agents.
 *
 * Credentials (priority order):
 *   1. --key <API_KEY> CLI flag
 *   2. GOOGLE_PSI_API_KEY environment variable
 *   3. credentials/pagespeed_api_key.json ({ "api_key": "..." })
 *   4. credentials/pagespeed_api_key.txt (plain text key)
 *
 * Usage:
 *   node scripts/pagespeed/index.js
 *   node scripts/pagespeed/index.js --url https://fitway.best
 *   node scripts/pagespeed/index.js --url /workouts --url /blog --strategy mobile
 *   node scripts/pagespeed/index.js --preset core --strategy both
 */

const fs = require('fs');
const path = require('path');

const PROJECT_ROOT = path.resolve(__dirname, '../..');
const CREDENTIALS_DIR = path.join(PROJECT_ROOT, 'credentials');
const KEY_JSON_FILE = path.join(CREDENTIALS_DIR, 'pagespeed_api_key.json');
const KEY_TXT_FILE = path.join(CREDENTIALS_DIR, 'pagespeed_api_key.txt');
const DEFAULT_OUTPUT = 'brain/data/psi-latest.json';
const BASE_URL = 'https://fitway.best';
const PSI_ENDPOINT = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';

const PRESET_URLS = {
  core: [
    'https://fitway.best/',
    'https://fitway.best/workouts',
    'https://fitway.best/blog',
    'https://fitway.best/tools/calorie-calculator',
    'https://fitway.best/about',
  ],
  tools: [
    'https://fitway.best/tools',
    'https://fitway.best/tools/bmi-calculator',
    'https://fitway.best/tools/calorie-calculator',
    'https://fitway.best/tools/macro-calculator',
    'https://fitway.best/tools/one-rep-max-calculator',
    'https://fitway.best/tools/ideal-weight-calculator',
  ],
};

const ALL_CATEGORIES = ['performance', 'accessibility', 'best-practices', 'seo'];

const METRIC_IDS = [
  'first-contentful-paint',
  'largest-contentful-paint',
  'total-blocking-time',
  'cumulative-layout-shift',
  'speed-index',
  'server-response-time',
  'interactive',
];

const PLACEHOLDER_TOKENS = new Set([
  '',
  'YOUR_GOOGLE_PSI_API_KEY',
  'PASTE_YOUR_API_KEY_HERE',
  'REPLACE_ME',
]);

function parseArgs(argv) {
  const args = {
    urls: [],
    preset: 'core',
    strategy: 'both',
    categories: [...ALL_CATEGORIES],
    output: DEFAULT_OUTPUT,
    key: null,
    concurrency: 3,
    help: false,
  };

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--help' || arg === '-h') {
      args.help = true;
    } else if (arg === '--url' || arg === '-u') {
      const val = argv[++i];
      if (!val) throw new Error(`${arg} requires a value`);
      for (const part of val.split(',')) {
        const trimmed = part.trim();
        if (trimmed) args.urls.push(normalizeUrl(trimmed));
      }
    } else if (arg === '--preset' || arg === '-p') {
      const val = argv[++i];
      if (!val || !PRESET_URLS[val]) {
        throw new Error(`Invalid --preset "${val}". Available: ${Object.keys(PRESET_URLS).join(', ')}`);
      }
      args.preset = val;
    } else if (arg === '--strategy' || arg === '-s') {
      const val = (argv[++i] || '').toLowerCase();
      if (!['mobile', 'desktop', 'both'].includes(val)) {
        throw new Error(`Invalid --strategy "${val}". Use mobile, desktop, or both.`);
      }
      args.strategy = val;
    } else if (arg === '--categories' || arg === '-c') {
      const val = argv[++i];
      if (!val) throw new Error('--categories requires a comma-separated value');
      const parsed = val.split(',').map((s) => s.trim().toLowerCase()).filter(Boolean);
      for (const cat of parsed) {
        if (!ALL_CATEGORIES.includes(cat)) {
          throw new Error(`Invalid category "${cat}". Allowed: ${ALL_CATEGORIES.join(', ')}`);
        }
      }
      args.categories = parsed;
    } else if (arg === '--output' || arg === '-o') {
      const val = argv[++i];
      if (!val) throw new Error('--output requires a file path');
      args.output = val;
    } else if (arg === '--key' || arg === '-k') {
      const val = argv[++i];
      if (!val) throw new Error('--key requires an API key');
      args.key = val.trim();
    } else if (arg === '--concurrency') {
      const val = Number(argv[++i]);
      if (!Number.isInteger(val) || val < 1 || val > 5) {
        throw new Error('--concurrency must be an integer between 1 and 5');
      }
      args.concurrency = val;
    } else {
      throw new Error(`Unknown argument: ${arg}. Run with --help for usage.`);
    }
  }

  return args;
}

function normalizeUrl(input) {
  if (/^https?:\/\//i.test(input)) return input;
  const cleanPath = input.startsWith('/') ? input : `/${input}`;
  return `${BASE_URL}${cleanPath}`;
}

function resolveApiKey(cliKey) {
  if (cliKey && !PLACEHOLDER_TOKENS.has(cliKey)) {
    return { key: cliKey, source: '--key flag' };
  }

  const envKey = (process.env.GOOGLE_PSI_API_KEY || '').trim();
  if (envKey && !PLACEHOLDER_TOKENS.has(envKey)) {
    return { key: envKey, source: 'GOOGLE_PSI_API_KEY env' };
  }

  if (fs.existsSync(KEY_JSON_FILE)) {
    let parsed;
    try {
      parsed = JSON.parse(fs.readFileSync(KEY_JSON_FILE, 'utf8'));
    } catch (err) {
      throw new Error(`Failed to parse ${path.relative(PROJECT_ROOT, KEY_JSON_FILE)}: ${err.message}`);
    }
    const fileKey = String(parsed.api_key || '').trim();
    if (!PLACEHOLDER_TOKENS.has(fileKey)) {
      return { key: fileKey, source: 'credentials/pagespeed_api_key.json' };
    }
  }

  if (fs.existsSync(KEY_TXT_FILE)) {
    const txtKey = fs.readFileSync(KEY_TXT_FILE, 'utf8').trim();
    if (!PLACEHOLDER_TOKENS.has(txtKey)) {
      return { key: txtKey, source: 'credentials/pagespeed_api_key.txt' };
    }
  }

  throw new Error(
    `Google PageSpeed Insights API key is missing or still set to placeholder.\n` +
      `Paste your API key into:\n` +
      `  ${KEY_JSON_FILE}\n` +
      `as { "api_key": "AIza..." }, or pass GOOGLE_PSI_API_KEY / --key.`
  );
}

function formatScore(rawScore) {
  if (typeof rawScore !== 'number') return null;
  return Math.round(rawScore * 100);
}

function extractCrux(exp) {
  if (!exp || (!exp.overall_category && !exp.metrics)) return null;
  const metrics = {};
  for (const [name, data] of Object.entries(exp.metrics || {})) {
    metrics[name] = {
      percentile: data.percentile ?? null,
      category: data.category ?? null,
    };
  }
  return {
    id: exp.id || null,
    overall_category: exp.overall_category || null,
    metrics,
  };
}

function compactDetailItem(item) {
  if (!item || typeof item !== 'object') return item;
  const out = {};
  if (item.url) out.url = item.url;
  if (item.source?.url) out.source_url = item.source.url;
  if (item.label) out.label = item.label;
  if (item.node?.snippet) out.snippet = item.node.snippet.slice(0, 160);
  if (item.node?.selector) out.selector = item.node.selector;
  if (item.description) out.description = String(item.description).slice(0, 200);
  if (typeof item.wastedMs === 'number') out.wastedMs = Math.round(item.wastedMs);
  if (typeof item.wastedBytes === 'number') out.wastedBytes = Math.round(item.wastedBytes);
  if (typeof item.totalBytes === 'number') out.totalBytes = Math.round(item.totalBytes);
  if (typeof item.transferSize === 'number') out.transferSize = Math.round(item.transferSize);
  if (typeof item.responseTime === 'number') out.responseTimeMs = Math.round(item.responseTime);
  if (typeof item.value === 'number' || typeof item.value === 'string') out.value = item.value;
  if (item.subItems?.items?.length && !out.url && !out.snippet) {
    out.subItemsCount = item.subItems.items.length;
  }
  return Object.keys(out).length ? out : undefined;
}

function extractAuditSummary(audit, categories) {
  const summary = {
    id: audit.id,
    title: audit.title,
    score: formatScore(audit.score),
    scoreDisplayMode: audit.scoreDisplayMode,
    displayValue: audit.displayValue || null,
    categories,
  };

  if (audit.metricSavings && Object.keys(audit.metricSavings).length > 0) {
    summary.metricSavings = audit.metricSavings;
  }

  const details = audit.details;
  if (details) {
    if (typeof details.overallSavingsMs === 'number' && details.overallSavingsMs > 0) {
      summary.overallSavingsMs = Math.round(details.overallSavingsMs);
    }
    if (typeof details.overallSavingsBytes === 'number' && details.overallSavingsBytes > 0) {
      summary.overallSavingsBytes = Math.round(details.overallSavingsBytes);
    }
    if (Array.isArray(details.items) && details.items.length > 0) {
      const compactItems = details.items
        .slice(0, 5)
        .map(compactDetailItem)
        .filter(Boolean);
      if (compactItems.length > 0) {
        summary.items = compactItems;
        summary.totalItemsCount = details.items.length;
      }
    }
  }

  return summary;
}

async function fetchPsiReport(targetUrl, strategy, categories, apiKey) {
  const params = new URLSearchParams({
    url: targetUrl,
    strategy,
    key: apiKey,
  });
  for (const cat of categories) {
    params.append('category', cat);
  }

  const requestUrl = `${PSI_ENDPOINT}?${params.toString()}`;
  const startedAt = Date.now();
  const res = await fetch(requestUrl);
  const elapsedMs = Date.now() - startedAt;

  let data;
  try {
    data = await res.json();
  } catch {
    throw new Error(`HTTP ${res.status} non-JSON response for ${targetUrl} (${strategy})`);
  }

  if (!res.ok || data.error) {
    const errMsg = data?.error?.message || `HTTP ${res.status}`;
    const errReason = data?.error?.errors?.[0]?.reason || '';
    throw new Error(`${targetUrl} [${strategy}]: ${errMsg}${errReason ? ` (${errReason})` : ''}`);
  }

  const lh = data.lighthouseResult || {};
  const cats = lh.categories || {};
  const audits = lh.audits || {};

  const scores = {
    performance: formatScore(cats.performance?.score),
    accessibility: formatScore(cats.accessibility?.score),
    bestPractices: formatScore(cats['best-practices']?.score),
    seo: formatScore(cats.seo?.score),
  };

  const metrics = {};
  for (const metricId of METRIC_IDS) {
    const a = audits[metricId];
    if (a) {
      metrics[metricId] = {
        displayValue: a.displayValue || null,
        numericValue: typeof a.numericValue === 'number' ? Math.round(a.numericValue * 1000) / 1000 : null,
        numericUnit: a.numericUnit || null,
        score: formatScore(a.score),
      };
    }
  }

  // Map each audit ID to the categories referencing it
  const auditToCategories = new Map();
  for (const [catKey, catObj] of Object.entries(cats)) {
    for (const ref of catObj.auditRefs || []) {
      if (!auditToCategories.has(ref.id)) {
        auditToCategories.set(ref.id, []);
      }
      auditToCategories.get(ref.id).push(catKey);
    }
  }

  const failedAudits = [];
  for (const [auditId, audit] of Object.entries(audits)) {
    if (METRIC_IDS.includes(auditId)) continue;
    const mode = audit.scoreDisplayMode;
    if (mode === 'notApplicable' || mode === 'manual' || mode === 'informative') continue;

    const isErrorMode = mode === 'error';
    const isFailedScore = typeof audit.score === 'number' && audit.score < 0.9;
    if (!isErrorMode && !isFailedScore) continue;

    const refCategories = auditToCategories.get(auditId) || [];
    failedAudits.push(extractAuditSummary(audit, refCategories));
  }

  failedAudits.sort((a, b) => {
    const aSavings = a.overallSavingsMs || 0;
    const bSavings = b.overallSavingsMs || 0;
    if (bSavings !== aSavings) return bSavings - aSavings;
    return (a.score ?? -1) - (b.score ?? -1);
  });

  return {
    url: targetUrl,
    finalUrl: lh.finalDisplayedUrl || lh.finalUrl || data.id || targetUrl,
    strategy,
    fetchedAt: new Date().toISOString(),
    elapsedMs,
    scores,
    metrics,
    crux: {
      url: extractCrux(data.loadingExperience),
      origin: extractCrux(data.originLoadingExperience),
    },
    runWarnings: lh.runWarnings || [],
    runtimeError: lh.runtimeError || null,
    failedAuditsCount: failedAudits.length,
    failedAudits,
  };
}

async function runPool(tasks, concurrency) {
  const results = new Array(tasks.length);
  let nextIdx = 0;

  async function worker() {
    while (true) {
      const idx = nextIdx++;
      if (idx >= tasks.length) return;
      results[idx] = await tasks[idx]();
    }
  }

  const workers = Array.from({ length: Math.min(concurrency, tasks.length) }, () => worker());
  await Promise.all(workers);
  return results;
}

function scoreBadge(val) {
  if (val === null || val === undefined) return 'n/a';
  if (val >= 90) return `${val} (good)`;
  if (val >= 50) return `${val} (needs-work)`;
  return `${val} (POOR)`;
}

function printSummary(payload, outPath) {
  console.log('='.repeat(72));
  console.log('⚡ FITWAY GOOGLE PAGESPEED INSIGHTS SUMMARY');
  console.log('='.repeat(72));

  for (const r of payload.reports) {
    if (r.error) {
      console.log(`\n❌ ${r.url} [${r.strategy}] -> ERROR: ${r.error}`);
      continue;
    }

    const s = r.scores;
    const m = r.metrics;
    console.log(`\n🌐 ${r.url} [${r.strategy.toUpperCase()}] (${(r.elapsedMs / 1000).toFixed(1)}s)`);
    console.log(
      `   Scores: Perf=${scoreBadge(s.performance)} | A11y=${scoreBadge(s.accessibility)} | BP=${scoreBadge(s.bestPractices)} | SEO=${scoreBadge(s.seo)}`
    );
    console.log(
      `   CWV/Lab: LCP=${m['largest-contentful-paint']?.displayValue || 'n/a'} | FCP=${m['first-contentful-paint']?.displayValue || 'n/a'} | TBT=${m['total-blocking-time']?.displayValue || 'n/a'} | CLS=${m['cumulative-layout-shift']?.displayValue || 'n/a'} | TTFB=${m['server-response-time']?.displayValue || 'n/a'}`
    );

    const cruxUrl = r.crux.url?.overall_category || 'NO_DATA';
    const cruxOrigin = r.crux.origin?.overall_category || 'NO_DATA';
    console.log(`   CrUX Field: URL=${cruxUrl} | Origin=${cruxOrigin}`);

    if (r.failedAudits.length === 0) {
      console.log('   ✅ No failing audits!');
    } else {
      console.log(`   ⚠️ Top Failing Audits (${r.failedAudits.length} total):`);
      for (const audit of r.failedAudits.slice(0, 6)) {
        const extra = [
          audit.displayValue,
          audit.overallSavingsMs ? `save ~${audit.overallSavingsMs}ms` : null,
          audit.overallSavingsBytes ? `save ~${Math.round(audit.overallSavingsBytes / 1024)}KB` : null,
        ]
          .filter(Boolean)
          .join(', ');
        console.log(`      • [${audit.categories.join(',')}] ${audit.title}${extra ? ` (${extra})` : ''}`);
      }
    }
  }

  console.log('\n' + '='.repeat(72));
  console.log(`💾 Full dataset saved to: ${path.relative(PROJECT_ROOT, outPath)}`);
}

function printHelp() {
  console.log(`FitWay PageSpeed Insights v5 CLI

Usage:
  node scripts/pagespeed/index.js [options]

Options:
  -u, --url <url>          Target URL or path (repeatable or comma-separated).
                           Example: --url / --url /workouts
  -p, --preset <name>      Preset URL group when --url is omitted: core | tools (default: core)
  -s, --strategy <mode>    mobile | desktop | both (default: both)
  -c, --categories <list>  Comma-separated categories (default: performance,accessibility,best-practices,seo)
  -o, --output <path>      Output JSON path relative to repo root (default: ${DEFAULT_OUTPUT})
  -k, --key <api_key>      Google PSI API key (overrides env and credentials/)
      --concurrency <1-5>  Max concurrent API calls (default: 3)
  -h, --help               Show this help message
`);
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }

  const { key: apiKey, source: keySource } = resolveApiKey(args.key);
  const targetUrls = args.urls.length > 0 ? [...new Set(args.urls)] : PRESET_URLS[args.preset];
  const strategies = args.strategy === 'both' ? ['mobile', 'desktop'] : [args.strategy];

  console.log(`🔑 API Key loaded from: ${keySource}`);
  console.log(`🔎 Auditing ${targetUrls.length} URL(s) × ${strategies.length} strategy (${strategies.join(', ')})...`);

  const jobs = [];
  for (const url of targetUrls) {
    for (const strategy of strategies) {
      jobs.push(async () => {
        try {
          return await fetchPsiReport(url, strategy, args.categories, apiKey);
        } catch (err) {
          return {
            url,
            strategy,
            fetchedAt: new Date().toISOString(),
            error: err.message,
          };
        }
      });
    }
  }

  const reports = await runPool(jobs, args.concurrency);
  const failedRuns = reports.filter((r) => r.error).length;

  const payload = {
    metadata: {
      fetched_at: new Date().toISOString(),
      preset: args.urls.length > 0 ? 'custom' : args.preset,
      strategies,
      categories: args.categories,
      total_runs: reports.length,
      failed_runs: failedRuns,
    },
    reports,
  };

  const outPath = path.resolve(PROJECT_ROOT, args.output);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(payload, null, 2) + '\n', 'utf8');

  printSummary(payload, outPath);

  if (failedRuns === reports.length) {
    process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error(`❌ ${err.message}`);
  process.exit(1);
});
