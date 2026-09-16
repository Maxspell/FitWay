# Editorial Policy & Peer-Review Verification (E-E-A-T)

## Overview
Для прохождения модерации в рекламных сетях (Google AdSense) и соответствия рекомендациям Google Search Quality Evaluator Guidelines (особенно для YMYL — Your Money or Your Life) контент по фитнесу, снижению веса и питанию обязан проходить прозрачный процесс рецензирования и фактчекинга.

Статус отказа **«Бесполезный контент / Low value content»** напрямую связан с отсутствием видимых доказательств авторства, перекрёстной экспертной проверки (Peer Review) и регламентированной редакционной политики.

---

## 1. Редакционные стандарты (`/editorial-policy`)

### Страница и структура
Создана специализированная страница `frontend/src/app/editorial-policy/page.tsx`:
- **Evidence-Based Research**: Закреплен стандарт цитирования доказательной медицины и спортивной физиологии (PubMed, ISSN, NIH, ACSM). Отказ от экстремальных диет и опасных для суставов техник.
- **The 4-Step Verification Workflow**:
  1. *Literature & Scientific Sourcing*: Отбор клинических исследований и мета-анализов.
  2. *Drafting by Qualified Specialists*: Написание статьи сертифицированным тренером или спортивным диетологом.
  3. *Technical & Editorial Peer Review*: Проверка дозировок, формул дефицита/профицита и техники движений вторым профильным специалистом.
  4. *Publication & Regular Maintenance*: Публикация с указанием автора, рецензента, даты релиза и последнего пересмотра.
- **Meet the Reviewers**: Презентация ведущих специалистов (Richard Botich, Sarah Johnson, Mike Chen) с их академическими и тренерскими регалиями (CSCS, NASM-CPT, RD, ISSN) и ссылкой на каталог [[frontend/authors-system]].
- **Corrections Policy & Medical Notice**: Четкий регламент внесения исправлений, контактный email (`info@fitway.best`) и расширенный медицинский дисклеймер со ссылкой на `Terms of Service`.
- **Schema.org Structured Data**: Внедрена разметка `WebPage` с указанием издателя `Organization` (FitWay).

---

## 2. Архитектура перекрёстной проверки (Peer Review)

### Проблема саморецензирования
Назначение одного и того же эксперта одновременно автором статьи и рецензентом (*"Written by Richard Botich" + "Reviewed by Richard Botich"*) является грубой ошибкой E-E-A-T и воспринимается асессорами Google как манипулятивная имитация проверки.

### Решение: Междисциплинарный рецензент
Контент рецензируется перекрёстно в зависимости от категории:
- **Питание и добавки** (нутрициология, креатин, протеин, дефицит калорий): пишет диетолог (`Sarah Johnson, RD`), а рецензирует тренер (`Richard Botich, CSCS` или `Mike Chen`), либо наоборот.
- **Силовые тренировки и биомеханика**: пишет силовой тренер (`Richard Botich`), а рецензирует специалист по реабилитации и функционалу (`Mike Chen`).

---

## 3. Frontend-компоненты и UI

### Компонент `ReviewedByBox`
Создан премиальный компонент `frontend/src/components/common/ReviewedByBox.tsx`:
- Тёмная карточка с изумрудным градиентом (`from-[#12232F] via-[#101E2B] to-[#0A131C]`) и световым акцентом `#00C853` (символ медицинской/научной верификации).
- Аватар эксперта с бейджем подлинности `CheckCircle2`.
- Адаптивный статус верификации:
  - `Medically Reviewed` — для категорий питания (`nutrition`, `supplements`).
  - `Scientifically Reviewed` — для тренировок и биомеханики.
- Дата проведения верификации (`Verified on [Date]`).
- Кликабельная ссылка на профиль рецензента (`/authors/[slug]`) с указанием сертификатов.
- Прямой переход на стандарты проверки: `How we verify content (Editorial Policy)`.

### Обновление детальной страницы статьи (`/blog/[slug]`)
В `frontend/src/app/blog/[slug]/page.tsx`:
- **Hero-метаданные**: Рядом с автором выводится кликабельный бейдж рецензента `Reviewed by {name}` с иконкой `CheckCircle2`.
- **Под статьей**: Перед карточкой автора `AuthorBox` рендерится блок `ReviewedByBox` на основе связи `post.reviewedBy[0]` из Strapi.
- **Schema.org**: Поле `reviewedBy` сериализуется в JSON-LD `BlogPosting` как объект `Person` с URL профиля.

---

## 4. Навигация и трастовые сигналы в Footer

В компоненте `frontend/src/components/Footer.tsx`:
- Раздел переименован в **«Legal & Trust»**.
- Добавлена ссылка на `/editorial-policy`.
- Заменены заглушки `href="#"` на подлинные ссылки сообществ:
  - Facebook: `https://www.facebook.com/fitway.best/`
  - Instagram: `https://www.instagram.com/fitway.best/`
  - Twitter / X: `https://x.com/fitway_best`

---

## 5. Индексация (`sitemap.ts`)
URL `https://fitway.best/editorial-policy` добавлен в массив статических страниц `sitemap.ts` со следующими параметрами:
- `changeFrequency: 'monthly'`
- `priority: 0.6`

Related: [[frontend/seo]], [[frontend/authors-system]], [[frontend/blog-ui]], [[architecture/overview]]
