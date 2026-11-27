# Google PageSpeed Insights (PSI) API v5 Integration

Documentation for FitWay's direct integration with the **Google PageSpeed Insights API v5** (`pagespeedonline.googleapis.com`), the zero-dependency Node.js CLI client (`scripts/pagespeed/index.js`), and the agent cache (`brain/data/psi-latest.json`).

---

## 🎯 Purpose & Objectives

1. **Automated Core Web Vitals & Lighthouse Auditing**: Collect mobile and desktop scores (`Performance`, `Accessibility`, `Best Practices`, `SEO`) and lab metrics (`LCP`, `FCP`, `TBT`, `CLS`, `Speed Index`, `TTFB`) directly from Google's servers.
2. **Actionable Error Diagnostics**: Extract failing Lighthouse audits (`failedAudits`), runtime/console errors, metric savings (`overallSavingsMs`, `overallSavingsBytes`), and top offending resource URLs/selectors without manual runs in `pagespeed.web.dev`.
3. **CrUX Field Data Monitoring**: Track real-user Chrome UX Report metrics (`loadingExperience` and `originLoadingExperience`) when traffic volume is sufficient.

---

## 🔐 Authentication & Key Storage

Unlike Google Search Console (`[[frontend/gsc-api-integration]]`) and Google Analytics 4 (`[[frontend/ga4-api-integration]]`), which authenticate via a Google Cloud Service Account, **PageSpeed Insights API v5** uses a Google Cloud **API Key** (from project `fitway-514214`, restricted to `PageSpeed Insights API`).

- **Primary storage**: `credentials/pagespeed_api_key.json` (`{ "api_key": "..." }`), covered by `credentials/*` in `.gitignore`.
- **Supported overrides**: `GOOGLE_PSI_API_KEY` environment variable, `credentials/pagespeed_api_key.txt`, or the `--key` CLI flag.

---

## 💻 CLI Client: `scripts/pagespeed/index.js`

Implemented in Node.js (native `fetch`, zero external dependencies):

```bash
# Audit default core preset (/, /workouts, /blog, /tools/calorie-calculator, /about) on mobile & desktop
node scripts/pagespeed/index.js

# Audit specific URL(s) or paths
node scripts/pagespeed/index.js --url https://fitway.best
node scripts/pagespeed/index.js --url /workouts,/blog --strategy mobile

# Audit all calculator pSEO pages
node scripts/pagespeed/index.js --preset tools --strategy mobile
```

### Capabilities
- **Presets**: `core` (key page templates) and `tools` (`/tools` hub + all 5 calculator spokes from `[[frontend/fitness-calculators-pseo]]`).
- **Concurrency Pool**: Runs 1–5 parallel requests (`--concurrency 3` by default) across `mobile` and `desktop`.
- **Compact Agent Cache**: Saves normalized scores, lab metrics, CrUX snapshots, and top failing audits (capped at top 5 offending items per audit) to `brain/data/psi-latest.json`.

---

## 🔗 Related Notes
- [[frontend/performance-third-party-scripts]]
- [[frontend/image-delivery-optimization]]
- [[frontend/accessibility-wcag-fixes]]
- [[frontend/gsc-api-integration]]
- [[frontend/ga4-api-integration]]
