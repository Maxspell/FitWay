# Global Breadcrumbs

Created a global Breadcrumbs component for the FitWay project to improve navigation and SEO.

## Details
- **Component Path**: `frontend/src/components/common/Breadcrumbs.tsx`
- **Behavior**: Client component. Automatically built from the Next.js `usePathname`. Contains SEO JSON-LD structured data (`BreadcrumbList`). Automatically hidden on the home page (`/`).
- **Styling**: Uses Tailwind CSS matching the FitWay UI (dark mode, orange accent).

## Layout Integration
To prevent the breadcrumbs block from pushing down full-width hero backgrounds on detail pages (like `/blog/[slug]` and `/workouts/[slug]`), the component is injected into the global `layout.tsx` using `absolute` positioning within the `<main>` tag.

```tsx
<main className="flex-grow relative">
  <div className="absolute top-0 w-full z-10 pointer-events-none">
    <div className="container mx-auto px-4 pointer-events-auto">
      <Breadcrumbs baseUrl="https://fitway.best" className="pt-4 pb-0 drop-shadow-md" />
    </div>
  </div>
  {children}
</main>
```

This ensures the breadcrumbs gracefully overlay hero backgrounds while remaining fully interactive (`pointer-events-auto`), without altering the page's standard document flow.
