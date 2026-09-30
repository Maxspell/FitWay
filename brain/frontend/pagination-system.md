# Pagination Architecture & SEO Design System

Архитектура пагинации каталогов (блог и воркауты) в Next.js 14 App Router, интеграция со Strapi v5 CMS, соблюдение SEO-стандартов каноникализации и UI в стиле дизайн-системы FitWay.

## 1. Концепция и требования
1. **Каталоги по 9 карточек**: По умолчанию выводится ровно 9 сущностей на страницу:
   - **Блог (`/blog`)**: Первая карточка — большая featured на всю ширину (`w-full md:w-1/2 flex-col md:flex-row`), последующие карточки — в две колонки (`grid grid-cols-1 md:grid-cols-2 gap-8`) с оригинальными кнопками `btn-primary` ("Read More"). На страницах 2+ все 9 карточек выводятся в 2 колонки.
   - **Библиотека тренировок (`/workouts`)**: Карточки выводятся адаптивной сеткой по 9 штук с сохранением фильтра категорий (`category=weight-loss` и т.д.).
2. **SEO-чистые URL**:
   - Страница 1: `/blog` и `/workouts` (без суффикса `/page/1`).
   - Страница 2+: `/blog/page/2`, `/blog/page/3`, `/workouts/page/2`.
   - Защита от дублей: если запрошен `/blog/page/1` или `/workouts/page/1`, выполняется перманентный редирект на чистый корневой URL.
   - Корректные `canonical` ссылки на каждой странице пагинации (`alternates: { canonical: pageNum === 1 ? '/blog' : '/blog/page/' + pageNum }`).

## 2. Архитектура файлов и Service Layer
Следуя принципу [[frontend/data-fetching-pattern]], запросы к Strapi v5 инкапсулированы в сервисы, а разметка разделена на Server Pages и презентационные компоненты:

- `src/services/post.service.ts`:
  - `getPaginatedBlogPosts(page = 1, pageSize = 9)`: Запрашивает статьи через Strapi v5 Pagination API (`pagination[page]`, `pagination[pageSize]`, сортировка `createdAt:desc`) и возвращает объект `{ posts, pagination: { page, pageSize, pageCount, total } }`.
- `src/services/workout.service.ts`:
  - `getPaginatedWorkouts(page = 1, pageSize = 9, category?: string)`: Запрашивает тренировки с учетом активного фильтра категории `filters[category][$eq]` и возвращает объект `{ workouts, pagination }`.
- `src/components/common/Pagination.tsx`:
  - Универсальный компонент навигации по страницам, выполненный в дизайн-системе FitWay.
- `src/components/BlogPost/BlogView.tsx`:
  - Презентационный компонент каталога блога (featured post, 2-колоночная сетка, кнопки `btn-primary`, блок категорий, SEO-описание и микроразметка).
- `src/components/workouts/WorkoutView.tsx`:
  - Презентационный компонент каталога тренировок (сетка воркаутов, фильтрация, карточки с метаданными и микроразметка).

## 3. Дизайн-система компонента Pagination (`Pagination.tsx`)
Размещается **сразу после сетки с карточками**:
- **Контейнер**: `bg-[#243447]/60 border border-white/10 backdrop-blur-md rounded-2xl` с мягкой тенью и адаптивным расположением (`flex-col sm:flex-row`).
- **Активная страница**: Оранжевый акцент `#FF8C00` со свечением `shadow-[0_0_15px_rgba(255,140,0,0.4)]` и легким зумом (`scale-105`).
- **Неактивные страницы**: Полупрозрачные плитки `bg-white/5 border border-white/10 hover:border-[#FF8C00]/50 hover:bg-[#FF8C00]/10 hover:text-[#FF8C00]`.
- **Эллипсисы (`•••`)**: Автоматическое сжатие при большом числе страниц (например, `1 ... 4 5 6 ... 12`).
- **Previous / Next**: Кнопки со стрелками `ChevronLeft` и `ChevronRight`, микроанимацией сдвига и защитой от клика на границах диапазона (`aria-disabled="true"`).
- **Сохранение Query-параметров**: Пропс `queryParams` позволяет передавать активные фильтры (`?category=muscle-gain`), сохраняя их при пагинации по страницам.

## 4. Маршрутизация App Router
1. **Главная блога**: `src/app/blog/page.tsx`
2. **Пагинированный блог**: `src/app/blog/page/[page]/page.tsx`
3. **Главная воркаутов**: `src/app/workouts/page.tsx`
4. **Пагинированные воркауты**: `src/app/workouts/page/[page]/page.tsx`

## 5. SEO-Оптимизация пагинированных страниц (Best Practices)
1. **Каноникализация (Self-Referential Canonical)**:
   - Страницы пагинации (`/workouts/page/2`, `/blog/page/2`) имеют собственный самореферентный каноникал.
   - **Антипаттерн**: Установка canonical со второй страницы на первую (`/workouts`) строго не рекомендуется Google, так как контент страниц отличается. Это привело бы к выпадению глубоких карточек из индекса.
2. **Предотвращение дублирования Title шаблоном RootLayout**:
   - В корневом `layout.tsx` задан `title.template: "%s | FitWay"`.
   - В `generateMetadata` страниц пагинации передается чистый заголовок `title: "Workout Library - Page 2"` без ручного суффикса ` | FitWay`. Это исключает появление дублей в сниппетах вида `Workout Library - Page 2 | FitWay | FitWay`.
3. **Иерархия заголовков (H1 -> H2 -> H3)**:
   - В листинге `WorkoutView` добавлен полноценный заголовок **`<h2>Science-Backed Training Programs for Every Goal</h2>`** перед описательной секцией.
   - Это устраняет ошибку SEO-аудиторов ("0 H2 headings on page"), замыкая корректное дерево документа: `H1` (Workout Library) -> `H2` (Educational Section) -> `H3` (Workout Titles) -> `H4` (Category tags).
4. **Хлебные крошки (Breadcrumbs)**:
   - Автоматическое объединение паттерна `/page/:number` в `Page :number` исключает технические 404/битые промежуточные ссылки.

**Связанные документы:**
- [[frontend/breadcrumbs]] — Глобальные хлебные крошки и логика схлопывания пагинации.
- [[frontend/data-fetching-pattern]] — Сервисный паттерн выборки данных в Next.js.
- [[frontend/blog-ui]] — Компоненты оформления карточек блога.
- [[frontend/workouts-ui]] — Дизайн карточек и организация каталога тренировок.
- [[frontend/seo]] — Стратегия SEO и канонические ссылки.
- [[bugs/canonical-tag-inheritance]] — Предотвращение наследования дефолтного canonical.
