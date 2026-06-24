# Knowledge Base Activity Log
## 2026-06-24
- Проведен SEO-аудит и комплексная оптимизация страницы `/contact` для прохождения модерации Google AdSense.
    - **Trust Signals**: Синхронизированы домен почты (`info@fitway.best`), исправлены плейсхолдеры адреса и телефона, добавлен SLA по времени ответа.
    - **Compliance**: Интегрирована ссылка на Privacy Policy в форму отправки.
    - **Content Depth**: Расширен блок FAQ для борьбы с "Thin Content".
    - **Structured Data**: Внедрена микроразметка `ContactPage` JSON-LD.
    - **UI/UX**: Интегрирован премиальный компонент `FAQSection` с поддержкой категорий и динамической загрузкой из Strapi. [[frontend/contact-form]] [[frontend/seo]]
- Проведен SEO-аудит и оптимизация страницы библиотеки тренировок `/workouts` для прохождения модерации Google AdSense.
    - **Thin Content Mitigation**: Добавлен образовательный вводный блок (200-300 слов) с описанием методологии и гидом по выбору программ.
    - **Metadata**: Описание страницы обновлено на benefit-driven формат для повышения CTR.
    - **Structured Data**: Внедрена микроразметка `ItemList` JSON-LD для индексации каталога тренировок. [[frontend/seo]]
    - **Blog SEO**: Внедрена микроразметка `ItemList` JSON-LD для страницы блога `/blog` для улучшения индексации списка статей и отображения Rich Snippets. [[frontend/seo]]

## 2026-06-23
- Проведен SEO-аудит страницы `/about` с целью прохождения проверки Google AdSense. Реализован комплекс мер по устранению проблем P0 (Critical Issues): созданы страницы `/privacy-policy` и `/terms-of-service` с медицинским дисклеймером, обновлен футер. Страница `/about` переработана для усиления E-E-A-T: внедрена динамическая загрузка экспертов через `ExpertsSection`, добавлена микроразметка `AboutPage` и `Person` JSON-LD, а раздел "Our Mission" расширен SEO-оптимизированным текстом с внутренней перелинковкой. [[frontend/seo]]
- 
## 2026-06-22
- Documented the production Strapi media fix: `PUBLIC_URL=https://api.fitway.best`, frontend `NEXT_PUBLIC_STRAPI_URL`, Nginx/Certbot setup for `api.fitway.best`, PM2 `--update-env`, and `next/image` `remotePatterns` for Strapi uploads. [[deploy/strapi-media-production]]

## 2026-06-22
- Разработана система премиальных профилей авторов для повышения сигналов E-E-A-T. Создана новая коллекция `Author` в Strapi v5, добавлены связи `author` (manyToOne) и `reviewedBy` (manyToMany) в коллекции `Post` и `Workout`. На фронтенде реализованы страницы `/authors` и `/authors/[slug]` с детальной биографией, сертификациями и списком публикаций. [[frontend/authors-system]]
- Обновлена JSON-LD микроразметка: на страницы блога и тренировок добавлена ссылка на профиль автора через схему `Person`. [[frontend/seo]]
- Устранена ошибка `TS2345` (Argument of type '"api::author.author"' is not assignable to parameter of type 'ContentType') при создании новой коллекции. Решение: использование команды `npx strapi ts:generate-types` перед сборкой `npm run build` для обновления `types/generated/contentTypes.d.ts`. [[bugs/strapi-type-errors]]
- Переведен блок экспертов на главной странице с хардкода на динамические данные из Strapi. Теперь каждый эксперт ссылается на свою страницу профиля. [[frontend/authors-system]]
- Унифицирован дизайн блоков автора в сайдбарах детальных страниц блога и тренировок. Создан переиспользуемый компонент `AuthorSidebarCard` для обеспечения визуального единства и улучшения UX. [[frontend/authors-system]]
- Расширена микроразметка `Person` на детальной странице автора: добавлены поля `award` (сертификаты) и улучшено описание через `fullBio`. [[frontend/seo]]

## 2026-06-19
- Проведен комплексный SEO-аудит главной страницы для устранения ошибки "Thin Content" (Google AdSense). Внедрена стратегия "Trust Funnel": добавлены глубокие текстовые описания методологии, раздел с сертификациями экспертов (NASM, RD, CSCS) и профессиональный медицинский дисклеймер. Обновлены мета-теги и внедрена микроразметка JSON-LD (Organization, WebSite, FAQPage) для улучшения Rich Snippets. [[frontend/seo]]
- Расширены SEO-оптимизации: добавлена микроразметка `SoftwareApplication` JSON-LD для фитнес-калькуляторов (BMI и Calories) на главной странице, обеспечивающая отображение Rich Snippets (расширенные результаты). Данная разметка дублирует логику со страницы `/tools`. [[frontend/seo]]
 
## 2026-06-18
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
