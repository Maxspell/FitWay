# Knowledge Base Activity Log

## 2026-05-29
- Created SEO-friendly `Breadcrumbs` component and integrated it globally into `layout.tsx` using absolute positioning to properly overlay hero backgrounds. [[frontend/breadcrumbs]]

## 2026-05-28
- Fixed `TypeError: Cannot read properties of null (reading 'url')` on the workouts page. Added optional chaining and local fallback image for Strapi media. [[bugs/frontend-media-nulls]]
- Resolved production build failure (missing `prerender-manifest.json`) by enforcing `npm run build` before PM2 restart. [[deploy/nextjs-build-failure]]
- Replaced external `via.placeholder.com` image with local asset to fix Next.js Image Optimization 400 errors.
