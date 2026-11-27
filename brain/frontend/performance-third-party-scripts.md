# Lighthouse Performance & Third-Party Scripts Optimization

## Контекст и проблема
При аудите производительности (Lighthouse / PageSpeed Insights) были выявлены критические предупреждения:
1. **Reduce unused JavaScript** (экономия до ~272 KiB):
   - Загрузка сторонних тяжелых скриптов Google AdSense:
     - `pagead2.googlesyndication.com/.../show_ads_impl_fy2021.js` (~163 KiB, ~114 KiB unused)
     - `pagead2.googlesyndication.com/.../adsbygoogle.js` (~56 KiB, ~30 KiB unused)
   - Сопутствующий Google FundingChoices (согласие на куки/персонализацию) (~70 KiB)
   - Google Tag Manager / Analytics (`gtag/js`) (~167 KiB)
2. **Minimize main-thread work** (~2.5 s):
   - **Script Evaluation**: 1,354 ms
   - **Script Parsing & Compilation**: 363 ms
   - Основная нагрузка на главный поток браузера создавалась рекламным движком AdSense (аукционы, парсинг скрипта, инжекция рекламных iframe).

Собственный клиентский JS приложения FitWay весит всего ~41.6 KiB (общие бандлы ~84 kB First Load JS), что является отличным результатом для Next.js App Router.

---

## Решение: Временное отключение AdSense перед верификацией

До отправки сайта на проверку и для получения высоких показателей Core Web Vitals и баллов в Lighthouse скрипт AdSense был временно деактивирован.

### Изменения в коде:
В файле `frontend/src/app/layout.tsx`:
- Скрипт `<Script src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js..."/>` закомментирован:
```tsx
{/* Google AdSense (Temporarily disabled for Lighthouse performance / verification) */}
{/* {process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID && (
  <Script
    src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}`}
    crossOrigin="anonymous"
    strategy="afterInteractive"
  />
)} */}
```

---

## Инструкция по повторному включению (перед отправкой на модерацию)
Когда аудит производительности завершен и сайт готов к подаче заявки в Google AdSense:
1. Открыть `frontend/src/app/layout.tsx`.
2. Раскомментировать блок загрузки скрипта `<Script ... adsbygoogle.js ... />`.
3. Убедиться, что в переменных окружения на сервере (`.env.production` / PM2) задан `NEXT_PUBLIC_ADSENSE_CLIENT_ID` (например, `ca-pub-8295879566072893`).
4. Проверить наличие мета-тега аккаунта в `layout.tsx` (`other: { "google-adsense-account": ... }`).
5. Выполнить сборку `npm run build` и перезапуск PM2.

---

## Deferred GA4 Loading, Preconnect & Critical-Path LCP Optimization

1. **Deferred GA4 (`frontend/src/app/layout.tsx`)**: Replaced eager `@next/third-parties/google` (`afterInteractive`) with `next/script` `strategy="lazyOnload"` for `gtag/js` and inline `gtag('config', ...)`, preventing GA4 (~183 KiB) from competing with mobile FCP/LCP and main-thread hydration. Added `<link rel="preconnect" href="https://api.fitway.best" crossOrigin="anonymous" />`, `dns-prefetch` hints for `api.fitway.best` and `www.googletagmanager.com`, and `display: "swap"` on `Inter`.
2. **Above-the-Fold Hero SSR Visibility (`HeroContent.tsx`, `HeroVisuals.tsx`, `Hero.tsx`)**: Removed `initial="hidden"` / `initial={{ opacity: 0, scale: 0.8 }}` on the critical Hero text container and LCP image (`hero-fitness.webp`, `quality={70}`), and hid the heavy `feTurbulence` SVG noise filter on mobile (`hidden md:block`) so FCP and LCP render immediately without waiting for Framer Motion hydration or 0.8s entrance delays.
3. **Code-Splitting Below-the-Fold Homepage Sections (`frontend/src/app/page.tsx`)**: Converted below-the-fold client sections (including `TestimonialsSection` with `Swiper`, `CalculatorPreview`, `FeaturedWorkouts`, `LatestPosts`, `FAQSection`, `NewsletterSection`, `StepsSection`, `WhyFitWay`, `ExpertsSection`) to `next/dynamic` imports while preserving SSR HTML (`ssr: true` default) for zero CLS and full SEO crawlability.
4. **Workouts LCP & Blog Author Accessible Name (`WorkoutCard.tsx`, `WorkoutView.tsx`, `BlogPostCard.tsx`)**: Added `priority` prop (`index === 0` on `/workouts` page 1) for immediate visibility and `fetchPriority="high"`, and separated the `authorName` `<Link>` from `<time>` in `BlogPostCard.tsx` to satisfy WCAG 2.5.3 `label-content-name-mismatch`.
5. **Global `framer-motion` Removal from Navigation & Cards (`Navbar.tsx`, `MobileMenu.tsx`, `WorkoutCard.tsx`, `next.config.mjs`)**: Replaced `framer-motion` in `Navbar.tsx`, `MobileMenu.tsx`, and `WorkoutCard.tsx` with pure CSS transitions (`transition-[opacity,transform,visibility]`, CSS grid-rows accordion) and RSC card rendering — eliminating `framer-motion` (~110 KiB) from `/blog`, `/workouts`, and `/tools/*`, stabilizing `/workouts` CLS to `0`, and enabling `avif`/`webp` + `minimumCacheTTL: 2592000` in `next.config.mjs`.

---

## Ссылки на связанные документы
- [[frontend/image-delivery-optimization]] — Оптимизация доставки изображений первого экрана, локализация WebP и размеры аватаров.
- [[frontend/seo]] — Комплексный SEO-аудит и подготовка страниц под требования Google AdSense (E-E-A-T, Thin Content mitigation).
- [[bugs/nextjs-prerender-fetch-failed]] — Ошибки сборки и обработка SSG данных.
- [[index]] — Главный индекс базы знаний FitWay.
