# Data Fetching Pattern in Next.js App Router

To keep Next.js Server Components (like `page.tsx`) clean, we use a Service + UI Component extraction pattern.

## The Pattern
1. **Service Layer**: Extract data fetching logic (e.g., `getBlogPosts`, `getWorkouts`) into `src/services/*.service.ts`. This encapsulates Strapi API tokens, fetch options, cache rules (`revalidate`), and complex sorting/filtering queries (e.g., `sort=publishedAt:desc`).
2. **UI Component**: Extract the markup and rendering logic into specific reusable components (e.g., `src/components/sections/blog/LatestPosts.tsx`).
3. **Page Component**: The main `page.tsx` file becomes extremely lightweight. It fetches the data via the service and passes it as props to the UI component.

## Example
We applied this pattern to the blog posts section on the homepage:
- Moved API call to `getBlogPosts` in `post.service.ts`.
- Extracted UI into `<LatestPosts />`.
- `page.tsx` simply awaits `getBlogPosts()` and renders `<LatestPosts posts={blogPosts} />`.

## Benefits
- **Clean Architecture**: Separation of concerns. `page.tsx` handles composition, `services` handle data, and `components` handle UI.
- **Reusability**: You can now import `<LatestPosts />` and `getBlogPosts()` anywhere else in the app.
- **Maintainability**: Easier to test and update API endpoints or UI independently.
