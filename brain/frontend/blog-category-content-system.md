# Blog Category Content & SEO System

## Обзор
Категории блога (`/blog/category/[slug]`) переведены из простого списка статей в полноценные SEO-лендинги с возможностью кастомизации контента и метатегов через Strapi v5 CMS.

## 1. Схема контент-типа Strapi v5 (Category)
В `backend/src/api/category/content-types/category/schema.json` добавлены поля контента и поисковой оптимизации:
- `title` (`string`): Кастомный заголовок H1 для страницы категории.
- `intro` (`text`): Краткий вводный лид/параграф под заголовком H1.
- `text` (`richtext`): Развернутый SEO-текст/статья внизу страницы под каталогом постов (с поддержкой Markdown и GFM).
- `metaTitle` (`string`): Пользовательский SEO Meta Title.
- `metaDescription` (`text`): Пользовательский SEO Meta Description.

Пример обновленного фрагмента схемы:
```json
{
  "attributes": {
    "name": { "type": "string", "required": true },
    "slug": { "type": "string", "required": true, "unique": true },
    "title": { "type": "string" },
    "intro": { "type": "text" },
    "text": { "type": "richtext" },
    "metaTitle": { "type": "string" },
    "metaDescription": { "type": "text" },
    "posts": {
      "type": "relation",
      "relation": "oneToMany",
      "target": "api::post.post",
      "mappedBy": "category"
    }
  }
}
```

## 2. Типизация во Frontend (Next.js)
В `frontend/src/interfaces/blog.ts` интерфейс `Category` расширен новыми опциональными полями:
```typescript
export interface Category {
  id: number;
  name: string;
  slug: string;
  title?: string;
  intro?: string;
  text?: string;
  metaTitle?: string;
  metaDescription?: string;
}
```

## 3. Логика Fallback & Устранение дублирования Title Template
В `frontend/src/app/blog/category/[slug]/page.tsx`:

### Проблема дублирования `| FitWay | FitWay`
В корневом `layout.tsx` задан глобальный шаблон заголовков:
```typescript
title: {
  default: "AI Fitness Plans & Science-Backed Workouts | FitWay",
  template: "%s | FitWay",
}
```
Ранее `generateMetadata` категории возвращал:
```typescript
title: `${category.name} Articles | FitWay`
```
Next.js подставлял эту строку в `%s`, формируя в `<title>`:
`Weight Loss Articles | FitWay | FitWay`

### Реализованное решение
1. Из возвращаемого `title` удален жесткий суффикс `| FitWay`.
2. Добавлена проверка: если заполнено поле `metaTitle`, берется оно; иначе формируется дефолт `${category.name} Articles`.
3. Для описания: если заполнено `metaDescription`, берется оно; иначе fallback: `Explore the latest articles in ${category.name} to elevate your fitness and health journey.`.

```typescript
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const category = await getCategoryBySlug(params.slug);
  if (!category) {
    return { title: "Category Not Found" };
  }

  const title = category.metaTitle?.trim()
    ? category.metaTitle.trim()
    : `${category.name} Articles`;

  const description = category.metaDescription?.trim()
    ? category.metaDescription.trim()
    : `Explore the latest articles in ${category.name} to elevate your fitness and health journey.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/blog/category/${params.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `/blog/category/${params.slug}`,
      type: "website",
    },
  };
}
```

## 4. Рендеринг UI страницы категории
- **H1 Заголовок**: отображает `category.title`, если заполнено; если пусто — `${category.name} Articles`.
- **Intro (лид)**: рендерится стилизованным абзацем (`text-lg md:text-xl text-gray-300`) по центру под H1 при наличии значения.
- **Сетка статей**: адаптивная сетка карточек блога `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` с hover-эффектами `hover:ring-[#FF8C00]`.
- **Нижний SEO-блок (`text`)**: при наличии текста выводится в стилизованной карточке с Markdown (`ReactMarkdown` + `remark-gfm` + `prose prose-invert prose-orange`).

## Связанные страницы
- [[backend/strapi-v5-collections]] — Управление схемами и правами API Tokens в Strapi v5.
- [[bugs/canonical-tag-inheritance]] — Самореферентные canonical-теги для категорий блога.
- [[frontend/seo]] — Комплексная SEO-стратегия и борьба с Thin Content.
- [[frontend/blog-ui]] — Общая архитектура и стили карточек блога.
- [[deploy/cicd-vps-pipeline]] — CI/CD пайплайн сборки бэкенда и фронтенда на VPS.
