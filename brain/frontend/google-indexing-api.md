# Google Indexing API Integration

This document outlines the architecture, setup, and operation of the Google Indexing API service for FitWay (`fitway.best`).

---

## 1. Overview & Purpose

The **Google Indexing API** allows FitWay to directly notify Google when pages are added, updated, or removed. Unlike waiting for standard crawl cycles, publishing URL notifications prompts Googlebot to schedule immediate crawling.

Key benefits:
- **Instant Crawl Scheduling**: New blog posts and workouts are indexed within hours rather than days or weeks.
- **Content Updates**: Re-crawling updated pages with fresh clinical citations, schema markup, or metadata improvements.
- **Deletions / 410 Removal**: Notifying Google immediately when obsolete URLs are retired (`URL_DELETED`).

---

## 2. Architecture & Directory Placement

All files are structured following FitWay repository standards:

- **CLI & Service Script**: [`scripts/indexing/index.js`](file:///d:/Users/doomi/ReactProjects/FitWay/scripts/indexing/index.js)
- **Dependencies**: [`scripts/indexing/package.json`](file:///d:/Users/doomi/ReactProjects/FitWay/scripts/indexing/package.json)
- **Node Modules**: `scripts/indexing/node_modules/` (git-ignored)
- **Credentials** (in `credentials/`, protected by `.gitignore`):
  - Service Account: `credentials/fitway-514214-*.json`
  - OAuth 2.0 Client Secret: `credentials/google_indexing_client_secret.json`
  - Persistent Token Cache: `credentials/google_indexing_token.json`

---

## 3. Dual Authentication Strategy

The service supports two authentication methods with automatic fallback:

### Method A: OAuth 2.0 with Persistent Token Caching (Desktop Client)
Used when credentials originate from Google Cloud project `marine-order-497712-i1`.
- **Token Persistence**: Unlike previous scripts that required manual browser copy-pasting on every single execution, tokens are cached in `credentials/google_indexing_token.json`.
- **Automatic Token Refresh**: The client library automatically refreshes expired access tokens in the background using the offline `refresh_token`.
- **One-time Setup**:
  1. Trigger authorization URL:
     ```bash
     node scripts/indexing/index.js --oauth https://fitway.best/
     ```
  2. Sign in with the Google Account that owns `sc-domain:fitway.best`.
  3. Google redirects to `http://localhost/?code=...`. Copy the `code` parameter.
  4. Save the token:
     ```bash
     node scripts/indexing/index.js --code YOUR_AUTH_CODE
     ```
  5. Subsequent runs by human or AI agents require **zero manual interaction**.

### Method B: Google Service Account (Zero OAuth, Pure Headless)
Uses the existing service account `fitway-gsc-agent@fitway-514214.iam.gserviceaccount.com` (from `credentials/fitway-514214-b1d64b203620.json`), which is already verified as an Owner in Google Search Console.
- **Requirement**: The Web Search Indexing API must be enabled on Google Cloud project `fitway-514214` (Project ID `772584293974`):
  👉 [Enable Indexing API in Google Cloud Console](https://console.developers.google.com/apis/api/indexing.googleapis.com/overview?project=772584293974)
- Once enabled, the service account submits URLs completely autonomously with no user intervention, no tokens, and no browser redirects.

---

## 4. Usage for Developers & AI Agents

### Submit Single URL (New or Updated)
```bash
node scripts/indexing/index.js https://fitway.best/blog/best-compound-exercises-muscle-growth
```

### Submit Multiple URLs
```bash
node scripts/indexing/index.js https://fitway.best/blog/post-1 https://fitway.best/workouts/workout-2
```

### Check Notification Status (Metadata)
```bash
node scripts/indexing/index.js --status https://fitway.best/blog/best-compound-exercises-muscle-growth
```

### Submit URL Deletion
```bash
node scripts/indexing/index.js --type URL_DELETED https://fitway.best/blog/outdated-url
```

### Batch Submit From File
```bash
node scripts/indexing/index.js --file urls_to_index.txt
```

---

## 5. Agent Autonomous Execution Protocol

When an AI agent (such as `seo-adsense-architect` or content generator) publishes or updates content:
1. Verify the production URL is reachable (`https://fitway.best/...`).
2. Run `node scripts/indexing/index.js <URL>`.
3. Verify the output reports `✅ Success! Notification time: ...`.
4. Log the submission in `brain/log.md`.
