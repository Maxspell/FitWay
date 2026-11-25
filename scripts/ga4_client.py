"""
Google Analytics 4 (GA4) Data API Client for FitWay (fitway.best)
Fetches user behavior metrics, engagement time, traffic sources, geo mix, and content performance.
Saves results to brain/data/ga4-latest.json for AI agents and outputs an executive summary.
"""

import os
import sys
import json
import argparse
from datetime import datetime
from pathlib import Path

try:
    from google.oauth2 import service_account
    from googleapiclient.discovery import build
    from googleapiclient.errors import HttpError
except ImportError:
    print("Error: Missing Google API dependencies. Install with: pip install google-api-python-client google-auth")
    sys.exit(1)

SCOPES = ["https://www.googleapis.com/auth/analytics.readonly"]
DEFAULT_PROPERTY_ID = os.getenv("GA4_PROPERTY_ID", "538560832")

# Tier-1 countries for AdSense RPM calculation
TIER_1_COUNTRIES = {"United States", "United Kingdom", "Canada", "Australia", "New Zealand", "Germany"}


def find_credentials(custom_path=None) -> Path:
    """Finds the service account JSON key in credentials/ or custom path."""
    if custom_path:
        p = Path(custom_path)
        if p.exists():
            return p
        raise FileNotFoundError(f"Credentials not found at specified path: {custom_path}")

    script_dir = Path(__file__).resolve().parent
    project_root = script_dir.parent
    cred_dir = project_root / "credentials"

    if cred_dir.exists():
        json_files = list(cred_dir.glob("*.json"))
        # Filter for service account keys
        for f in json_files:
            if "client_secret" not in f.name and "token" not in f.name:
                try:
                    with open(f, "r", encoding="utf-8") as kf:
                        data = json.load(kf)
                        if data.get("type") == "service_account":
                            return f
                except Exception:
                    continue

    raise FileNotFoundError(
        f"No service account JSON key found in {cred_dir}. Please place your service account file in credentials/."
    )


def get_client(credentials_path: Path):
    """Authenticates and returns the Analytics Data API client."""
    creds = service_account.Credentials.from_service_account_file(
        str(credentials_path), scopes=SCOPES
    )
    return build("analyticsdata", "v1beta", credentials=creds)


def run_ga4_report(client, property_id: str, start_date: str, end_date: str, dimensions=None, metrics=None, limit=1000):
    """Executes a runReport request on the GA4 Data API."""
    body = {
        "dateRanges": [{"startDate": start_date, "endDate": end_date}],
        "metrics": [{"name": m} for m in (metrics or [])],
    }
    if dimensions:
        body["dimensions"] = [{"name": d} for d in dimensions]
    if limit:
        body["limit"] = limit

    try:
        response = client.properties().runReport(
            property=f"properties/{property_id}",
            body=body
        ).execute()
        return response
    except HttpError as e:
        print(f"API Error ({dimensions}): {e}", file=sys.stderr)
        return {}


def format_duration(seconds: float) -> str:
    """Formats seconds into mm:ss or hh:mm:ss."""
    s = int(round(seconds))
    mins, secs = divmod(s, 60)
    hours, mins = divmod(mins, 60)
    if hours > 0:
        return f"{hours}h {mins:02d}m {secs:02d}s"
    return f"{mins:02d}m {secs:02d}s"


def main():
    parser = argparse.ArgumentParser(description="FitWay Google Analytics 4 (GA4) Sync Tool")
    parser.add_argument("--days", type=int, default=28, help="Number of days to analyze (default: 28)")
    parser.add_argument("--property-id", type=str, default=DEFAULT_PROPERTY_ID, help="GA4 Property ID (default: 538560832)")
    parser.add_argument("--credentials", type=str, default=None, help="Path to service account JSON key")
    parser.add_argument("--output", type=str, default="brain/data/ga4-latest.json", help="Path to save JSON results")
    args = parser.parse_args()

    project_root = Path(__file__).resolve().parent.parent

    # 1. Credentials
    try:
        cred_path = find_credentials(args.credentials)
    except FileNotFoundError as e:
        print(f"❌ {e}")
        sys.exit(1)

    # 2. Client Build
    client = get_client(cred_path)
    property_id = args.property_id

    start_date = f"{args.days}daysAgo"
    end_date = "today"

    # 3. Overall Totals
    overview_resp = run_ga4_report(
        client,
        property_id,
        start_date,
        end_date,
        metrics=[
            "activeUsers",
            "newUsers",
            "sessions",
            "screenPageViews",
            "averageSessionDuration",
            "userEngagementDuration",
            "engagementRate",
            "bounceRate"
        ]
    )

    overview = {
        "active_users": 0,
        "new_users": 0,
        "sessions": 0,
        "page_views": 0,
        "avg_session_duration_sec": 0.0,
        "total_engagement_duration_sec": 0.0,
        "engagement_rate_pct": 0.0,
        "bounce_rate_pct": 0.0,
    }

    if overview_resp.get("rows"):
        m_vals = overview_resp["rows"][0]["metricValues"]
        overview["active_users"] = int(m_vals[0].get("value", 0))
        overview["new_users"] = int(m_vals[1].get("value", 0))
        overview["sessions"] = int(m_vals[2].get("value", 0))
        overview["page_views"] = int(m_vals[3].get("value", 0))
        overview["avg_session_duration_sec"] = round(float(m_vals[4].get("value", 0.0)), 1)
        overview["total_engagement_duration_sec"] = round(float(m_vals[5].get("value", 0.0)), 1)
        overview["engagement_rate_pct"] = round(float(m_vals[6].get("value", 0.0)) * 100, 2)
        overview["bounce_rate_pct"] = round(float(m_vals[7].get("value", 0.0)) * 100, 2)

    # 4. Pages Breakdown
    pages_resp = run_ga4_report(
        client,
        property_id,
        start_date,
        end_date,
        dimensions=["pagePath"],
        metrics=[
            "screenPageViews",
            "activeUsers",
            "userEngagementDuration",
            "engagementRate",
            "bounceRate"
        ],
        limit=100
    )

    pages = []
    zombie_pages = []

    for row in pages_resp.get("rows", []):
        path = row["dimensionValues"][0]["value"]
        views = int(row["metricValues"][0]["value"])
        users = int(row["metricValues"][1]["value"])
        eng_dur = float(row["metricValues"][2]["value"])
        eng_rate = round(float(row["metricValues"][3]["value"]) * 100, 2)
        bounce_rate = round(float(row["metricValues"][4]["value"]) * 100, 2)
        avg_eng_time = round(eng_dur / users, 1) if users > 0 else 0.0

        page_item = {
            "path": path,
            "views": views,
            "active_users": users,
            "avg_engagement_time_sec": avg_eng_time,
            "engagement_rate_pct": eng_rate,
            "bounce_rate_pct": bounce_rate
        }
        pages.append(page_item)

        # Flag potential low-value / zombie content (views >= 5 and engagement time < 15s or bounce rate > 80%)
        if views >= 5 and (avg_eng_time < 15.0 or bounce_rate > 80.0):
            zombie_pages.append(page_item)

    pages.sort(key=lambda x: x["views"], reverse=True)
    zombie_pages.sort(key=lambda x: x["views"], reverse=True)

    # 5. Traffic Sources & AI Referrers
    sources_resp = run_ga4_report(
        client,
        property_id,
        start_date,
        end_date,
        dimensions=["sessionSourceMedium"],
        metrics=["sessions", "activeUsers", "engagementRate"],
        limit=50
    )

    sources = []
    ai_referrals = []
    ai_domains = ["chatgpt.com", "perplexity.ai", "claude.ai", "anthropic.com", "bing.com/copilot", "gemini.google.com"]

    for row in sources_resp.get("rows", []):
        sm = row["dimensionValues"][0]["value"]
        sess = int(row["metricValues"][0]["value"])
        users = int(row["metricValues"][1]["value"])
        eng_rate = round(float(row["metricValues"][2]["value"]) * 100, 2)

        source_item = {
            "source_medium": sm,
            "sessions": sess,
            "active_users": users,
            "engagement_rate_pct": eng_rate
        }
        sources.append(source_item)

        # Check for AI search referrers
        if any(ai_dom in sm.lower() for ai_dom in ai_domains):
            ai_referrals.append(source_item)

    sources.sort(key=lambda x: x["sessions"], reverse=True)

    # 6. Geography & Tier-1 RPM Mix
    geo_resp = run_ga4_report(
        client,
        property_id,
        start_date,
        end_date,
        dimensions=["country"],
        metrics=["activeUsers", "sessions"],
        limit=30
    )

    geo_list = []
    tier_1_users = 0
    total_geo_users = 0

    for row in geo_resp.get("rows", []):
        country = row["dimensionValues"][0]["value"]
        users = int(row["metricValues"][0]["value"])
        sess = int(row["metricValues"][1]["value"])
        total_geo_users += users
        if country in TIER_1_COUNTRIES:
            tier_1_users += users

        geo_list.append({
            "country": country,
            "active_users": users,
            "sessions": sess,
            "is_tier_1": country in TIER_1_COUNTRIES
        })

    geo_list.sort(key=lambda x: x["active_users"], reverse=True)
    tier_1_pct = round((tier_1_users / total_geo_users * 100), 2) if total_geo_users > 0 else 0.0

    # 7. Device Mix
    devices_resp = run_ga4_report(
        client,
        property_id,
        start_date,
        end_date,
        dimensions=["deviceCategory"],
        metrics=["activeUsers", "sessions"],
        limit=10
    )

    devices = []
    for row in devices_resp.get("rows", []):
        devices.append({
            "category": row["dimensionValues"][0]["value"],
            "active_users": int(row["metricValues"][0]["value"]),
            "sessions": int(row["metricValues"][1]["value"])
        })
    devices.sort(key=lambda x: x["active_users"], reverse=True)

    # 8. Daily Timeline (last 14 days)
    daily_resp = run_ga4_report(
        client,
        property_id,
        "14daysAgo",
        end_date,
        dimensions=["date"],
        metrics=["activeUsers", "sessions", "screenPageViews", "userEngagementDuration"],
        limit=30
    )

    daily_timeline = []
    for row in daily_resp.get("rows", []):
        d_str = row["dimensionValues"][0]["value"]
        users = int(row["metricValues"][0]["value"])
        sess = int(row["metricValues"][1]["value"])
        views = int(row["metricValues"][2]["value"])
        dur = float(row["metricValues"][3]["value"])
        avg_dur = round(dur / users, 1) if users > 0 else 0.0

        daily_timeline.append({
            "date": f"{d_str[:4]}-{d_str[4:6]}-{d_str[6:]}",
            "active_users": users,
            "sessions": sess,
            "page_views": views,
            "avg_engagement_time_sec": avg_dur
        })

    daily_timeline.sort(key=lambda x: x["date"])

    # 9. Build JSON Payload
    payload = {
        "metadata": {
            "fetched_at": datetime.utcnow().isoformat() + "Z",
            "property_id": property_id,
            "range_days": args.days,
            "start_date": start_date,
            "end_date": end_date,
        },
        "overview": overview,
        "adsense_readiness_signals": {
            "tier_1_traffic_share_pct": tier_1_pct,
            "overall_engagement_rate_pct": overview["engagement_rate_pct"],
            "avg_session_duration": format_duration(overview["avg_session_duration_sec"]),
            "zombie_pages_count": len(zombie_pages),
            "content_quality_health": (
                "HEALTHY" if len(zombie_pages) == 0 and overview["engagement_rate_pct"] >= 50.0
                else f"NEEDS_ATTENTION ({len(zombie_pages)} low-engagement pages)"
            )
        },
        "top_pages": pages[:25],
        "zombie_pages": zombie_pages[:10],
        "traffic_sources": sources[:15],
        "ai_referrals": ai_referrals,
        "countries": geo_list[:15],
        "devices": devices,
        "daily_timeline_14d": daily_timeline
    }

    # Save to JSON
    out_path = project_root / args.output
    out_path.parent.mkdir(parents=True, exist_ok=True)
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(payload, f, indent=2, ensure_ascii=False)

    # 10. Print Executive Summary
    print("=" * 65)
    print("📈 FITWAY GOOGLE ANALYTICS 4 (GA4) EXECUTIVE SUMMARY")
    print("=" * 65)
    print(f"Active Users:            {overview['active_users']}")
    print(f"New Users:               {overview['new_users']}")
    print(f"Sessions:                {overview['sessions']}")
    print(f"Screen Page Views:       {overview['page_views']}")
    print(f"Engagement Rate:         {overview['engagement_rate_pct']}% (Bounce: {overview['bounce_rate_pct']}%)")
    print(f"Avg Session Duration:    {format_duration(overview['avg_session_duration_sec'])}")
    print("-" * 65)

    print("🛡️ AdSense Quality & Audience Signals:")
    print(f"   • Tier-1 Traffic Ratio:  {tier_1_pct}% (US, UK, CA, AU, NZ, DE)")
    print(f"   • Quality Health Status: {payload['adsense_readiness_signals']['content_quality_health']}")
    print(f"   • Zombie/At-Risk Pages:  {len(zombie_pages)}")
    print("-" * 65)

    print("📄 Top Landing Pages by Views:")
    for i, p in enumerate(pages[:6], 1):
        print(f"   {i}. {p['path']:<32} → {p['views']} views | {p['active_users']} users | {p['avg_engagement_time_sec']}s avg | {p['engagement_rate_pct']}% eng")

    if zombie_pages:
        print("-" * 65)
        print("⚠️ Zombie Pages (Low engagement risk for AdSense):")
        for i, zp in enumerate(zombie_pages[:4], 1):
            print(f"   {i}. {zp['path']:<30} → {zp['views']} views, {zp['avg_engagement_time_sec']}s dwell, {zp['bounce_rate_pct']}% bounce")

    print("-" * 65)
    print("🌐 Top Acquisition Channels:")
    for i, s in enumerate(sources[:5], 1):
        print(f"   {i}. {s['source_medium']:<32} → {s['sessions']} sessions | {s['engagement_rate_pct']}% eng")

    if ai_referrals:
        print("-" * 65)
        print("🤖 AI Search Referrals (ChatGPT, Perplexity, etc.):")
        for i, ar in enumerate(ai_referrals, 1):
            print(f"   {i}. {ar['source_medium']:<30} → {ar['sessions']} sessions")

    print("=" * 65)
    print(f"💾 Full dataset saved to: {out_path.relative_to(project_root)}")


if __name__ == "__main__":
    main()
