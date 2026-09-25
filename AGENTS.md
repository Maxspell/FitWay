Project Overview


FitWay is a modern AI-powered fitness platform focused on workout discovery, educational fitness content, and SEO-driven health resources. It utilizes a decoupled architecture with a Next.js 14 frontend and a Strapi 5 headless CMS backend.


**Core Goal**: Generate high organic SEO traffic and maintain superior Core Web Vitals while providing high-quality training programs and health information.


## Repository Structure

- frontend/: Next.js 14 application (App Router).
- backend/: Strapi 5 CMS.
- brain/: Long-term engineering memory (Knowledge Base). Contains architecture, decisions, bugs, and roadmaps.
- .github/workflows/: CI/CD pipeline for VPS deployment.


## Architecture

### Frontend (Next.js 14)
- Rendering: Strong preference for ISR (Incremental Static Regeneration) to balance freshness and speed.
- State & Data: Uses a Service + UI Component extraction pattern. Data fetching logic is encapsulated in src/services/*.service.ts, while UI is in src/components/.
- Styling: Tailwind CSS with Framer Motion for animations.
- Images: Strict optimization. Local WebP files in public/images/ are preferred over external URLs to improve LCP/FCP.

### Backend (Strapi 5)
- Role: Centralized content management for Workouts, Blog Posts, and FAQs.
- API: REST API serving structured JSON to the frontend.
- Database: SQLite (Dev), PostgreSQL/MySQL (Prod).

### Data Flow
User -> Next.js Frontend -> Strapi REST API -> Database.


## Tech Stack

- Frontend: Next.js 14, TypeScript, Tailwind CSS, Framer Motion, SWR.
- Backend: Strapi 5, Node.js.
- Infrastructure: Ubuntu VPS, Nginx (Reverse Proxy), PM2 (Process Manager), GitHub Actions (CI/CD).


## Development Commands

### Frontend
- npm run dev: Start development server.
- npm run build: Build for production.
- npm run start: Start production server.
- npm run lint: Run ESLint.

### Backend
- npm run develop: Start Strapi in development mode.
- npm run build: Build Strapi admin panel.
- npm run start: Start Strapi in production mode.


## Coding Conventions

- Service Layer Pattern: Never put complex fetch calls directly in page.tsx. Use src/services/.
- SEO-First: Every change must be evaluated for its impact on search visibility and Core Web Vitals.
- Image Handling: Use next/image. Localize heavy hero images to public/images/ and use exact sizes attributes.
- TypeScript: Use strict typing for Strapi API responses to avoid any and runtime null errors.


## Frontend Guidelines

- Metadata: Be mindful of the Metadata Cascade. If a dynamic page (e.g., categories) needs a specific canonical URL, it must be explicitly defined in generateMetadata to avoid inheriting the root layout canonical.
- Accessibility: Follow WCAG AA standards. Maintain high contrast for buttons (#C25700) and placeholders.
- Animations: Avoid conflicts between Framer Motion and Tailwind transition-all to prevent flickering.


## Backend Guidelines

- Collection Creation: When creating collections via code, follow the structure in src/api/[name]/ (schema, controller, route, service).
- Permissions: New collections do not automatically grant permissions to API Tokens. Manually update token permissions in the Strapi Admin.
- Admin Cache: Rebuild the Strapi admin after schema changes.


## Data and Database

- Content Types: Core collections include Workout, Review, Author, Post, and Category.
- API Tokens: Used for secure frontend-to-backend communication.


## SEO

- Structured Data: Use ExercisePlan and Course for workouts, FAQPage for FAQs, and SoftwareApplication for calculators.
- E-E-A-T: Prioritize Author profiles, scientific citations (PubMed/NCBI), and a clear Editorial Policy.
- AI Readiness: Maintain public/llms.txt for AI crawlers and agentic browsing.
- Indexation: Ensure dynamic routes (like blog categories) have self-referential canonical tags and are included in sitemap.ts.


## Environment Variables

### Frontend (.env.local)
- NEXT_PUBLIC_STRAPI_URL: The public URL of the Strapi API (e.g., https://api.fitway.best).

### Backend (.env)
- PUBLIC_URL: The public URL of the Strapi instance.
- HOST, PORT: Server binding configuration.
- APP_KEYS: Security keys for Strapi.


## Deployment

- Architecture: SSH-based deployment via GitHub Actions to an Ubuntu VPS.
- Nginx: Proxies fitway.best to the Next.js app and api.fitway.best to Strapi.
- PM2: Manages fitway-frontend and fitway-backend processes.
- Crucial: Use pm2 restart [process] --update-env whenever .env files change.
- Next.js Build: NEXT_PUBLIC_* variables are embedded at build time; a full npm run build is required after changing them.


## Important Files

- brain/core/project-overview.md: The Source of Truth for project goals and stack.
- brain/index.md: Index to the entire knowledge base.
- frontend/next.config.mjs: Contains remotePatterns for Strapi images.
- frontend/src/app/sitemap.ts: Dynamic sitemap generation logic.
- .github/workflows/deploy.yml: Deployment pipeline definition.


## Documentation

Consult the /brain directory for detailed guides:
- Architecture: brain/architecture/
- Known Bugs/Fixes: brain/bugs/
- Deployment: brain/deploy/
- Frontend SEO: brain/frontend/seo.md
## Common Pitfalls
- Canonical Inheritance: Forgetting to set a local canonical on /blog/category/[slug], leading to Google indexing them as duplicates of the homepage.

- Strapi 403/400: Forgetting to update API Token permissions for new collections or missing Public permissions for related models.

- Image 400s: Missing the Strapi hostname in remotePatterns within next.config.mjs.

- SSL Mismatch: Using a certificate for fitway.best that does not cover the api.fitway.best subdomain.


## Safe Change Workflow

1. Inspect: Read relevant brain/ notes and existing implementation.
2. Verify: For SEO changes, check brain/frontend/seo.md and ACTION-PLAN.md.
3. Smallest Change: Apply the most targeted fix possible.
4. Validate: 
   - Run npm run lint and npm run build (locally if possible) to check for metadata/type errors.
   - Verify canonical tags and structured data in HTML.
   - Check if new API endpoints require token permission updates.


## Validation Checklist

- [ ] Does this change impact Core Web Vitals or LCP?
- [ ] Are all new images localized or configured in remotePatterns?
- [ ] Does the page have the correct self-referential canonical tag?
- [ ] Did I update the brain/ knowledge base if I discovered a new architectural pattern or bug?
- [ ] If backend changes were made, did I rebuild the Strapi admin?
