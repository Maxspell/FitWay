# HTML Sitemap Architecture (`/sitemap`)

Этот документ описывает архитектуру, SEO-стратегию и UI-реализацию страницы HTML-карты сайта FitWay ([frontend/src/app/sitemap/page.tsx](file:///d:/Users/doomi/ReactProjects/FitWay/frontend/src/app/sitemap/page.tsx)), а также её синхронизацию с XML-картой ([frontend/src/app/sitemap.ts](file:///d:/Users/doomi/ReactProjects/FitWay/frontend/src/app/sitemap.ts)) и сквозной навигацией.

---

## 1. Назначение и SEO-цели
Для поисковых краулеров (Googlebot, Bingbot, Yandexbot) и пользователей HTML-карта сайта решает задачи:
1. **Crawling & Indexing**: Создание плоской структуры ссылок (Flat Link Architecture) с глубиной клика не более 2 (Homepage -> Sitemap -> любая статья/программа).
2. **Распределение Link Equity (PageRank)**: Передача ссылочного веса со сквозного футера на глубокие страницы блога, узкие категории и архивные программы тренировок.
3. **Обнаружение изолированных страниц (Orphan Pages)**: Гарантирует, что ни одна опубликованная статья или тренировка в Strapi CMS не останется без входящих внутренних ссылок.
4. **Контроль каноничности и дублей**: В карту попадают **только** канонические 200 OK страницы. Исключены страницы пагинации (`/blog/page/[page]`), поисковые формы, служебные API и технические параметры.
5. **E-E-A-T & Trust Signals**: Включение разделов авторов (`/authors`), редакционной политики (`/editorial-policy`) и юридических страниц (`/privacy-policy`, `/terms-of-service`) для модерации Google AdSense.

---

## 2. Архитектура и рендеринг (Next.js 14 App Router)

- **Тип компонента**: Асинхронный Server Component (`async function SitemapPage()`). Весь контент генерируется на сервере и отдается поисковым системам в готовом статическом/SSR HTML без необходимости выполнения JavaScript в браузере бота.
- **Стратегия кэширования (ISR)**:
  ```typescript
  export const revalidate = 3600; // 1 час фоновой ревалидации
  ```
  Используется ISR с ревалидацией в 1 час со встроенным Next.js `fetch({ next: { revalidate: 600 } })` в сервисном слое. При публикации новых статей или категорий в Strapi v5 страница обновляется в фоне без необходимости полного ребилда фронтенда.
- **Сервисный слой (`Service Layer Pattern`)**:
  Вся загрузка данных инкапсулирована в `src/services/` согласно [[frontend/data-fetching-pattern]]:
  - `getAllPostsSummary()` — оптимизированный метод в [post.service.ts](file:///d:/Users/doomi/ReactProjects/FitWay/frontend/src/services/post.service.ts) с выборкой минимального набора полей (`title`, `slug`, `updatedAt`, `publishedAt`, `category`).
  - `getCategories()` — список всех рубрик блога.
  - `getWorkouts()` — программы тренировок с уровнями сложности и длительностью.
  - `getAuthors()` — сертифицированные эксперты и рецензенты.
  Все вызовы выполняются параллельно через `Promise.all`:
  ```typescript
  const [categories, posts, workouts, authors] = await Promise.all([
    getCategories(),
    getAllPostsSummary(),
    getWorkouts(),
    getAuthors(),
  ]);
  ```

---

## 3. SEO-метаданные и Structured Data

### Метаданные страницы
В `generateMetadata` / статическом объекте `metadata` заданы строгие параметры:
- `title`: `"HTML Sitemap | FitWay Architecture & Navigation"`
- `description`: детальное описание структуры для сниппета в поисковой выдаче.
- `alternates.canonical`: `"https://fitway.best/sitemap"` (явный абсолютный URL для исключения ошибок наследования [[bugs/canonical-tag-inheritance]]).
- `robots`: `{ index: true, follow: true }`.
- `openGraph`: полное зеркало для предпросмотра в социальных сетях.

### Schema.org Structured Data
Страница снабжена разметкой JSON-LD `@graph`:
- `WebPage` с каноническим URL `https://fitway.best/sitemap`, привязанным к `WebSite`.
- `SiteNavigationElement` для явного указания поисковикам на навигационный характер страницы.

---

## 4. Группировка и структура блоков

Страница скомпонована по 6 логическим разделам с якорной панелью быстрого перехода:
1. **Core Website Sections (Основные разделы)**: Главная (`/`), Библиотека тренировок (`/workouts`), Блог (`/blog`), Каталог категорий (`/blog/category`), Калькуляторы (`/tools`), Авторы (`/authors`), О нас (`/about`), Контакты (`/contact`).
2. **Blog Categories & Topic Clusters (Рубрики блога)**: Индивидуальные ссылки на тематические хабы (`/blog/category/[slug]`).
3. **All Published Articles (Все опубликованные статьи блога)**: Сгруппированы по категориям в отдельные карточки. Для каждой статьи выводятся H1-заголовок, дата публикации и чистый путь `/blog/[slug]`.
4. **Workout Programs & Routines (Библиотека тренировок)**: Каталог тренировок с бейджами сложности (`Beginner`, `Intermediate`, `Advanced`) и таймингом.
5. **Authors & Medical Reviewers (Авторы и медицинские рецензенты)**: Профили экспертов с указанием их регалий (`jobTitle`, `credentials`) для E-E-A-T валидации.
6. **Legal, Trust & Policies (Правовые и трастовые документы)**: Редакционная политика (`/editorial-policy`), Политика конфиденциальности (`/privacy-policy`), Пользовательское соглашение (`/terms-of-service`).
7. **XML Sitemap Bot Link**: Блок со ссылкой на машиночитаемый файл `/sitemap.xml` для поисковых ботов.

---

## 5. UI и Дизайн-система (FitWay Premium Style)

Верстка разработана по правилам [[skills/frontend-design]] и дизайн-системы FitWay:
- **Цветовая палитра**: Фоновый темный тон `#1B2B3B`, карточки `#243447`/60 с легким `backdrop-blur`, фирменный оранжевый акцент `#FF8C00`, вторичные акценты: изумрудный, лазурный, пурпурный и янтарный.
- **Интерактивная якорная лента (Quick-Jump Ribbon)**: Навигационный бейдж с быстрыми ссылками `#main-sections`, `#blog-categories`, `#blog-articles`, `#workouts`, `#authors`, `#legal-trust`.
- **Информационный дашборд (Quick Metrics Bar)**: 4 счетчика (Total Indexed URLs, Articles, Programs, Taxonomies) с подсчетом реального числа проиндексированных сущностей.
- **Семантика HTML**: `<h1>` для шапки, `<h2>` для основных разделов, `<h3>` для подкатегорий, семантические списки `<ul>` и `<li>`, а также теги `<Link>` (рендеринг в чистые `<a href="...">` с полными понятными анкорами).

---

## 6. Интеграция в экосистему сайта

1. **Сквозной Footer ([Footer.tsx](file:///d:/Users/doomi/ReactProjects/FitWay/frontend/src/components/Footer.tsx))**:
   Ссылка `Sitemap` добавлена в колонку `Quick Links` под `Contact`. Это обеспечивает сквозную индексацию карты со всех страниц проекта.
2. **XML Sitemap ([sitemap.ts](file:///d:/Users/doomi/ReactProjects/FitWay/frontend/src/app/sitemap.ts))**:
   URL `https://fitway.best/sitemap` добавлен в массив `staticPages` с частотой обновления `daily` и приоритетом `0.7`. Также добавлены `/privacy-policy` и `/terms-of-service`.
3. **Robots.txt ([robots.ts](file:///d:/Users/doomi/ReactProjects/FitWay/frontend/src/app/robots.ts))**:
   Убедились, что маршрут `/sitemap` открыт для индексации (`Allow: /`), а `sitemap.xml` корректно объявлен.

---

## Связанные документы базы знаний
- [[frontend/seo]] — Комплексная SEO-стратегия FitWay, E-E-A-T и канонические теги.
- [[frontend/data-fetching-pattern]] — Паттерн инкапсуляции запросов в сервисный слой.
- [[frontend/blog-category-hub]] — Премиальный хаб категорий блога (`/blog/category`).
- [[frontend/editorial-policy]] — Редакционная политика и стандарты рецензирования.
- [[frontend/authors-system]] — Архитектура профилей авторов и экспертов.
- [[bugs/canonical-tag-inheritance]] — Предотвращение ошибок наследования canonical-тегов.
