# Workouts Canonical Metadata Fix

## Overview
Implemented SEO‑focused metadata updates for the **Workouts** section:

- **`frontend/src/app/workouts/page.tsx`** – Updated the exported `metadata` object:
  - Title shortened to "Workout Library".
  - Added `alternates.canonical: "/workouts"` to produce `<link rel="canonical" href="https://fitway.best/workouts">`.
  - Adjusted filter button class naming formatting.
- **`frontend/src/app/workouts/[slug]/page.tsx`** – Extended `generateMetadata`:
  - Added `alternates.canonical: "/workouts/${params.slug}"` for each workout detail page.
  - Preserved title, description, OpenGraph and Twitter meta.

These changes ensure that search engines receive correct canonical URLs for the workouts index and each individual workout page, solving the previous issue where the homepage URL was used.

## Linked Files
- Workouts index page: [workouts/page.tsx](file:///d:/Users/doomi/ReactProjects/FitWay/frontend/src/app/workouts/page.tsx)
- Workouts detail page: [workouts/[slug]/page.tsx](file:///d:/Users/doomi/ReactProjects/FitWay/frontend/src/app/workouts/%5Bslug%5D/page.tsx)
- LLM Wiki reference: [core/llm-wiki.md](file:///d:/Users/doomi/ReactProjects/FitWay/brain/core/llm-wiki.md)

## Rationale
Following the **LLM Wiki** pattern (see `brain/core/llm-wiki.md`), we record incremental knowledge improvements as mutable markdown artifacts. This entry captures the SEO fix, making it searchable for future maintenance and onboarding.
