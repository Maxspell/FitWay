# Blog Categories Hub & Directory (`/blog/category`)

## Обзор
Страница `/blog/category` является корневым хабом и каталогом всех категорий блога FitWay. Ранее обращение к данному URL отдавало ошибку 404 (Not Found). В рамках сессии маршрут был спроектирован и реализован как преміальний навигационный хаб знаний (**Curated Knowledge Hub**) с динамической загрузкой данных из Strapi v5, микроразметкой Schema.org и адаптивной версткой.

Также была исправлена верстка на страницах конкретных категорий (`/blog/category/[slug]`): устранен искусственный лимит ширины `max-w-7xl`, сетка карточек развернута на полную ширину контейнера и выровнена высота карточек.

---

## 1. Исправление верстки на странице `/blog/category/[slug]`
На детальной странице категории карточки были зажаты классом `max-w-7xl` внутри контейнера, что создавало визуальный диссонанс с полноширинными блоками Header, Breadcrumbs и каталогом статей на главной странице блога.

### Внесенные изменения в `src/app/blog/category/[slug]/page.tsx`:
1. **Удаление `max-w-7xl`**:
   - Было: `<div className="container mx-auto px-4 max-w-7xl">`
   - Стало: `<div className="container mx-auto px-4">`
   - Результат: сетка карточек располагается на всю ширину стандартного контейнера сайта.
2. **Равная высота карточек и привязка кнопки к низу**:
   - К карточке добавлены классы `flex flex-col justify-between`.
   - Контентная часть (картинка, метаданные, заголовок, excerpt) вынесена в отдельный верхний блок `<div>`, а кнопка `<span className="btn-primary inline-block w-fit">Read More</span>` зафиксирована внизу. Карточки в одном ряду теперь имеют идеально ровную высоту независимо от длины анонса.

---

## 2. Архитектура и дизайн страницы `/blog/category`

Файл: `frontend/src/app/blog/category/page.tsx`

### Ключевые возможности:
- **Динамическая выборка из Strapi**: использует сервис `getCategories()` (`frontend/src/services/post.service.ts`) с ISR-кэшированием (`revalidate: 600`).
- **Тематическое распознавание категорий (`getCategoryDesign`)**: функция анализирует `slug` и `name` категории и автоматически назначает:
  - Релевантную иконку из `lucide-react` (`Apple` для Nutrition, `Dumbbell` для Workouts/Training, `Flame` для Weight Loss/Cardio, `HeartPulse` для Recovery/Health, `Brain` для Mindset/Habits, `Sparkles` по умолчанию).
  - Специфический фоновый радиальный градиент (`from-emerald-500/20`, `from-[#FF8C00]/20`, `from-rose-500/20` и т.д.).
  - Hover-свечение иконки (`group-hover:shadow-[0_0_30px_...]`).
  - Фоллбэк-описание, если в Strapi не заданы `intro` или `metaDescription`.

### Дизайн-система (/frontend-design):
1. **Hero-блок**:
   - Верхний бейдж `Curated Knowledge Hub` с пульсирующей иконкой `Compass` в стиле glassmorphism (`bg-white/5 border border-white/10 backdrop-blur-md`).
   - Акцентный заголовок с `gradient-text`: `Explore by Topic & Category`.
   - Трастовые маркеры внизу hero: *Evidence-based Content*, *Peer-Reviewed Studies*, счетчик доступных тематик.
2. **Атмосферный фон**:
   - Фоновые блуры `-z-10 pointer-events-none`: верхний оранжевый ореол `#FF8C00/10` и мягкая синяя подсветка `blue-600/5`, создающие визуальную глубину в темной теме `#1B2B3B`.
3. **Карточки категорий**:
   - Мягкий hover с подъемом: `hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-black/50`.
   - Иконка в собственном контейнере с эффектом зума (`group-hover:scale-110`).
   - Бейдж `CATEGORY` в правом верхнем углу.
   - Нижняя плашка с интерактивной стрелкой `ArrowRight`, смещающейся вправо при наведении (`group-hover:translate-x-0.5`).
4. **Нижний CTA-баннер**:
   - Карточка с градиентом от `#243447` через `#1F2E3E` с быстрыми ссылками на общий хронологический блог (`/blog`) и каталог тренировок (`/workouts`).

---

## 3. SEO & Structured Data

### Метаданные:
```typescript
export const metadata: Metadata = {
  title: "Blog Categories | Explore Fitness, Nutrition & Health Guides",
  description: "Browse all FitWay fitness, workout, nutrition, and wellness article categories. Discover expert advice, scientific training routines, and healthy living insights.",
  alternates: {
    canonical: "/blog/category",
  },
  openGraph: {
    title: "Blog Categories | FitWay",
    description: "Browse all FitWay fitness, workout, nutrition, and wellness article categories.",
    url: "https://fitway.best/blog/category",
    type: "website",
  },
};
```

### Schema.org Микроразметка:
В страницу встроен JSON-LD со схемами `CollectionPage` и `ItemList`, перечисляющий все категории со ссылками `https://fitway.best/blog/category/${cat.slug}`, что улучшает краулинг сайта роботами Google и LLM-агентами.

### Sitemap:
Маршрут добавлен в массив статических страниц `sitemap.ts`:
```typescript
{
  url: `${BASE_URL}/blog/category`,
  lastModified: new Date(),
  changeFrequency: 'weekly',
  priority: 0.8,
}
```

---

## Связанные страницы
- [[frontend/blog-category-content-system]] — SEO-система и схема контент-типа Category в Strapi v5.
- [[frontend/responsive-layout]] — Адаптивные сетки карточек блога и каталогов.
- [[frontend/blog-ui]] — Компоненты карточек статей блога и дизайн-система.
- [[bugs/canonical-tag-inheritance]] — Настройка самореферентных canonical-тегов для категорий.
- [[roadmap/adsense-approval-plan]] — Стратегия устранения 404 ошибок и повышение ценности контента для модерации Google AdSense.
