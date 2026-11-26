# Responsive Layout & Mobile Grids

## Концепция и правила адаптивности

В мобильной версии сайта ключевые блоки (карточки постов, колонки футера, списки категорий) должны следовать правилу **Mobile-First**:
- На экранах смартфонов элементы должны занимать **100% ширины контейнера** (`w-full`) и располагаться друг под другом в один столбец.
- Никогда не использовать жестко заданные классы сеток без адаптивных префиксов: `grid-cols-2`, `grid-cols-3`, `grid-cols-4` без префикса мобильного представления приводят к сильному сплющиванию элементов на ширине 320–420px.

## Реализованные исправления

### 1. Секция «Latest from Our Blog» (`LatestPosts.tsx`)
- **Было:** `grid grid-cols-3 gap-8`
- **Стало:** `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8`
- **Шапка секции:** Заголовок и ссылка «View All Posts» переведены на `flex flex-col sm:flex-row sm:justify-between sm:items-center items-start gap-4 mb-8`, исключая наложение и перенос слов на смартфонах.
- **Обложки карточек:** Адаптивная высота `h-48 sm:h-52 w-full` с сохранением пропорций (`object-cover`).

### 2. Главный футер (`Footer.tsx`)
- **Было:** `grid grid-cols-4 gap-8`
- **Стало:** `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8`
- Все 4 колонки (О проекте, Быстрые ссылки / Документы, Контакты, Социальные сети) на мобильных устройствах теперь комфортно распределяются по вертикали.
- Удалён некорректный класс `col-span-4` у разделителя дисклеймера.

### 3. Страницы блога и «О нас»
- `src/app/blog/page.tsx`:
  - **Featured Post (Первый пост)**: Переведён с жесткого `flex gap-8` и `w-1/2` на адаптивный `flex flex-col md:flex-row gap-6 md:gap-8` с `w-full md:w-1/2`. Высота обложки адаптирована (`h-56 sm:h-72 md:h-[400px]`), метатеги переведены в `flex-wrap` с `shrink-0` у иконок, заголовок масштабируется (`text-xl sm:text-2xl md:text-3xl`).
  - **Структура страницы**: Вводная секция с описанием ("Unlock Your Potential with FitWay Insights") перемещена в самый низ страницы под блок категорий с адаптивными паддингами `p-6 sm:p-8 mt-12`, чтобы пользователи на смартфонах сразу видели свежий контент блога.
  - Сетка недавних статей `grid-cols-1 md:grid-cols-2 gap-8`, категории `grid-cols-2 sm:grid-cols-4 gap-4`.
- `src/app/blog/[slug]/page.tsx`:
  - **Hero-блок статьи**: Устранено сплющивание и фиксированная высота `h-[500px]`. Внедрена адаптивная высота `h-72 sm:h-96 md:h-[500px]`, паддинги `p-4 sm:p-6 md:p-8`, перенос метатегов через `flex-wrap gap-2 sm:gap-4` и адаптивный шрифт заголовка `text-2xl sm:text-3xl md:text-4xl leading-tight`.
  - **Сетка контента и сайдбара**: Заменен жесткий `grid-cols-12` на `flex flex-col lg:grid lg:grid-cols-12 gap-8` (статья занимает `w-full lg:col-span-8`, сайдбар `w-full lg:col-span-4`). Класс `sticky top-24` переведён на `lg:sticky lg:top-24` для десктопа.
- `src/app/blog/category/[slug]/page.tsx`: Сетка постов категории `grid-cols-1 md:grid-cols-2 gap-8`.
- `src/components/BlogPost/RelatedArticles.tsx`: Сетка похожих статей переведена на 3 колонки `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8`. См. [[frontend/related-articles]].
- `src/app/about/page.tsx`: Сетка ключевых ценностей `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8`.

### 4. Вертикальные отступы секций и выравнивание заголовков на мобильных
- **Проблема:** Десктопные отступы `py-24` или `py-32` создавали избыточные пустоты на экранах мобильных устройств, а заголовки с левым выравниванием смотрелись несогласованно с центрированными блоками вроде FAQ.
- **Стандарт вертикальных отступов секций:**
  Использовать адаптивные классы `py-12 md:py-24 lg:py-32` во всех ключевых секциях (`WhyFitWay`, `StepsSection`, `FeaturedWorkouts`, `ExpertsSection`, `TestimonialsSection`, `NewsletterSection`).
- **Homepage Hero Section (`Hero.tsx`, `HeroContent.tsx`):**
  - Because `Header.tsx` uses `sticky top-0` (`72px` / `4.5rem` in-flow height), `Hero.tsx` must use `pt-8 pb-16 md:pt-12 md:pb-20 lg:py-12 lg:min-h-[calc(100vh-4.5rem)]` instead of `min-h-[900px] lg:min-h-screen pt-20 lg:pt-0`.
  - This eliminates the excessive `80px` mobile gap, guarantees at least `48px` clearance below the sticky header on short desktop/MacBook Pro viewports (`1440x740–785`, `1280x720`), and keeps `hero.bottom` aligned with the fold at `1440x900`.
  - `HeroContent.tsx` vertical spacing (`space-y-6 lg:space-y-7`, `pt-1 lg:pt-2` on CTA buttons, `pt-2 lg:pt-4` on trust indicators) keeps intrinsic content height around `~690px` on `lg+`.
- **Workout Detail Page (`workouts/[slug]/page.tsx`, `WorkoutHero.tsx`, `WorkoutMetadata.tsx`, `ExerciseList.tsx`, `ExerciseCard.tsx`, `ReviewSystem.tsx`, `Footer.tsx`):**
  - Never combine fixed viewport heights (`h-[70vh]`) with `flex items-end` and `overflow-hidden` on `WorkoutHero` without explicit top clearance (`pt-20 sm:pt-24`) for the root-level absolute `Breadcrumbs` overlay (`~52px` zone). Use content-driven `min-h-[460px] sm:min-h-[520px] lg:min-h-[560px]` and fluid `<h1>` scaling (`text-2xl sm:text-4xl md:text-5xl xl:text-6xl leading-[1.12] max-w-5xl break-words`). See [[frontend/breadcrumbs]].
  - Do not wrap an entire multi-widget sidebar taller than `100vh` inside `sticky top-24`; keep upper cards in normal flow and apply `lg:sticky lg:top-24` only to the final CTA widget (`FitnessToolsSidebarWidget`). Never put `h-full` on stacked cards inside a CSS Grid `<aside>` (`AuthorSidebarCard` must use `className="card"`, not `card h-full`), because CSS Grid stretches `<aside>` to the row height and `h-full` forces lower siblings out of `<aside>` over `<footer>` on both desktop and mobile.
  - Never combine Tailwind horizontal centering (`left-1/2 -translate-x-1/2`) directly on a Framer Motion `<motion.div>` that animates `y` or `scale`, as Framer Motion's inline `transform` overrides `-translate-x-1/2`. Place centering on a static wrapper (`fixed ... inset-x-0 flex justify-center pointer-events-none`).
  - Inside `lg:col-span-2` main columns (`1024px` viewport), avoid 4-column card grids (`WorkoutMetadata`: use `grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4`) and side-by-side split forms (`ReviewSystem`: use `xl:flex-row`) that squeeze inner columns below ~220px.
  - On `ExerciseCard`, add `shrink-0` to fixed circular badges, stack Pro Tips / Avoid (`grid-cols-1 sm:grid-cols-2`) on mobile, and prevent action button wrapping (`flex-col sm:flex-row ... shrink-0 whitespace-nowrap`).
  - `Footer.tsx` uses `sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5` with `break-words` so tablet/small-desktop layouts do not leave orphan rows or clip email addresses.
- **Стандарт шапок секций:**
  На мобильных экранах заголовок, бейдж и подзаголовок центрируются, а на десктопе возвращаются к левому краю (либо остаются по центру, если это предусмотрено стилем блока):
  `text-center md:text-left mx-auto md:mx-0`.

## Стандарт классов для списков карточек

| Тип контента | Мобильный (<768px) | Планшет (>=768px) | Десктоп (>=1024px) | Итоговый класс Tailwind |
| :--- | :--- | :--- | :--- | :--- |
| Статьи блога (3 в ряд) | 1 колонка | 2 колонки | 3 колонки | `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` |
| Футер (4 колонки) | 1 колонка | 2 колонки | 4 колонки | `grid-cols-1 md:grid-cols-2 lg:grid-cols-4` |
| Статьи каталога (2 в ряд) | 1 колонка | 2 колонки | 2 колонки | `grid-cols-1 md:grid-cols-2` |
| Бейджи / Категории | 2 колонки | 4 колонки | 4 колонки | `grid-cols-2 sm:grid-cols-4` |
| Секции лендинга (отступы) | py-12 | py-24 | py-32 | `py-12 md:py-24 lg:py-32` |

## Связи

- [[frontend/workouts-ui]] — архитектура каталога тренировок, дизайн карточек WorkoutCard и адаптивная сетка категорий.
- [[frontend/blog-ui]] — эволюция компонентов блога и карточек.
- [[frontend/related-articles]] — логика подбора похожих публикаций по категории и 3-колоночная сетка.
- [[frontend/mobile-menu]] — мобильная навигация сайта.
- [[bugs/framer-motion-animation-flicker]] — изоляция анимации карточек от CSS hover-переходов.
- [[bugs/nextjs-prerender-fetch-failed]] — исправление сборки страниц блога после адаптации вёрстки.

