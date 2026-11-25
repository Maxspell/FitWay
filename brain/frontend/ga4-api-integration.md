# Google Analytics 4 (GA4) API Integration for Autonomous Agents

This document outlines the architecture, configuration, and agent workflows for querying real-time behavioral data from **Google Analytics 4 (GA4)** via the **Google Analytics Data API (v1beta)**.

---

## 🎯 Purpose & Objectives

While Google Search Console (GSC) measures pre-click performance (queries, impressions, CTR, average position), **Google Analytics 4** measures post-click user engagement. 

For FitWay (`https://fitway.best`), GA4 data serves three mission-critical goals:
1. **Google AdSense "Low Value Content" Defense**: Detect low-engagement "zombie pages" (dwell time < 15s or bounce rate > 80%) that drag down site quality during AdSense reviews.
2. **Intent & Retention Validation**: Determine whether visitors actually read long-form guides, interact with tools (`/tools/*`), or bounce immediately.
3. **AI Search Engine Referral Tracking**: Identify traffic originating from generative AI platforms (`chatgpt.com`, `perplexity.ai`, `claude.ai`), which GSC cannot track.
4. **AdSense RPM Estimation**: Monitor the proportion of high-value Tier-1 traffic (US, UK, CA, AU, NZ, DE) vs rest of world.

---

## 🔑 Authentication & Configuration

GA4 access is managed programmatically through a Google Cloud Service Account with **Viewer** privileges assigned directly to the GA4 Property:

- **GA4 Property ID**: `538560832`
- **Service Account**: `fitway-gsc-agent@fitway-514214.iam.gserviceaccount.com`
- **Credentials Path**: `credentials/fitway-514214-b1d64b203620.json` (auto-discovered by `find_credentials()`)
- **Google Cloud API**: `Google Analytics Data API` (v1beta)
- **OAuth Scope**: `https://www.googleapis.com/auth/analytics.readonly`

---

## 🛠️ CLI Client: `scripts/ga4_client.py`

A dedicated Python CLI client handles communication with the Google Analytics Data API, formats human-readable summaries, and exports structured JSON for autonomous agents.

### CLI Syntax:
```bash
# Standard 28-day sync
python scripts/ga4_client.py

# Custom timeframe (e.g. 14 or 90 days)
python scripts/ga4_client.py --days 14

# Specify custom property ID or target output
python scripts/ga4_client.py --property-id 538560832 --output brain/data/ga4-latest.json
```

### Script Capabilities:
- **Totals & Velocity**: Active users, new users, sessions, page views, engagement rate, average session duration.
- **Top Landing Pages**: Metrics per path (`pagePath`), total views, unique active users, average engagement duration, engagement rate.
- **Zombie Pages Detection**: Automatically flags pages with views $\ge$ 5 but average engagement duration < 15s or bounce rate > 80%.
- **Acquisition Breakdown**: Grouped by `sessionSourceMedium`.
- **AI Referrer Filter**: Proactively searches for inbound traffic from AI engines (`chatgpt.com`, `perplexity.ai`, `claude.ai`, `bing.com/copilot`).
- **Tier-1 Geographic Ratio**: Calculates the percentage of active users from top AdSense paying countries (US, UK, CA, AU, NZ, DE).
- **Daily Timeline (14d)**: Historical tracking of audience trajectory.

---

## 💾 Agent Cache Payload: `brain/data/ga4-latest.json`

The CLI outputs full structured data to `brain/data/ga4-latest.json`. Agents read this JSON without needing to re-execute network calls during conversational turns:

```json
{
  "metadata": {
    "fetched_at": "2026-11-19T17:04:30.123456Z",
    "property_id": "538560832",
    "range_days": 28,
    "start_date": "28daysAgo",
    "end_date": "today"
  },
  "overview": {
    "active_users": 55,
    "new_users": 47,
    "sessions": 78,
    "page_views": 326,
    "avg_session_duration_sec": 604.2,
    "engagement_rate_pct": 50.0,
    "bounce_rate_pct": 50.0
  },
  "adsense_readiness_signals": {
    "tier_1_traffic_share_pct": 32.73,
    "overall_engagement_rate_pct": 50.0,
    "avg_session_duration": "10m 04s",
    "zombie_pages_count": 1,
    "content_quality_health": "NEEDS_ATTENTION (1 low-engagement pages)"
  },
  "top_pages": [ ... ],
  "zombie_pages": [ ... ],
  "traffic_sources": [ ... ],
  "ai_referrals": [ ... ],
  "countries": [ ... ],
  "devices": [ ... ],
  "daily_timeline_14d": [ ... ]
}
```

---

## 🔄 Dual-Source Feedback Loop (GSC + GA4)

FitWay AI agents correlate `brain/data/gsc-latest.json` with `brain/data/ga4-latest.json` to make surgical editorial decisions:

```
                  ┌──────────────────────────────┐
                  │ Google Search Console (GSC)  │
                  │   Pre-click: Queries & CTR   │
                  └──────────────┬───────────────┘
                                 │
                                 ▼
                         User Visits Site
                                 │
                                 ▼
                  ┌──────────────────────────────┐
                  │ Google Analytics 4 (GA4)     │
                  │ Post-click: Engagement & Dwell│
                  └──────────────┬───────────────┘
                                 │
            ┌────────────────────┴────────────────────┐
            ▼                                         ▼
   High Clicks / Low Dwell (<20s)           Low Impressions / High Dwell (>90s)
   -------------------------------          ------------------------------------
   - Search intent mismatch                 - High-value evergreen content
   - Action: Rewrite intro hook,            - Action: Inject Striking Distance
     add interactive tool / checklist,        queries into H2s, build internal
     eliminate verbose AI filler.              inbound links from Hub pages.
```

---

## 🔗 Related Notes
- [[.agents/agents/seo-adsense-architect]] — Principal SEO Strategist agent manifest.
- [[frontend/gsc-api-integration]] — Google Search Console API client and workflow.
- [[roadmap/adsense-approval-plan]] — Master plan for AdSense qualification and traffic milestones.
- [[core/llm-wiki]] — Guidelines for knowledge base compounding.
