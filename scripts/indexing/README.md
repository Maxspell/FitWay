# FitWay Google Indexing API Service

Tool for pushing new and updated URLs directly to Google's Indexing API for rapid crawling and indexation.

## Location & Structure
- **Script**: `scripts/indexing/index.js`
- **Dependencies**: `scripts/indexing/package.json`
- **Credentials** (Ignored by Git):
  - Service Account: `credentials/fitway-514214-*.json`
  - OAuth 2.0 Client Secret: `credentials/google_indexing_client_secret.json`
  - Persistent Token Cache: `credentials/google_indexing_token.json`

---

## Authentication Modes

### Mode 1: OAuth 2.0 (Recommended with existing project `marine-order-497712-i1`)
1. Run the one-time authorization:
   ```bash
   node scripts/indexing/index.js --oauth https://fitway.best/
   ```
2. Open the printed Google consent URL, log in with your Search Console account, and grant access.
3. Google redirects to `http://localhost/?code=...`. Copy the `code` parameter from the browser URL bar.
4. Pass the code:
   ```bash
   node scripts/indexing/index.js --code 4/0AY0e...
   ```
5. The token is saved in `credentials/google_indexing_token.json`. **From this point forward, the AI agent and all subsequent runs will execute 100% autonomously without any prompts.**

### Mode 2: Service Account (Zero OAuth, purely headless)
If you prefer not using OAuth tokens:
1. Enable the Web Search Indexing API on your FitWay Google Cloud Project:
   👉 [Enable Indexing API for Project fitway-514214](https://console.developers.google.com/apis/api/indexing.googleapis.com/overview?project=772584293974)
2. Ensure `fitway-gsc-agent@fitway-514214.iam.gserviceaccount.com` is added as an Owner on `sc-domain:fitway.best` in Google Search Console (it already is for Search Console data!).
3. Once enabled, `scripts/indexing/index.js` will automatically use the service account with zero tokens needed.

---

## Usage Commands

### 1. Submit Single URL for Indexing
```bash
node scripts/indexing/index.js https://fitway.best/blog/best-compound-exercises-muscle-growth
```

### 2. Submit Multiple URLs
```bash
node scripts/indexing/index.js https://fitway.best/blog/post-1 https://fitway.best/workouts/workout-2
```

### 3. Check Notification Status for a URL
```bash
node scripts/indexing/index.js --status https://fitway.best/blog/best-compound-exercises-muscle-growth
```

### 4. Submit Deleted URL (Remove from Google Index)
```bash
node scripts/indexing/index.js --type URL_DELETED https://fitway.best/blog/outdated-post
```

### 5. Submit Batch from File
```bash
node scripts/indexing/index.js --file urls_to_index.txt
```
*(One URL per line)*

---

## How AI Agents Use This
Whenever a new workout, blog post, or page is published, the agent simply executes:
```bash
node scripts/indexing/index.js <NEW_URL>
```
The script auto-detects credentials, handles token refreshes, and outputs structured success/error notifications.
