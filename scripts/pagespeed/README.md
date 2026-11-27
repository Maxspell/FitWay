# FitWay Google PageSpeed Insights (PSI) CLI

Zero-dependency Node.js CLI client for querying the Google PageSpeed Insights API v5 (`pagespeedonline.googleapis.com`).

## Setup

Paste your Google Cloud API key into `credentials/pagespeed_api_key.json` (gitignored):

```json
{
  "api_key": "YOUR_GOOGLE_PSI_API_KEY"
}
```

Alternatively, pass `GOOGLE_PSI_API_KEY` via environment variable or `--key <API_KEY>`.

## Usage

```bash
# Audit core FitWay templates (Home, Workouts, Blog, Calculator, About) on mobile & desktop
node scripts/pagespeed/index.js

# Audit a single URL or path
node scripts/pagespeed/index.js --url https://fitway.best
node scripts/pagespeed/index.js --url /blog --strategy mobile

# Audit all calculator pSEO pages
node scripts/pagespeed/index.js --preset tools --strategy mobile
```

Results are saved to `brain/data/psi-latest.json` (gitignored) for review by AI agents.
