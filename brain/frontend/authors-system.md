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
- **Listing Page (`/authors`)**: Displays a grid of all active authors.
- **Profile Page (`/authors/[slug]`)**: Detailed profile showcasing credentials, a comprehensive bio, and a dynamic list of articles written, workouts created, and content reviewed.
- **Components**:
  - `AuthorBox`: Used at the bottom of blog posts for full-width a-la "About the Author" summaries.
  - `AuthorSidebarCard`: Compact, unified component for sidebars in blog and workout detail pages, ensuring a consistent expert presence.
  - `WorkoutExpertReviewBox`: A badge on workout pages indicating that the program has been reviewed by a certified professional.

### SEO & Schema Integration
- We dynamically inject the author's full URL in the `BlogPosting` and `ExercisePlan` JSON-LD schemas.
- The author profile page features a `Person` schema aggregating all social links, expertise areas (`knowsAbout`), and professional awards/certifications (`award`).

Related: [[frontend/seo]], [[backend/strapi-v5-collections]]
