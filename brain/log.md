# Knowledge Base Activity Log
## 2026-09-11
- Устранение ошибок доступности Lighthouse / axe-core (Color Contrast & Heading Order).
    - **Color Contrast (WCAG 1.4.3 AA)**: Исправлена проблема недостаточной контрастности белого текста на оранжевом фоне `#FF8C00` (было 2.33:1). Фон кнопок и активных переключателей переведен на `#C25700` (контраст 4.51:1) и hover `#A34600` (6.12:1) в компонентах `HeroContent.tsx`, `CalculatorPreview.tsx` и `CalorieCalculator.tsx`. [[frontend/accessibility-wcag-fixes]]
    - **Heading Order (WCAG 1.3.1)**: Восстановлена строгая иерархия заголовков. В `TestimonialCard.tsx` тег `<h4>` (Sarah Jenkins и др.) заменен на `<h3>` под секционным `<h2>`, исключая пропуск уровней. В калькуляторах `BmiCalculator.tsx` и `CalorieCalculator.tsx` несемантические теги `<h4>` числовых значений заменены на `<div>`. [[frontend/accessibility-wcag-fixes]] [[frontend/seo]]
- Оптимизация доставки изображений первого экрана (Improve image delivery) и локализация внешних ассетов.
    - **Image Localization & WebP**: Устранена зависимость от внешних доменов `images.unsplash.com` и `i.pravatar.cc`. Изображения сохранены локально в `frontend/public/images/hero-fitness.webp` и `public/images/avatars/user-[1-4].webp`.
    - **LCP & FCP Improvements**: Для главного hero-изображения в `HeroVisuals.tsx` задан точный атрибут `sizes="(max-width: 1024px) 300px, 380px"`. В `HeroContent.tsx` обычные теги `<img>` заменены на Next.js `<Image>` с точными габаритами `40x40`. Экономия трафика составила 50+ KiB без сторонних DNS-запросов. [[frontend/image-delivery-optimization]] [[frontend/performance-third-party-scripts]]
- Оптимизация производительности Lighthouse (Core Web Vitals) и временное отключение AdSense.
    - **Lighthouse Warnings**: Анализ отчетов "Reduce unused JavaScript" (272 KiB) и "Minimize main-thread work" (2.5 s). Установлено, что свыше 80% нагрузки на основной поток (1354 ms Script Evaluation + 363 ms Script Parsing) вызваны внешними скриптами AdSense (`adsbygoogle.js`, `show_ads_impl_fy2021.js`) и FundingChoices.
    - **AdSense Toggle**: Временно деактивирован тег `<Script>` AdSense в `layout.tsx` на период тестирования производительности перед финальной отправкой сайта на верификацию. [[frontend/performance-third-party-scripts]] [[frontend/seo]]

## 2026-09-07
- Реализована адаптивная мобильная вёрстка для главной страницы, страниц блога и футера.
    - **Mobile Grid Alignment**: Устранён эффект сплющивания контента из-за жестких классов `grid-cols-3` и `grid-cols-4`. Внедрена mobile-first сетка: на мобильных устройствах элементы выстраиваются в один столбец и растягиваются на 100% ширины девайса. [[frontend/responsive-layout]]
    - **Home & Footer**: В компоненте `LatestPosts` установлена сетка `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` и адаптивный header; в `Footer` установлена сетка `grid-cols-1 md:grid-cols-2 lg:grid-cols-4`. [[frontend/responsive-layout]]
    - **Blog & About Pages**: Синхронизированы сетки статей и категорий в `/blog`, `/blog/category/[slug]`, `RelatedArticles` и `/about`. [[frontend/responsive-layout]]
- Локализован и устранён баг сбоя SSG-сборки Next.js и ошибки `404 Not Found` на статические файлы стилей и чанков (`.css`, `.js`) на продакшене.
    - **Root Cause**: При выполнении `npm run build` во время деплоя сборка падала на этапе генерации `/blog` из-за необработанного `fetch` к Strapi (`TypeError: fetch failed (ECONNREFUSED)`) и аварийного вызова `notFound()`. В результате старая статика стиралась, новая не дособиралась, а PM2 отдавал закэшированный HTML с несуществующими хэшами файлов. [[bugs/nextjs-prerender-fetch-failed]]
    - **Fix**: Все функции загрузки данных в `blog/page.tsx`, `blog/[slug]/page.tsx` и `blog/category/[slug]/page.tsx` обёрнуты в безопасные `try...catch` с fallback-массивами, а `notFound()` на странице `/blog` заменён на дружелюбный пустой экран. [[bugs/nextjs-prerender-fetch-failed]] [[frontend/data-fetching-pattern]]

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
