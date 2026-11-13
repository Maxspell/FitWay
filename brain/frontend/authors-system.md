# Authors System (E-E-A-T)

## Overview
The Authors System is a crucial part of the E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) strategy. It links content directly to certified professionals, increasing YMYL (Your Money or Your Life) trust signals for search engines.

## Architecture

### Backend (Strapi v5)
- **Author Collection (`api::author.author`)**: Stores comprehensive expert profiles (photo, credentials, job title, full bio, specializations, certifications, social links).
- **Relations**: 
  - `Post` and `Workout` collections have a `manyToOne` relation to `author`.
  - `Post` and `Workout` collections have a `manyToMany` relation to `reviewedBy` to indicate editorial review for safety and quality.

### Frontend (Next.js)
- **Listing Page (`/authors`)**: E-E-A-T Trust Hub featuring the Editorial Board statement, real-time editorial counters, expert directory grid, 4-step scientific verification workflow, core domain authority cards (/workouts, /blog/category/nutrition, /tools), fact-checking medical disclaimer, and editorial contact CTA.
- **Profile Page (`/authors/[slug]`)**: Enterprise E-E-A-T profile with SSG pre-rendering (`generateStaticParams`), absolute canonical, verified badge (`Verified E-E-A-T Editorial Reviewer`), separated authored content vs. peer-reviewed content (`articlesReviewed` and `workoutsReviewed`), high-RPM contextual tools recommendations (`/tools/*`), lateral cross-linking to editorial board colleagues, and direct link to `/editorial-policy`.
- **Components**:
  - `AuthorCatalogCard`: Dedicated catalog card (`frontend/src/components/authors/AuthorCatalogCard.tsx`) with verification badge, credentials, focus areas, live counters (articles, workouts, reviews), independent social profile links, and profile link.
  - `AuthorBox`: Used at the bottom of blog posts for full-width a-la "About the Author" summaries. Fully wrapped in a Next.js `Link` component to make the entire card clickable (`/authors/[slug]`) with rich hover effects and glowing avatars.
  - `AuthorSidebarCard`: Compact, unified component for sidebars in workout detail pages and other secondary sidebars. Deduplicated on the blog detail page (`/blog/[slug]`) to avoid redundant author blocks.
  - `WorkoutExpertReviewBox`: A badge on workout pages indicating that the program has been reviewed by a certified professional.

### SEO & Schema Integration
- We dynamically inject the author's full URL in the `BlogPosting` and `ExercisePlan` JSON-LD schemas.
- The authors catalog page (`/authors`) features a comprehensive `@graph` with `CollectionPage`, `BreadcrumbList`, `ItemList`, and `Person` entities.
- The author profile page (`/authors/[slug]`) features an Enterprise Schema.org `@graph` incorporating:
  - `ProfilePage` (`mainEntity` pointing to Person).
  - `BreadcrumbList` (Home -> Editorial Board -> Author Name).
  - `Person` (`worksFor: FitWay Organization`, `publishingPrinciples: /editorial-policy`, structured `hasCredential` using `EducationalOccupationalCredential`, `sameAs`, `knowsAbout`).

Related: [[frontend/seo]], [[frontend/editorial-policy]], [[frontend/responsive-layout]], [[frontend/blog-ui]], [[backend/strapi-v5-collections]]
