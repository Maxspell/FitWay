"""
Google Search Console API Client for FitWay (fitway.best)
Fetches organic search performance metrics, low-hanging fruits, and indexation state.
Saves results to brain/data/gsc-latest.json for AI agents and reports summary to stdout.
"""

import os
import sys
import json
import argparse
from datetime import datetime, timedelta
from pathlib import Path

try:
    from google.oauth2 import service_account
    from googleapiclient.discovery import build
    from googleapiclient.errors import HttpError
except ImportError:
    print("Error: Missing Google API dependencies. Install with: pip install google-api-python-client google-auth")
    sys.exit(1)

SCOPES = ["https://www.googleapis.com/auth/webmasters.readonly"]
DEFAULT_SITE_URLS = ["https://fitway.best/", "sc-domain:fitway.best"]


def find_credentials(custom_path=None) -> Path:
    """Finds the service account JSON key in credentials/ or custom path."""
    if custom_path:
        p = Path(custom_path)
        if p.exists():
            return p
        raise FileNotFoundError(f"Credentials not found at specified path: {custom_path}")

    # Search in credentials directory relative to project root
    script_dir = Path(__file__).resolve().parent
    project_root = script_dir.parent
    cred_dir = project_root / "credentials"

    if cred_dir.exists():
        json_files = list(cred_dir.glob("*.json"))
        if json_files:
            # Return the first or most recently modified key
            return sorted(json_files, key=lambda f: f.stat().st_mtime, reverse=True)[0]

    raise FileNotFoundError(
        f"No JSON key found in {cred_dir}. Please place your service account JSON file in the credentials/ directory."
    )


def get_service(credentials_path: Path):
    """Authenticates and returns the Search Console service."""
    creds = service_account.Credentials.from_service_account_file(
        str(credentials_path), scopes=SCOPES
    )
    return build("searchconsole", "v1", credentials=creds)


def resolve_site_url(service, candidate_urls):
    """Determines which property URL is accessible by the service account."""
    try:
        sites_res = service.sites().list().execute()
        site_entries = sites_res.get("siteEntry", [])
        verified_sites = [entry.get("siteUrl") for entry in site_entries]
    except Exception as e:
        verified_sites = []

    # If the service account sees verified sites, pick the best fitway match
    for s in verified_sites:
        if "fitway.best" in s:
            return s

    # Fallback to candidates
    for candidate in candidate_urls:
        try:
            # Test query
            today = datetime.utcnow().date()
            start_date = (today - timedelta(days=3)).strftime("%Y-%m-%d")
            end_date = (today - timedelta(days=1)).strftime("%Y-%m-%d")
            request = {
                "startDate": start_date,
                "endDate": end_date,
                "rowLimit": 1,
            }
            service.searchanalytics().query(siteUrl=candidate, body=request).execute()
            return candidate
        except HttpError:
            continue

    # Return default if not determined
    return candidate_urls[0]


def query_performance(service, site_url: str, start_date: str, end_date: str, dimensions=None, row_limit=1000):
    """Executes a searchanalytics.query request."""
    request = {
        "startDate": start_date,
        "endDate": end_date,
        "rowLimit": row_limit,
    }
    if dimensions:
        request["dimensions"] = dimensions

    try:
        response = service.searchanalytics().query(siteUrl=site_url, body=request).execute()
        return response.get("rows", [])
    except HttpError as e:
        print(f"API Error querying {dimensions}: {e}", file=sys.stderr)
        return []


def inspect_url(service, site_url: str, inspect_url_target: str):
    """Inspects a specific URL using urlInspection API."""
    try:
        request = {
            "inspectionUrl": inspect_url_target,
            "siteUrl": site_url,
        }
        res = service.urlInspection().index().inspect(body=request).execute()
        return res.get("inspectionResult", {})
    except HttpError as e:
        return {"error": str(e)}


def main():
    parser = argparse.ArgumentParser(description="FitWay Google Search Console Sync Tool")
    parser.add_argument("--days", type=int, default=28, help="Number of days to analyze (default: 28)")
    parser.add_argument("--site", type=str, default=None, help="GSC Site URL (e.g., https://fitway.best/ or sc-domain:fitway.best)")
    parser.add_argument("--credentials", type=str, default=None, help="Path to service account JSON key")
    parser.add_argument("--inspect", type=str, default=None, help="Inspect a specific URL using URL Inspection API")
    parser.add_argument("--output", type=str, default="brain/data/gsc-latest.json", help="Path to save JSON results")
    args = parser.parse_args()

    project_root = Path(__file__).resolve().parent.parent

    # 1. Credentials
    try:
        cred_path = find_credentials(args.credentials)
    except FileNotFoundError as e:
        print(f"❌ {e}")
        sys.exit(1)

    # 2. Service build
    service = get_service(cred_path)

    # 3. Resolve Site URL
    site_url = args.site
    if not site_url:
        site_url = resolve_site_url(service, DEFAULT_SITE_URLS)

    today = datetime.utcnow().date()
    # Search Console data has a 2-3 day latency window
    end_date = (today - timedelta(days=2)).strftime("%Y-%m-%d")
    start_date = (today - timedelta(days=2 + args.days)).strftime("%Y-%m-%d")
    seven_days_start = (today - timedelta(days=2 + 7)).strftime("%Y-%m-%d")

    print(f"🔍 Connected to Google Search Console API")
    print(f"   • Property: {site_url}")
    print(f"   • Key: {cred_path.name}")
    print(f"   • Range: {start_date} to {end_date} ({args.days} days)\n")

    # If inspect only requested
    if args.inspect:
        print(f"🔎 Inspecting URL: {args.inspect}")
        inspect_res = inspect_url(service, site_url, args.inspect)
        print(json.dumps(inspect_res, indent=2))
        return

    # 4. Fetch Aggregate Totals (by date to track traffic gatekeeper threshold)
    daily_rows = query_performance(service, site_url, start_date, end_date, dimensions=["date"], row_limit=args.days + 5)
    daily_stats = []
    total_clicks = 0
    total_impressions = 0

    for r in daily_rows:
        date_str = r["keys"][0]
        clicks = r.get("clicks", 0)
        impr = r.get("impressions", 0)
        ctr = r.get("ctr", 0.0)
        pos = r.get("position", 0.0)
        total_clicks += clicks
        total_impressions += impr
        daily_stats.append({
            "date": date_str,
            "clicks": clicks,
            "impressions": impr,
            "ctr": round(ctr * 100, 2),
            "position": round(pos, 1)
        })

    avg_ctr = (total_clicks / total_impressions * 100) if total_impressions > 0 else 0.0
    avg_pos = (sum(d["position"] for d in daily_stats) / len(daily_stats)) if daily_stats else 0.0

    # Calculate last 7 days metrics
    last_7_days = [d for d in daily_stats if d["date"] >= seven_days_start]
    last_7_clicks = sum(d["clicks"] for d in last_7_days)
    last_7_impr = sum(d["impressions"] for d in last_7_days)
    avg_daily_clicks_7d = round(last_7_clicks / max(len(last_7_days), 1), 1)
    avg_daily_impr_7d = round(last_7_impr / max(len(last_7_days), 1), 1)

    # 5. Fetch Queries (for Low-Hanging Fruits: pos 10-30 with high impressions)
    query_rows = query_performance(service, site_url, start_date, end_date, dimensions=["query"], row_limit=1000)
    parsed_queries = []
    low_hanging_fruits = []

    for r in query_rows:
        q = r["keys"][0]
        clicks = r.get("clicks", 0)
        impr = r.get("impressions", 0)
        ctr = round(r.get("ctr", 0.0) * 100, 2)
        pos = round(r.get("position", 0.0), 1)

        item = {
            "query": q,
            "clicks": clicks,
            "impressions": impr,
            "ctr": ctr,
            "position": pos
        }
        parsed_queries.append(item)

        # Striking distance: position 10.0 to 30.0 with notable impressions (>= 10 impressions or top opportunities)
        if 10.0 <= pos <= 30.0:
            low_hanging_fruits.append(item)

    # Sort low-hanging fruits by impressions descending
    low_hanging_fruits.sort(key=lambda x: x["impressions"], reverse=True)
    top_queries_by_clicks = sorted(parsed_queries, key=lambda x: x["clicks"], reverse=True)[:15]

    # 6. Fetch Pages
    page_rows = query_performance(service, site_url, start_date, end_date, dimensions=["page"], row_limit=500)
    parsed_pages = []

    for r in page_rows:
        p_url = r["keys"][0]
        clicks = r.get("clicks", 0)
        impr = r.get("impressions", 0)
        ctr = round(r.get("ctr", 0.0) * 100, 2)
        pos = round(r.get("position", 0.0), 1)
        parsed_pages.append({
            "page": p_url,
            "clicks": clicks,
            "impressions": impr,
            "ctr": ctr,
            "position": pos
        })

    parsed_pages.sort(key=lambda x: x["clicks"], reverse=True)

    # 7. Prepare Output Payload
    payload = {
        "metadata": {
            "fetched_at": datetime.utcnow().isoformat() + "Z",
            "site_url": site_url,
            "range_days": args.days,
            "start_date": start_date,
            "end_date": end_date,
        },
        "overview": {
            "total_clicks": total_clicks,
            "total_impressions": total_impressions,
            "average_ctr": round(avg_ctr, 2),
            "average_position": round(avg_pos, 1),
            "last_7_days": {
                "clicks": last_7_clicks,
                "impressions": last_7_impr,
                "avg_daily_clicks": avg_daily_clicks_7d,
                "avg_daily_impressions": avg_daily_impr_7d,
                "adsense_gatekeeper_status": (
                    "READY (>= 15 clicks/day)" if avg_daily_clicks_7d >= 15.0 else f"WAITING ({avg_daily_clicks_7d}/15 daily clicks target)"
                ),
            }
        },
        "low_hanging_fruits": low_hanging_fruits[:25],
        "top_queries": top_queries_by_clicks,
        "top_pages": parsed_pages[:20],
        "daily_timeline": daily_stats,
    }

    # Save to JSON
    out_path = project_root / args.output
    out_path.parent.mkdir(parents=True, exist_ok=True)
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(payload, f, indent=2, ensure_ascii=False)

    # 8. Print Executive Summary
    print("=" * 60)
    print("📊 FITWAY SEARCH CONSOLE EXECUTIVE SUMMARY")
    print("=" * 60)
    print(f"Total Clicks:       {total_clicks:,}")
    print(f"Total Impressions:  {total_impressions:,}")
    print(f"Average CTR:        {avg_ctr:.2f}%")
    print(f"Average Position:   {avg_pos:.1f}")
    print("-" * 60)
    print(f"📈 Last 7 Days Velocity:")
    print(f"   • Clicks (7d):         {last_7_clicks} (avg {avg_daily_clicks_7d}/day)")
    print(f"   • Impressions (7d):    {last_7_impr} (avg {avg_daily_impr_7d}/day)")
    print(f"   • AdSense Gatekeeper:  {payload['overview']['last_7_days']['adsense_gatekeeper_status']}")
    print("-" * 60)

    print(f"🎯 Top Low-Hanging Fruits (Position 10-30, striking distance):")
    if low_hanging_fruits:
        for i, q in enumerate(low_hanging_fruits[:7], 1):
            print(f"   {i}. \"{q['query']}\" → Impr: {q['impressions']} | Pos: {q['position']} | CTR: {q['ctr']}%")
    else:
        print("   (No queries in range 10-30 found with current data)")

    print("-" * 60)
    print(f"📄 Top Landing Pages:")
    for i, p in enumerate(parsed_pages[:5], 1):
        clean_path = p['page'].replace("https://fitway.best", "") or "/"
        print(f"   {i}. {clean_path} → {p['clicks']} clicks, {p['impressions']} impr, {p['ctr']}% CTR")

    print("=" * 60)
    print(f"💾 Full dataset saved to: {out_path.relative_to(project_root)}")


if __name__ == "__main__":
    main()

