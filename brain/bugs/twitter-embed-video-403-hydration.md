# Twitter (X) Video Embed: 403 Forbidden CDN Fix & React Hydration Errors (#418, #423)

Решение критических проблем со встраиванием медиаконтента Twitter/X в статьях блога: блокировка потокового видео со статусом `403 Forbidden` (`video.twimg.com`) и ошибки гидратации React (`Minified React error #418` и `#423`).

---

## 📌 Описание проблемы

При встраивании публикации из Twitter/X с видео в статьях блога (`/blog/[slug]`):
1. **Видео не воспроизводилось**: плеер отображался, но при клике на кнопку Play в консоли появлялась ошибка:
   ```text
   video.twimg.com/amplify_video/.../vid/avc1/480x852/....mp4?tag=14:1 Failed to load resource: the server responded with a status of 403 ()
   ```
2. **Ошибки гидратации React**: консоль браузера заполнялась предупреждениями:
   ```text
   Uncaught Error: Minified React error #418
   Uncaught Error: Minified React error #423
   ```

---

## 🔍 Технический анализ и первопричины

### 1. Почему `video.twimg.com` возвращал `403 Forbidden`
Ранее использовалась библиотека `react-tweet`, которая напрямую запрашивала JSON твита и рендерила нативный HTML5 тег `<video>`:
```html
<video poster="...">
  <source src="https://video.twimg.com/amplify_video/....mp4" type="video/mp4" />
</video>
```
* CDN-серверы Twitter/X (`video.twimg.com` за Cloudflare) внедрили строгую защиту от хотлинкинга (anti-hotlinking/referrer policy check).
* Когда браузер отправляет запрос к видео с внешнего сайта, он передает заголовок:
  ```http
  Referer: https://fitway.best/
  ```
  При обнаружении стороннего `Referer` Cloudflare мгновенно отклоняет запрос со статусом `403 Forbidden`.
* Прямой запрос без заголовка `Referer` (или с `Referer: https://twitter.com`) успешно возвращает `200 OK`.
* Это задокументированный глобальный дефект библиотеки `react-tweet` ([Issue #212](https://github.com/vercel/react-tweet/issues/212)), который невозможно решить на стороне чистого `<video>` без проксирования или перехода на официальный изолированный виджет.

### 2. Причина ошибок гидратации React #418 и #423
* В разметке Markdown (Strapi CMS) ссылка на твит находилась внутри обычного текстового абзаца:
  ```markdown
  Текст статьи...
  https://x.com/username/status/1234567890
  ```
* Парсер `react-markdown` оборачивал этот блок в тег абзаца `<p>`.
* Кастомный обработчик ссылок `a: ({ href }) => ...` заменял твиттер-ссылку на компонент `<TweetEmbed />`, рендерящий корневые блочные элементы `<div>`.
* **Спецификация HTML и React**: размещение тегов `<div>` внутри `<p>` является грубым нарушением спецификации HTML. Браузер при первичном парсинге DOM принудительно «выталкивает» `<div>` наружу из `<p>`, закрывая абзац досрочно.
* При сравнении серверного HTML (где тег `<p>` еще не закрыт) и клиентского DOM (где браузер перестроил дерево) React падал с ошибками несовпадения гидратации **#418** и **#423**.

---

## 🛠️ Реализованное решение

### 1. Переход на официальный Twitter Embedded Widget (`widgets.js`)
В компоненте [`frontend/src/components/BlogPost/TweetEmbed.tsx`](file:///d:/Users/doomi/ReactProjects/FitWay/frontend/src/components/BlogPost/TweetEmbed.tsx):
- Удалена зависимость от кастомного плеера `react-tweet`.
- Реализована динамическая асинхронная загрузка официального скрипта `https://platform.twitter.com/widgets.js`.
- Инициализация твита выполняется через официальный API `window.twttr.widgets.createTweet(id, element, options)`.
- Виджет рендерит официальный изолированный iframe от Twitter, в котором видеопоток авторизуется контекстом самого Twitter без ошибки `403 Forbidden`.
- Настроена тёмная тема (`theme: "dark"`), адаптивное центрирование, параметр конфиденциальности `dnt: true` (Do Not Track) и визуальный оранжевый спиннер загрузки.

```tsx
"use client";

import React, { useEffect, useRef, useState } from "react";

interface TweetEmbedProps {
  id: string;
}

export default function TweetEmbed({ id }: TweetEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadTwitterScript = (): Promise<void> => {
      return new Promise((resolve) => {
        if (window.twttr?.widgets?.createTweet) {
          resolve();
          return;
        }

        const existingScript = document.getElementById("twitter-wjs") as HTMLScriptElement | null;
        if (existingScript) {
          existingScript.addEventListener("load", () => resolve());
          return;
        }

        const script = document.createElement("script");
        script.id = "twitter-wjs";
        script.src = "https://platform.twitter.com/widgets.js";
        script.async = true;
        script.onload = () => resolve();
        document.body.appendChild(script);
      });
    };

    loadTwitterScript().then(() => {
      if (!isMounted || !containerRef.current || !window.twttr?.widgets) return;

      containerRef.current.innerHTML = "";
      window.twttr.widgets
        .createTweet(id, containerRef.current, {
          theme: "dark",
          align: "center",
          conversation: "none",
          dnt: true,
        })
        .finally(() => {
          if (isMounted) setIsLoading(false);
        });
    });

    return () => {
      isMounted = false;
    };
  }, [id]);

  return (
    <span className="my-6 block not-prose w-full">
      <span className="flex flex-col items-center justify-center min-h-[160px] w-full">
        {isLoading && (
          <span className="flex items-center justify-center p-6 text-sm text-gray-400">
            <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-orange-500 border-t-transparent mr-2" />
            Loading post from X...
          </span>
        )}
        <span ref={containerRef} className="w-full flex justify-center" />
      </span>
    </span>
  );
}
```

### 2. Исправление HTML-валидности и гидратации в `page.tsx`
В файле [`frontend/src/app/blog/[slug]/page.tsx`](file:///d:/Users/doomi/ReactProjects/FitWay/frontend/src/app/blog/%5Bslug%5D/page.tsx):
- Добавлен кастомный рендерер тега `p` для `ReactMarkdown`:
  ```tsx
  p: ({ node, children, ...props }) => {
    return <div className="mb-4 text-gray-300 leading-relaxed" {...props}>{children}</div>;
  },
  ```
- Замена внешнего тега `<p>` на `<div>` полностью устраняет невалидное вложение блочных структур.
- Корневые элементы `TweetEmbed` оформлены семантическими тегами `<span>` с `display: block` для максимальной защиты от несовпадений разметки.

---

## 📊 Результат валидации

1. **Воспроизведение видео**: видеоролики из Twitter/X воспроизводятся без ошибок `403` во всех браузерах благодаря официальному фрейму Twitter.
2. **Консоль браузера**: ошибки гидратации #418 и #423 полностью устранены.
3. **Сборка Next.js**: `npm run build` успешно компилирует статические и динамические страницы без конфликтов типов и синтаксиса.

---

## 🔗 Связанные материалы
- [[frontend/social-share-and-anchors]] — Социальный шеринг контента (X/Twitter, Facebook, Web Share API).
- [[bugs/hydration-errors]] — Ошибки гидратации React в Next.js App Router и правила вложенности тегов.
- [[frontend/markdown-tables-gfm]] — Обработка разметки статей через `react-markdown`.
- [[frontend/seo]] — Оптимизация блога и авторитетные внешние источники.
