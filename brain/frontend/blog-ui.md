# Blog UI Improvements

## Card Component Evolution
The blog listing page was updated to improve UX and information density.

### Key Changes
- **Full-Card Links**:
  - The entire post card is wrapped in a `Link` component, making the target area larger and more intuitive.
  - `AuthorBox`: The full-width author block below the article text is now wrapped in a Next.js `Link` (`/authors/[slug]`) making the entire card clickable with hover feedback, replacing nested link buttons.
- **Visual Feedback**: Added `hover:ring-2 hover:ring-[#FF8C00]` to the cards to provide clear interactive cues.
- **Mobile Responsiveness**:
  - **Featured Post (`/blog`)**: Fixed the horizontal split (`w-1/2`) to `flex-col md:flex-row`, image height `h-56 sm:h-72 md:h-[400px]`, and metadata `flex-wrap`.
  - **Article Detail Hero (`/blog/[slug]`)**: Hero container height made adaptive (`h-72 sm:h-96 md:h-[500px]`), padding reduced to `p-4 sm:p-6 md:p-8`, title typography scaled for mobile.
  - **Grid & Sidebar**: Content and sidebar split into `flex flex-col lg:grid lg:grid-cols-12` so the sidebar drops cleanly below the article on smaller screens instead of squeezing into 4 columns.
- **Information Architecture & Deduplication**:
  - Moved the introductory SEO/description section on `/blog` ("Unlock Your Potential with FitWay Insights") to the bottom of the page beneath the categories, putting the latest content front and center.
  - Removed duplicate `AuthorSidebarCard` from the sidebar of `/blog/[slug]` to prevent showing two author cards in a single viewport.
- **Data Display**:
  - Integrated `readTime` for better user expectation management.
  - Switched to `createdAt` for dates across all views (Hero, general list, related articles, and homepage) formatted via `toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })`. See [[frontend/blog-date-sorting-metadata]].
- **Sidebar Hierarchy & Category Navigation (`/blog/[slug]`)**:
  - Replaced the legacy single-pill `Category` card with a dedicated `BlogCategoriesWidget` ("Explore Topics").
  - Displays all 6 blog hub categories (*Nutrition*, *Muscle Building*, *Weight Loss*, *Training*, *Lifestyle*, *Motivation*) with semantic Lucide icons.
  - Active state dynamically highlights the current article's category in `#FF8C00` while preserving clean link exploration to other categories.
  - Sidebar layout order optimized for SEO and Core Web Vitals viewport budgeting:
    1. `TableOfContents` (Article reading navigation)
    2. `BlogCategoriesWidget` (Topical silo internal linking within initial fold)
    3. `FitnessToolsSidebarWidget` (Interactive conversion suite)
- **Related Articles**:
  - Filtered by category (`filters[category][slug][$eq]=...`) matching the current post, with fallback to latest articles to ensure 3 recommendations.
  - Layout upgraded from 2 columns to a 3-column responsive grid (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`). See [[frontend/related-articles]].
- **Homepage Blog Section (`LatestPosts.tsx`, `post.service.ts`)**:
  - Upgraded from boxed `.card` inset thumbnails to modern `rounded-[2rem]` full-bleed `aspect-[16/10]` editorial cards with solid `#243447` surfaces, `-inset-px` bottom gradient scrim overbleed + `scale-[1.01]` / `transform-gpu` (preventing subpixel hover seams), floating category and `readTime` pills, `line-clamp-2`/`line-clamp-3` text rhythm, author avatar + deterministic UTC `<time>` footer, and `LatestPostsSkeleton`.
  - Uses the Stretched Link pattern (`after:absolute after:inset-0 after:z-10` on the title `<Link>`) with `z-20` sub-links so the category pill links to `/blog/category/[slug]`, the author block links to `/authors/[slug]`, and the rest of the card links to `/blog/[slug]` without nested `<a>` tags.
  - Section header features an `Evidence-Based Journal` eyebrow pill, two-tone `Latest from Our Blog` `<h2>`, subtitle, and `View All Posts` pill CTA matching `FeaturedWorkouts` (`px-8 py-4 rounded-2xl font-bold`, `group-hover:rotate-45` icon badge in WCAG AA `#C25700`).
  - `getBlogPosts()` in `post.service.ts` explicitly populates `image`, `category`, and `author.photo` for homepage cards.

**Related:**
- [[frontend/related-articles]] - Category-based matching, fallback strategy, and 3-column layout.
- [[frontend/blog-date-sorting-metadata]] - Synchronization of `createdAt`, `sort=createdAt:desc`, author, and category populates.
- [[frontend/markdown-tables-gfm]] - Markdown content rendering with GFM table support.
- [[frontend/responsive-layout]] - Mobile-first grid layouts and responsive cards.
- [[frontend/authors-system]] - Author cards and profile architecture.
- [[frontend/data-fetching-pattern]] - Service + UI Component data fetching pattern.
- [[frontend/seo]] - Schema.org and content structure.
