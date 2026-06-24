# SEO Strategy and Implementation

This document outlines the core SEO practices and specific implementations used in the FitWay platform.

## 1. AI Search Readiness (GEO)
- **`llms.txt`**: We maintain a `public/llms.txt` file at the root level. This file provides clear instructions and context for LLMs and AI crawlers, detailing the site's purpose, key sections (workouts, blog, tools), and preferred citation styles. This is critical for visibility in generative search engines.

## 2. E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness)
- **Author Profiles**: The `/about` page must explicitly display team credentials. We render specific certifications (e.g., "NASM-CPT", "RD") and provide outgoing links to professional profiles. This builds trust with both users and search evaluators.
- **Trust Funnel Implementation**: We implement a "Trust Funnel" on the home page to combat "Thin Content" flags and satisfy YMYL requirements:
  - **Medical Disclaimer**: A professional disclaimer is placed in the footer to signal safety and compliance.
  - **Scientific Proof**: A dedicated "Why FitWay" section explains the physiological basis of the platform (Progressive Overload, Bio-Individual Analysis, Metabolic Optimization).
  - **Human Authority**: An "Experts" section showcases the credentials of the core team (NASM, RD, CSCS) directly on the main page, not just in the about page.
- **Dedicated Authors System**: We implemented a complete [[frontend/authors-system]] to provide detailed profiles, certifications, and lists of published/reviewed content for each expert, directly linking these profiles in the `Person` JSON-LD schema on articles and workouts.
- **Content Depth**: Workout pages include dynamic "Expert Tips" and "Common Mistakes" sections. This increases the uniqueness and authority of the content compared to generic workout descriptions.

## 3. Structured Data (Schema.org)
- **Organization & WebSite**: Implemented globally in `layout.tsx` to define the brand identity and official URL for Google's Knowledge Graph.
- **Workouts as Courses**: On workout detail pages (`workouts/[slug]/page.tsx`), we use a multi-type JSON-LD schema: `["ExercisePlan", "Course"]`. 
  - Using `Course` allows us to target rich snippets in Google SERPs for fitness programs. 
- **FAQ Page Schema**: Implemented dynamically on the home page and in the `/tools` section. This ensures Google recognizes the questions and answers for FAQ Rich Snippets, significantly increasing SERP real estate and CTR.
- **SoftwareApplication Schema**: Used for interactive tools like the BMI and Daily Calorie Calculators on both the `/tools` and main (`/`) pages. This provides rich snippets (расширенные результаты) for the calculators in search results, detailing features and aggregate ratings.

## 4. Internal Linking Strategy
- **Matrix Approach**: We use an internal link matrix to connect top-of-funnel content (Blog posts) to mid/bottom-funnel content (Workouts and Tools).
- **CTA Blocks**: We systematically append contextual CTA blocks with deep links (e.g., to `/workouts` or `/blog`) using Next.js `<Link>` components styled consistently with the site's design pattern.
- **Best Practices**: 
  - Use descriptive, keyword-rich anchor text (avoid "click here").
  - Aim for 2-3 deep internal links per 1000 words.

## 5. User-Generated Content (UGC)
- **Review System**: We include a review system on workout pages. Even if the backend integration is pending, rendering the frontend UI with keyword-rich reviews helps search engines index long-tail keywords associated with social proof (e.g., "results", "consistency", "easy to follow").

## 7. Hub Page Optimization (/workouts)
- **Thin Content Mitigation**: To satisfy Google AdSense quality standards, the workout library hub (`/workouts`) was transformed from a simple directory into an educational resource. A comprehensive introductory section (200-300 words) was added, explaining:
  - **Methodology**: Focus on functional movement and progressive overload.
  - **Accessibility**: Guidance for all fitness levels (Beginner to Advanced).
  - **Path Selection**: Clear definitions for "Weight Loss", "Muscle Gain", and "Toning" tracks to help users navigate the library.
- **Benefit-Driven Metadata**: Updated the page description from a feature list to a benefit-focused statement ("Transform your body...", "science-backed routines"), improving CTR and perceived value.
- **Directory Structured Data**: Implemented `ItemList` JSON-LD on the hub page. This programmatically lists all available workouts with their positions and URLs, enabling Google to recognize the page as a high-value directory and potentially trigger list-based rich snippets.
