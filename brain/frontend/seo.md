# SEO Strategy and Implementation

This document outlines the core SEO practices and specific implementations used in the FitWay platform.

## 1. AI Search Readiness (GEO)
- **`llms.txt`**: We maintain a `public/llms.txt` file at the root level. This file provides clear instructions and context for LLMs and AI crawlers, detailing the site's purpose, key sections (workouts, blog, tools), and preferred citation styles. This is critical for visibility in generative search engines.

## 2. E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness)
- **Author Profiles**: The `/about` page must explicitly display team credentials. We render specific certifications (e.g., "NASM-CPT", "RD") and provide outgoing links to professional profiles (e.g., LinkedIn). This builds trust with both users and search evaluators.
- **Content Depth**: Workout pages include dynamic "Expert Tips" and "Common Mistakes" sections. This increases the uniqueness and authority of the content compared to generic workout descriptions.

## 3. Structured Data (Schema.org)
- **Workouts as Courses**: On workout detail pages (`workouts/[slug]/page.tsx`), we use a multi-type JSON-LD schema: `["ExercisePlan", "Course"]`. 
  - Using `Course` allows us to target rich snippets in Google SERPs for fitness programs. 
  - Required properties for `Course` include `provider` (FitWay) and `hasCourseInstance` (to denote it as an online format).

## 4. Internal Linking Strategy
- **Matrix Approach**: We use an internal link matrix to connect top-of-funnel content (Blog posts) to mid/bottom-funnel content (Workouts and Tools).
- **Best Practices**: 
  - Use descriptive, keyword-rich anchor text (avoid "click here").
  - Aim for 2-3 deep internal links per 1000 words.

## 5. User-Generated Content (UGC)
- **Review System**: We include a review system on workout pages. Even if the backend integration is pending, rendering the frontend UI with keyword-rich reviews helps search engines index long-tail keywords associated with social proof (e.g., "results", "consistency", "easy to follow").
