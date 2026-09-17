# Social Sharing & Interactive Anchors (Blog & Workouts)

Реализация системы шеринга контента в социальных сетях (X / Twitter, Facebook, Web Share API, буфер обмена) с премиальным glassmorphism дизайном, корректными абсолютными OpenGraph/Twitter Card мета-тегами и плавными якорными переходами.

---

## 📌 Архитектура компонента `ShareButtons`

Компонент расположен в `frontend/src/components/BlogPost/ShareButtons.tsx` и является универсальным клиентским компонентом (`"use client"`).

### Поддерживаемые каналы и функции:
1. **X (ранее Twitter)**:
   - Открытие всплывающего окна `https://twitter.com/intent/tweet` с предзаполненным `text` и `url`.
2. **Facebook**:
   - Открытие всплывающего окна `https://www.facebook.com/sharer/sharer.php?u=...`.
3. **Copy Link (Буфер обмена)**:
   - Интерактивное копирование URL через `navigator.clipboard.writeText` с fallback на скрытый `textarea` для старых браузеров.
   - Анимированная обратная связь: смена иконки на `Check`, изменение текста на «Copied!» и цвета рамки/фона на изумрудный (`#00E676`) на 2.5 секунды.
4. **Web Share API**:
   - На мобильных устройствах при поддержке `navigator.share` отображается дополнительная кнопка вызова нативного системного меню отправки.

### Стилизация и дизайн:
- Тёмный стеклянный градиент: `bg-gradient-to-r from-[#1B2B3B]/90 via-[#243447]/80 to-[#1B2B3B]/90` с `backdrop-blur-md` и тонкой окантовкой `border-white/10`.
- Декоративные фоновые световые пятна (Ambient glow) оранжевого и голубого оттенков.
- Плавные hover-микроанимации: поворот иконки копирования, легкое масштабирование (`scale-105`), мягкие тени.
- Настраиваемые заголовки через пропсы `subtitle` и `heading`.
- Поддержка `id` и плавной прокрутки с отступом `scroll-mt-28` для якорных ссылок.

---

## 🛠️ Исправление генерации карточек Twitter / OpenGraph

### Проблема с превью в Twitter (X Card)
При шеринге ссылки в Twitter не подтягивалось изображение (в отчете писалось `No IMAGE_SRC has been found`), несмотря на наличие `twitter:card = summary_large_image`.

**Причины:**
1. Краулер Twitterbot строго требует **полный абсолютный URL с протоколом HTTPS**.
2. В `image.ts` дефолтный fallback-домен для Strapi был настроен на `http://localhost:1337`, из-за чего при пустом или относительном `NEXT_PUBLIC_STRAPI_URL` в мета-тегах формировался некорректный адрес или локальный протокол.

### Внесенные исправления:
1. **[`frontend/src/utils/image.ts`](file:///d:/Users/doomi/ReactProjects/FitWay/frontend/src/utils/image.ts)** и **[`frontend/src/lib/utils.ts`](file:///d:/Users/doomi/ReactProjects/FitWay/frontend/src/lib/utils.ts)**:
   - Fallback-домен Strapi переведён на защищенный продакшен-хост:
     ```typescript
     const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "https://api.fitway.best";
     return `${strapiUrl}${url.startsWith("/") ? "" : "/"}${url}`;
     ```
2. **Валидация в `generateMetadata`**:
   - В `/blog/[slug]/page.tsx` и `/workouts/[slug]/page.tsx` добавлена проверка, чтобы `imageUrl` всегда содержал абсолютный URL (`https://fitway.best` или `https://api.fitway.best`).
   - Для OpenGraph добавлены точные параметры: `secureUrl`, размеры `1200x630` и `alt`.

> [!TIP]
> Twitterbot жестко кэширует предпросмотры ссылок. Для проверки обновленных мета-тегов используйте query-параметр версии: `https://fitway.best/blog/slug?v=2`.

---

## 🎯 Интерактивные якоря в детальных тренировках (`/workouts/[slug]`)

В компоненте шапки тренировки (`frontend/src/components/workouts/WorkoutHero.tsx`):
- Кнопка **START WORKOUT** переведена на интерактивную ссылку с якорем `href="#first-exercise"`, который скроллит к первому упражнению в списке `ExerciseList.tsx`.
- Кнопка **SHARE** переведена на якорь `href="#share-section"`, плавно прокручивающий страницу к блоку социальных кнопок.
- Неиспользуемая кнопка **SAVE** и иконка `Heart` удалены.
- В `globals.css` добавлено глобальное правило плавной прокрутки:
  ```css
  html {
    scroll-behavior: smooth;
  }
  ```
- Для целевых элементов задан класс `scroll-mt-28`, предотвращающий перекрытие контента плавающей шапкой сайта при прокрутке.

---

## 🔗 Связанные страницы базы знаний
- [[frontend/blog-ui]] — Общая архитектура страниц и компонентов блога.
- [[frontend/seo]] — Метаданные, OpenGraph и поисковая оптимизация.
- [[deploy/strapi-media-production]] — Доставка медиа-файлов и домен `api.fitway.best`.
- [[roadmap/adsense-approval-plan]] — Комплексный план повышения качества и сигналов вовлеченности сайта.
