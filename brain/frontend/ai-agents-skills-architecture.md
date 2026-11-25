# AI Agents & Content Skills Architecture: E-E-A-T, Strapi 5 & Hub & Spoke Matrix

Документация по архитектуре специализированных AI-агентов и модульных навыков (Skills) проекта FitWay, правилам валидации E-E-A-T (авторы и медицинские рецензенты), защите от маркеров машинной генерации и матрице внутренней перелинковки.

---

## 🎯 Архитектурная модель: «Стратег» и «Навыки»

В проекте FitWay реализовано строгое разделение ответственности между ролью AI-агента и исполняемыми навыками:

```mermaid
flowchart TD
    subgraph AgentLayer["Уровень принятия решений (Стратег)"]
        Architect["seo-adsense-architect<br/>.agents/agents/seo-adsense-architect.md"]
    end

    subgraph DataLayer["Данные и База знаний"]
        Brain["brain/ (План AdSense, E-E-A-T, Баги)"]
        GSC["brain/data/gsc-latest.json (Клики, Показы, Позиции 10-30)"]
    end

    subgraph SkillsLayer["Уровень исполнения (Технологические карты)"]
        SkillBlog["fitway-blog-post-generator<br/>Генерация статей блога"]
        SkillWorkout["fitway-workout-generator<br/>Генерация тренировок"]
        SkillCat["fitway-category-seo<br/>Генерация хаб-категорий"]
    end

    subgraph QualityLayer["Контроль качества и Анти-AI фильтр"]
        SkillHumanizer["humanizer (.agents/skills/humanizer/)<br/>Ликвидация 26 маркеров AI"]
    end

    Architect <--> Brain
    Architect <--> GSC
    Architect -->|Использование и валидация| SkillsLayer
    SkillsLayer -->|Обязательная вычитка| QualityLayer
```

1. **Агент (`seo-adsense-architect`)**: Главный SEO-стратег и технический веб-архитектор. Владеет общей картиной, контролирует дорожную карту AdSense [[roadmap/adsense-approval-plan]], управляет CLI-клиентом [[frontend/gsc-api-integration]], блокирует преждевременную подачу заявки (правило **Traffic Gatekeeper**) и рецензирует контент.
2. **Навыки (`.agents/skills/`)**: Автономные спецификации, содержащие схемы Strapi, анти-AI правила, списки первоисточников и валидаторы.

---

## 🤖 1. Агент: `seo-adsense-architect`
- **Файл**: `.agents/agents/seo-adsense-architect.md`
- **Ключевой функционал**:
  - **Traffic Gatekeeper**: Контроль порога 15–30+ кликов в день перед подачей заявки в AdSense.
  - **GSC CLI Runner**: Вызов команды `python scripts/gsc_client.py` и инспекция URL.
  - **RPM Optimization**: Проектирование рекламных слотов с `min-h-[250px]` для защиты Core Web Vitals (CLS < 0.1).
  - **Next.js & Strapi Standards**: Соблюдение Service Layer pattern, чистоты каноникалов и разметки Schema.org.

### Engineering & Design Subagents (Added 2026-11-25)
- **`senior-backend-architect`** (`.agents/agents/senior-backend-architect.md`): Strapi v5.9.0 collections (`backend/src/api/`), Document Service API (`documentId`), API Token & Public permissions, pagination safety, Next.js Route Handlers (`/api/contact`, `/api/newsletter`), and `NODE_OPTIONS="--max-old-space-size=2048" npm run build` lifecycle. Pairs with `.agents/skills/strapi-v5-expert/SKILL.md`.
- **`senior-frontend-engineer`** (`.agents/agents/senior-frontend-engineer.md`): Next.js 14 App Router, TypeScript strictness, Service Layer (`frontend/src/services/*.service.ts`), ISR/SSG, Metadata Cascade & `Schema.org` `@graph`, hydration/Stretched Link integrity, and CWV optimization. Pairs with `.agents/skills/vercel-react-best-practices/SKILL.md`.
- **`senior-ux-ui-designer`** (`.agents/agents/senior-ux-ui-designer.md`): FitWay dark-mode design system (`#1B2B3B`, `#243447`, `#C25700` WCAG AA CTAs, `#D1D5DB` muted text), sequential heading order, Framer Motion vs Tailwind safety, mobile-first 320px+ layouts, zero-CLS containers, and GA4 dwell-time optimization. Pairs with `.agents/skills/frontend-design/SKILL.md`.

---

## 🛠️ 2. Модернизированный пул навыков FitWay

### 1. `fitway-blog-post-generator`
- **Назначение**: Создание глубоких (1200–1800 слов) статей в формате JSON для Strapi (`api::post.post`).
- **Ключевые регламенты**:
  - **Обязательная связь `reviewedBy`**: В соответствии со стандартами YMYL и дорожной картой AdSense каждая статья имеет автора и **парного медицинского/научного рецензента**:
    - Питание/добавки: автор Mike Chen (ID: 5) $\rightarrow$ рецензент Sarah Johnson (`[{ "id": 3 }]`, RD/диетолог).
    - Тренировки: автор Mike Chen (ID: 5) $\rightarrow$ рецензент Richard Botich (`[{ "id": 1 }]`, NASM-CPT).
  - **Мастер-реестр перелинковки (`references/internal-links.md`)**: Обязательное внедрение 1–2 ссылок на калькуляторы [[frontend/fitness-calculators-pseo]] и 1–2 ссылок на воркауты.
  - **Интеграция с GSC**: Шаг 1.6 сверяет тему с `brain/data/gsc-latest.json` и встраивает фразы из Low-Hanging Fruits (позиции 10–30) в H2 и FAQ.
  - **Верификация PubMed**: Минимум 3 прямые ссылки с валидацией реальных PMID через веб-поиск.

### 2. `fitway-workout-generator`
- **Назначение**: Создание программ тренировок для коллекции Strapi `workout` и компонентов `fitness.exercise`, `fitness.nutrition-tips`, `fitness.expert-tips`.
- **Ключевые регламенты**:
  - **Автоматический пуш в Strapi (Production Draft)**: Сохранение в `backend/scripts/workouts.json` и выполнение `node backend/scripts/push-workout.js backend/scripts/workouts.json --prod` со статусом `?status=draft` (`publishedAt: null`).
  - **Visual Content Suggestions**: Обязательная генерация точного промпта для Hero-изображения тренировки (1200×630, 16:9, editorial fitness photography).
  - **Устранение анонимности**: Обязательные relations `"author": { "id": 1 }` (Richard Botich) и `"reviewedBy": [{ "id": 5 }]` (Mike Chen).
  - **Реестр существующих воркаутов (`references/existing-workouts.md`)**: Защита от дублирования опубликованных программ (12 тренировок).
  - **Блок Expert Tips & Common Mistakes**: Обязательная генерация компонента `expertTips` с уникальными 3 советами и 3 ошибками по макро-стратегии сессии. См. [[frontend/workout-expert-tips]].
  - **Перелинковка в поле `text` (300–800 слов)**: Обязательные ссылки на калькулятор 1RM (`/tools/one-rep-max-calculator`) для силовых или калькулятор калорий (`/tools/calorie-calculator`) для кардио.

### 3. `fitway-category-seo`
- **Назначение**: Написание текстовых полей Strapi `category` (`title`, `intro`, `text`, `metaTitle`, `metaDescription`) для превращения страниц `/blog/category/{slug}` в хабы.
- **Инфраструктура (`references/`)**:
  - `category-map.md`: Полный маппинг 6 категорий (Nutrition, Muscle Building, Weight Loss, Training, Lifestyle, Motivation) с ключами, интентом и связками.
  - `style-rules.md`: Запрет клише AI (*delve into*, *game-changer*, *tapestry*), правила медицинской безопасности.
  - `output-schema.md`: Правило предотвращения дублирования бренда в `metaTitle` (Next.js добавляет `| FitWay` автоматически).
  - **Категорический запрет Em Dash (`—`)**: Исключение длинного тире во всех полях для защиты от алгоритмических AI-детекторов Google.

### 4. `humanizer` (Единый анти-AI фильтр качества)
- **Файл**: `.agents/skills/humanizer/SKILL.md`
- **Назначение**: Сквозная фильтрация и переработка всего генерируемого контента (статьи блога, тренировки, категории) для устранения 26 структурных и стилистических паттернов ИИ.
- **Ключевой функционал**:
  - Устранение риторических противопоставлений "Not X but Y" (§1) и искусственных драматических выводов ("That is the real win", "Consistency is key") (§2).
  - Ликвидация разогревов ("Let's dive in", "Here's what you need to know") (§4) и споров с фиктивным читателем (§5).
  - Разбивка навязчивых триад слов (§6) и устранение универсальных тире (em/en dash) (§8).
  - Тотальный блэклист 30+ маркеров машинного языка (`delve`, `crucial`, `pivotal`, `tapestry`, `landscape`, `testament`, `robust`, `underscore`, `meticulously`) (§12).
  - Замена размытых ссылок ("experts suggest") на конкретные цитаты PubMed с проверенными PMID или утверждения от первого лица сертифицированных авторов (§17).
  - Очистка списков от шаблонного bold-оформления каждого пункта (`- **Name:** desc`) (§19).
  - Обеспечение естественного живого тренерского и диетологического тона (E-E-A-T) для безупречного прохождения модерации Google AdSense.

---

## 🔗 Связанные документы
- [[frontend/gsc-api-integration]] — API-клиент Search Console и URL Inspection инструмент.
- [[frontend/gsc-crawled-not-indexed-resolution]] — Стратегия ликвидации статуса «Просканировано, но не проиндексировано».
- [[frontend/editorial-policy]] — Редакционная политика FitWay и регламент рецензирования.
- [[frontend/authors-system]] — Архитектура профилей сертифицированных экспертов.
- [[frontend/fitness-calculators-pseo]] — Архитектура Programmatic SEO фитнес-калькуляторов.
- [[roadmap/adsense-approval-plan]] — Пошаговый план прохождения модерации Google AdSense.

