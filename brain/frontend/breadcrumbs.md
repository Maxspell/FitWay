# Global Breadcrumbs

Created a global Breadcrumbs component for the FitWay project to improve navigation and SEO.

## Details
- **Component Path**: `frontend/src/components/common/Breadcrumbs.tsx`
- **Behavior**: Client component. Automatically built from the Next.js `usePathname`. Contains SEO JSON-LD structured data (`BreadcrumbList`). Automatically hidden on the home page (`/`).
- **Pagination Collapsing**: Технический роутинг `/page/:number` (например, `/workouts/page/2` или `/blog/page/3`) автоматически схлопывается в единый элемент `Page :number`. Это предотвращает генерацию промежуточной ссылки на несуществующий/технический URL `/workouts/page` и исключает показ промежуточных тестовых данных или 404 страниц.
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

## ⚠️ Gotcha: Avoiding Duplicate Breadcrumbs

> [!CAUTION] Do NOT Include `<Breadcrumbs />` in Page Components
> Because the component is already declared globally at the root in `layout.tsx`, calling `<Breadcrumbs />` locally inside subpages (e.g. `src/app/tools/bmi-calculator/page.tsx` or `src/app/blog/[slug]/page.tsx`) causes duplicate breadcrumb bars to be rendered simultaneously in the DOM.
> 
> **Standard Implementation Rule**:
> - Never import or render `<Breadcrumbs />` inside subpage components.
> - Reserve vertical clearance for the overlay breadcrumbs by giving page hero sections or top containers `pt-12` or `pt-16`.

## Related Links
- [[frontend/fitness-calculators-pseo]] — Архитектура посадочных страниц калькуляторов и устранение локальных дубликатов крошек.
- [[frontend/pagination-system]] — Архитектура пагинации, маршрутизация и каноникализация.
- [[frontend/seo]] — SEO стратегия, микроразметка Schema.org и каноникалы.
- [[frontend/scroll-to-top]] — Глобальная навигация и элементы в RootLayout.
- [[frontend/responsive-layout]] — Адаптивная вёрстка страниц.
