# Related Articles System (Category Matching & Layout)

## Overview
Документация по реализации и логике подбора похожих публикаций в блоке «Related Articles» на детальной странице блога (`/blog/[slug]`).

## Архитектура и логика выборки

### 1. Фильтрация по категории поста
Для релевантности рекомендаций и улучшения пользовательского опыта (UX) и внутренних поведенческих SEO-метрик (глубина просмотра, dwell time) статьи в блоке похожих материалов подбираются строго из той же категории, что и просматриваемый пост.

В функции `getRelatedBlogPosts(slug: string, categorySlug?: string)` в `src/app/blog/[slug]/page.tsx`:
- Основной фильтр Strapi API v5:
  ```http
  GET /api/posts?populate[0]=image&populate[1]=author.photo&populate[2]=reviewedBy.photo&populate[3]=category&filters[slug][$ne]=${slug}&sort=createdAt:desc&pagination[limit]=3&filters[category][slug][$eq]=${categorySlug}
  ```
- Исключение текущего поста: `filters[slug][$ne]=${slug}` гарантирует, что открытая статья никогда не будет рекомендовать саму себя.

### 2. Защитный Fallback (Graceful Degradation)
Если в базе данных по текущей категории меньше 3 статей (или категория у поста не назначена):
- Запускается резервный запрос на получение свежих статей из блога (`filters[slug][$ne]=${slug}&sort=createdAt:desc&pagination[limit]=3`).
- С помощью `Set` исключаются дубликаты, и массив дополняется до 3 статей.
- Это предотвращает появление пустого пространства или недоукомплектованных сеток.

### 3. Лимит и Адаптивная Сетка (UI)
- **Лимит**: Количество выводимых статей увеличено с 2 до **3**.
- **Сетка в `RelatedArticles.tsx`**:
  - Мобильные: `grid-cols-1` (1 карточка на всю ширину).
  - Планшеты: `md:grid-cols-2` (2 колонки).
  - Десктопы: `lg:grid-cols-3` (3 колонки в один ряд).
- Компонент не рендерится вовсе, если массив статей пуст:
  ```tsx
  if (!relatedPosts || relatedPosts.length === 0) return null;
  ```

## Затронутые файлы
- `src/app/blog/[slug]/page.tsx` — вызов `getRelatedBlogPosts(params.slug, post.category?.slug)` и логика выборки с fallback.
- `src/components/BlogPost/RelatedArticles.tsx` — сетка `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8` и защитный возврат `null`.

## Связанные документы
- [[frontend/blog-ui]] — Компоненты карточек блога, AuthorBox и мобильная вёрстка.
- [[frontend/responsive-layout]] — Mobile-first адаптивные сетки для карточек блога и секций.
- [[frontend/blog-date-sorting-metadata]] — Синхронизация дат, сортировки (`sort=createdAt:desc`) и связанных полей.
- [[frontend/data-fetching-pattern]] — Паттерн выборки данных в Next.js App Router.
- [[frontend/seo]] — Внутренняя перелинковка и семантическая релевантность категорий.
