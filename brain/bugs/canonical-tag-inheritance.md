# Google Indexing & Canonical Inheritance in Next.js

## Описание проблемы

В Google Search Console страницы категорий блога (`/blog/category/weight-loss`, `/blog/category/motivation` и др.) исключались из индекса с формулировкой:
> **Индексирование страниц > Вариант страницы с тегом canonical** (*Alternate page with proper canonical tag*)

При этом страницы категорий являются самостоятельными посадочными страницами со списком статей по теме, на них установлен тег `robots: INDEX, FOLLOW`, и они должны полноценно участвовать в поисковой выдаче.

## Причина (Root Cause)

1. **Глобальное наследование метаданных в Next.js App Router**:
   В корневом файле `src/app/layout.tsx` был задан глобальный тег канонического адреса:
   ```typescript
   export const metadata: Metadata = {
     // ...
     alternates: {
       canonical: "https://fitway.best",
     },
   };
   ```
2. **Отсутствие локального `canonical` на страницах категорий**:
   В файле динамической страницы категории `src/app/blog/category/[slug]/page.tsx` функция `generateMetadata` возвращала только `title` и `description`:
   ```typescript
   export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
     const category = await getCategoryBySlug(params.slug);
     if (!category) {
       return { title: "Category Not Found" };
     }
     return {
       title: `${category.name} Articles | FitWay`,
       description: `Explore the latest articles in ${category.name} to elevate your fitness and health journey.`,
     };
   }
   ```
3. Из-за правил слияния метаданных Next.js (Metadata Cascade) при отсутствии поля `alternates` на уровне вложенного маршрута оно автоматически унаследовалось из родительского `layout.tsx`. В итоговом HTML страницы `/blog/category/weight-loss` выводился тег:
   ```html
   <link rel="canonical" href="https://fitway.best/" />
   ```
4. Робот Google строго следовал этой директиве, считая страницу категории лишь дублем главной страницы (`https://fitway.best/`), и отказывался её индексировать.
5. **Отсутствие в Sitemap**: Категории блога из Strapi не генерировались в `sitemap.ts`, что дополнительно снижало приоритет их обхода поисковыми роботами.

## Решение

### 1. Явный самореферентный Canonical & OpenGraph в Category Page
В `src/app/blog/category/[slug]/page.tsx` добавлено явное определение `alternates.canonical` и метаданных `openGraph`:

```typescript
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const category = await getCategoryBySlug(params.slug);
  if (!category) {
    return { title: "Category Not Found" };
  }
  return {
    title: `${category.name} Articles | FitWay`,
    description: `Explore the latest articles in ${category.name} to elevate your fitness and health journey.`,
    alternates: {
      canonical: `/blog/category/${params.slug}`,
    },
    openGraph: {
      title: `${category.name} Articles | FitWay`,
      description: `Explore the latest articles in ${category.name} to elevate your fitness and health journey.`,
      url: `/blog/category/${params.slug}`,
      type: "website",
    },
  };
}
```

Благодаря настройке `metadataBase` в корневом `layout.tsx`, относительный путь `/blog/category/${params.slug}` корректно преобразуется в абсолютный URL `https://fitway.best/blog/category/[slug]`.

### 2. Добавление категорий в динамический Sitemap
В файле `src/app/sitemap.ts` добавлен блок динамической выборки категорий из Strapi API (`/api/categories`):

```typescript
// 5. Dynamic Categories from Strapi
let categoryEntries: MetadataRoute.Sitemap = [];
try {
  const response = await fetch(`${strapiUrl}/api/categories?fields[0]=slug&fields[1]=updatedAt`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${apiToken}`,
      'Content-Type': 'application/json',
    },
    next: { revalidate: 3600 },
  });
  
  if (response.ok) {
    const result = await response.json();
    if (result.data && Array.isArray(result.data)) {
      categoryEntries = result.data.map((category: any) => ({
        url: `${BASE_URL}/blog/category/${category.slug}`,
        lastModified: category.updatedAt ? new Date(category.updatedAt) : new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      }));
    }
  }
} catch (error) {
  console.error('Error generating dynamic sitemap for categories:', error);
}

return [...staticPages, ...blogEntries, ...workoutEntries, ...authorEntries, ...categoryEntries];
```

## Шаги валидации в Google Search Console
1. Задеплоить изменения на прод.
2. Проверить HTML любой категории через DevTools/SEO-плагин: тег `<link rel="canonical">` должен указывать на текущий URL категории.
3. В Google Search Console ввести URL категории в строку проверки URL (*URL Inspection*).
4. Нажать **Request Indexing** (Запросить индексирование).
5. В отчете покрытия нажать **Validate Fix** (Проверить исправление).

## Связанные страницы базы знаний
- [[frontend/seo]] — Общая SEO-стратегия, структура разметки и индексация.
- [[frontend/responsive-layout]] — Адаптивная верстка категорий блога.
- [[bugs/build-errors]] — Возможные ошибки сборки и метаданных в App Router.
