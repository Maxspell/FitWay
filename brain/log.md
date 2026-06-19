# Knowledge Base Activity Log
## 2026-06-19
- Проведен комплексный SEO-аудит главной страницы для устранения ошибки "Thin Content" (Google AdSense). Внедрена стратегия "Trust Funnel": добавлены глубокие текстовые описания методологии, раздел с сертификациями экспертов (NASM, RD, CSCS) и профессиональный медицинский дисклеймер. Обновлены мета-теги и внедрена микроразметка JSON-LD (Organization, WebSite, FAQPage) для улучшения Rich Snippets. [[frontend/seo]]
- Расширены SEO-оптимизации: добавлена микроразметка `SoftwareApplication` JSON-LD для фитнес-калькуляторов (BMI и Calories) на главной странице, обеспечивающая отображение Rich Snippets (расширенные результаты). Данная разметка дублирует логику со страницы `/tools`. [[frontend/seo]]
- 
[38;2;153;153;153m## 2026-06-18[39m
- Разработано современное мобильное меню с использованием `framer-motion` и Tailwind CSS. Интегрировано в `Header` с условным скрытием десктопной навигации. Реализована обработка Accessibility (ARIA), предотвращение layout shift при блокировке скролла и анимация пунктов меню. [[frontend/mobile-menu]]
- Зафиксирована и решена ошибка компиляции TypeScript при использовании кастомных кривых Безье (массивов `ease`) во Framer Motion. Добавлено явное приведение типов (Type Assertion) к `[number, number, number, number]`. [[bugs/framer-motion-type-errors]]

## 2026-06-16
- Обновлена страница `Tools` (`/tools`): интегрирован компонент `FAQSection` (переиспользование с главной страницы), добавлена микроразметка `FAQPage` JSON-LD для Google Rich Snippets, а также внедрен CTA-блок со ссылками на тренировки и блог с использованием дизайн-системы сайта. Обновлена документация по SEO. [[frontend/seo]]
- Refactored blog post fetching on the main page. Extracted Strapi fetching logic to `post.service.ts` (with `publishedAt:desc` sorting) and UI logic to `LatestPosts.tsx` component, matching the `workout.service.ts` pattern. Documented the pattern for Next.js Server Components. [[frontend/data-fetching-pattern]]

## 2026-06-03
- Разработан и интегрирован премиальный компонент `TableOfContents` для блога. Реализован Scroll Spy через passive listeners. Добавлена генерация ID (slugify) для `ReactMarkdown` при SSR. Настроен sticky-сайдбар целиком. [[frontend/table-of-contents]]

## 2026-05-31
- Зафиксирован баг «конфликт `useState` и `metadata` в одном `page.tsx`» (Next.js 14 App Router). Решение: разделить на `page.tsx` (Server Component) и `ContactClient.tsx` (Client Component). [[bugs/build-errors]]
- Обновлена документация контактной формы: добавлена секция «Архитектура файлов (Server / Client Split)». [[frontend/contact-form]]

## 2026-05-29
- Created SEO-friendly `Breadcrumbs` component and integrated it globally into `layout.tsx` using absolute positioning to properly overlay hero backgrounds. [[frontend/breadcrumbs]]

## 2026-05-28
- Fixed `TypeError: Cannot read properties of null (reading 'url')` on the workouts page. Added optional chaining and local fallback image for Strapi media. [[bugs/frontend-media-nulls]]
- Resolved production build failure (missing `prerender-manifest.json`) by enforcing `npm run build` before PM2 restart. [[deploy/nextjs-build-failure]]
- Replaced external `via.placeholder.com` image with local asset to fix Next.js Image Optimization 400 errors.
