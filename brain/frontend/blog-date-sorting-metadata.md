# Blog Date, Sorting & Metadata Synchronization

## Overview
Документация по стандартизации отображения дат, сортировки статей блога и вывода метаданных автора/категории во фронтенд-компонентах FitWay.

## Key Decisions & Architecture

### 1. Unified Creation Date (`createdAt`) across Blog Surfaces
Ранее на детальной странице статьи (`/blog/[slug]`) в hero-блоке использовалось поле `publishedAt`. В Strapi при каждом обновлении или повторной публикации статьи значение `publishedAt` менялось, что дезориентировало пользователей.
- **Decision**: Все поверхности блога (общий список `/blog`, детальный hero `/blog/[slug]`, карточки недавних постов `LatestPosts`, карточки похожих статей `RelatedArticle`) переведены на использование **`createdAt`** (даты создания статьи).
- **Format**: Единый формат даты для всех компонентов:
  ```tsx
  new Date(post.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
  ```

### 2. Creation Date Sorting (`sort=createdAt:desc`)
- В `src/services/post.service.ts` (запрос для главной страницы) и в `src/app/blog/page.tsx` сортировка статей жестко закреплена как `sort=createdAt:desc`. Первыми всегда отдаются статьи, созданные последними.
- В запросе похожих статей `getRelatedBlogPosts` в `/blog/[slug]/page.tsx` также добавлена сортировка `sort=createdAt:desc`.

### 3. Population of Relational Fields in Strapi Queries
В Strapi v5 связанные сущности (`author`, `category`) не возвращаются по умолчанию, если они явно не запрошены в параметре `populate`. Это приводило к отображению пустых иконок в карточках.
- **Author Population**:
  - `src/services/post.service.ts`: изменён запрос с `populate=image` на `populate[0]=image&populate[1]=author`.
  - `src/app/blog/page.tsx`: добавлен `populate[2]=author`.
- **Category Population**:
  - В `getRelatedBlogPosts` (`/blog/[slug]/page.tsx`) добавлен `populate[3]=category`.
- **Defensive UI Rendering**:
  - В `LatestPosts.tsx` и `RelatedArticle.tsx` рендеринг имени автора и категории обернут в проверки `{post.author?.name && (...)}` и `{post.category?.name && (...)}`, что предотвращает появление «висячих» иконок Lucide React при отсутствии данных.

## Components & Files Affected
- `src/app/blog/[slug]/page.tsx`: замена `post.publishedAt` на `post.createdAt` в Hero-секции; добавление `populate[3]=category` и `sort=createdAt:desc` в `getRelatedBlogPosts`.
- `src/services/post.service.ts`: сортировка `sort=createdAt:desc` и `populate[1]=author`.
- `src/components/sections/blog/LatestPosts.tsx`: вывод автора, унификация даты на `createdAt` и форматирование даты `toLocaleDateString("en-US", ...)`.
- `src/components/BlogPost/RelatedArticle.tsx`: добавление иконок `Calendar` и `Tag`, вывод `post.createdAt` и категории `post.category.name`.
- `src/app/blog/page.tsx`: добавление `populate[2]=author` в запрос статей блога.

## Related Documents
- [[frontend/blog-ui]] — Компоненты карточек блога, AuthorBox и мобильная верстка.
- [[frontend/data-fetching-pattern]] — Паттерн сервисов и серверных компонентов Next.js.
- [[frontend/authors-system]] — E-E-A-T архитектура профилей авторов.
- [[backend/strapi-v5-collections]] — Работа с коллекциями и запросами Strapi v5.
