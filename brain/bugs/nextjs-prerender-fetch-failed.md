# Next.js SSG Prerender Failure & 404 on Static Assets

## Описание проблемы

На продакшене (`https://fitway.best`) страницы открываются без стилей или с поломанной версткой. В консоли браузера возникают ошибки загрузки ресурсов:
```text
GET https://fitway.best/_next/static/css/55ffffe8548084ee.css net::ERR_ABORTED 404 (Not Found)
GET https://fitway.best/_next/static/chunks/webpack-0fa961e2748dc03e.js net::ERR_ABORTED 404 (Not Found)
GET https://fitway.best/_next/static/chunks/app/layout-634d83b886ec0d4c.js net::ERR_ABORTED 404 (Not Found)
```

## Причина

Ошибка вызвана цепочкой событий при деплое:

1. **Необработанный `fetch` во время статической генерации (SSG):**
   При выполнении `npm run build` в Next.js App Router происходит предварительный рендеринг статических страниц (например, `/blog`, `/blog/[slug]`).
   Если функция загрузки данных (обращение к Strapi API) не обёрнута в блок `try...catch`, то при недоступности бэкенда (например, Strapi оффлайн, перезапускается или сетевой сбой) `fetch` падает с ошибкой:
   ```text
   TypeError: fetch failed
       [cause]: AggregateError [ECONNREFUSED]
   Error occurred prerendering page "/blog". Read more: https://nextjs.org/docs/messages/prerender-error
   ```
   Кроме того, вызов `notFound()` на верхнеуровневой странице списка `/blog` при отсутствии данных приводит к сбою генерации маршрута.

2. **Рассинхронизация сборки и статики на сервере:**
   В пайплайне деплоя ([[.github/workflows/deploy.yml]]):
   - Next.js в начале билда очищает или частично перезаписывает директорию `.next/static/`.
   - Из-за падения `npm run build` сборка завершается с кодом 1 и процесс прерывается.
   - Команда `pm2 restart fitway-frontend` не выполняется.
   - Сервер (Nginx / Next.js Data Cache) продолжает отдавать закэшированный HTML со старыми хэшами чанков (`55ffffe8548084ee.css`), однако в файловой системе этих файлов уже нет или они повреждены. Браузер получает 404 на все CSS и JS бандлы.

## Решение

### 1. Безопасная загрузка данных в Server Components с `try...catch` и Fallback

Все функции обращения к API в статических и серверных компонентах обязаны перехватывать ошибки и возвращать безопасный fallback (пустой массив или `null`), а не ронять процесс сборки.

Пример в `src/app/blog/page.tsx`:
```tsx
async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
    const response = await fetch(`${API_URL}/api/posts?...`, {
      headers: {
        "Authorization": `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
      },
      next: { revalidate: 600 },
    });
    if (!response.ok) return [];
    const result = await response.json();
    return result.data ? result.data : [];
  } catch (error) {
    console.error("Error fetching blog posts on blog page:", error);
    return [];
  }
}
```

### 2. Избегать `notFound()` для корневых страниц каталогов

Вместо вызова `notFound()` при пустом списке статей рендерить корректный fallback UI:
```tsx
if (!postsData || postsData.length === 0) {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4 text-center py-20">
        <h1 className="section-title">Latest Health & Fitness Articles</h1>
        <p className="text-gray-400 text-xl mt-6">No articles published yet. Check back soon!</p>
      </div>
    </div>
  );
}
```

### 3. Защита динамических маршрутов

В `src/app/blog/[slug]/page.tsx` и `src/app/blog/category/[slug]/page.tsx` все методы `getBlogPostBySlug`, `getRelatedBlogPosts`, `getCategoryBySlug`, `getPostsByCategory` также обёрнуты в `try...catch`.

## Связи

- [[deploy/nextjs-build-failure]] — сбои сборки и манифестов при деплое.
- [[bugs/build-errors]] — известные ошибки сборки Next.js и Strapi.
- [[frontend/data-fetching-pattern]] — архитектурный паттерн выборки данных через сервисы.
