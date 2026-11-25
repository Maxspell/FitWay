# Google AdSense Approval Roadmap («Бесполезный контент / Low Value Content»)

> **Цель**: Успешно пройти модерацию в Google AdSense и снять блокировку «Бесполезный контент / Low value content».  
> **Старт проекта**: 20 мая 2026 г.  
> **Текущий статус**: В процессе выполнения (Фазы 1, 2 и 3 закрыты; Фаза 4 — разгон трафика по тактическому плану).  
> **Связанные документы базы знаний**: [[frontend/editorial-policy]], [[frontend/authors-system]], [[frontend/seo]], [[frontend/performance-third-party-scripts]], [[frontend/fitness-calculators-pseo]], [[frontend/navigation-mega-menu]]

---

## 📊 Прогресс выполнения

```
[████████████████░░░░] 82% Завершено (14 из 17 ключевых задач закрыто)
```

---

## Фаза 1: Устранение критических триггеров «недоделанного сайта» (P0 — Critical)
*Критерии, по которым боты и модераторы AdSense мгновенно отклоняют заявку как "Under Construction" или "Template Site".*

- [x] **Устранение пустых ссылок-заглушек в футере (`href="#"`)**  
  *Результат*: В `Footer.tsx` добавлены реальные адреса официальных аккаунтов FitWay: Facebook (`fitway.best`), Instagram (`fitway.best`), Twitter/X (`fitway_best`).
- [x] **Создание страницы Редакционных стандартов (`/editorial-policy`)**  
  *Результат*: Разработана страница `frontend/src/app/editorial-policy/page.tsx` с регламентом 4-этапной проверки контента, ссылками на научные стандарты (PubMed, ISSN, ACSM), презентацией команды экспертов и политикой исправлений. Ссылка выведена в футер («Legal & Trust») и добавлена в `sitemap.ts`.
- [x] **Внедрение системы экспертного рецензирования (Peer Review) в UI**  
  *Результат*: Создан компонент `ReviewedByBox.tsx` с разделением на `Medically Reviewed` (питание/добавки) и `Scientifically Reviewed` (тренировки). В `blog/[slug]/page.tsx` добавлены бейдж рецензента в hero-блоке, карточка проверки перед автором и Schema.org `reviewedBy`.
- [x] **Проверка обязательных юридических и технических страниц**  
  *Результат*: Проверены и обновлены до стандартов Google AdSense `Privacy Policy` (добавлено раскрытие cookies, DoubleClick, third-party ad networks, ссылки на opt-out AboutAds/NAI/YourOnlineChoices, права GDPR/CCPA, canonical и контакты support@fitway.best), `Terms of Service` с медицинским дисклеймером, форма `Contact Us`, валидный `ads.txt` (`pub-8295879566072893`), `robots.txt` и `sitemap.xml`. Подробности в [[frontend/adsense-privacy-policy-compliance]].
- [x] **Очистка сигналов доверия (Trust Signals) и легитимизация контактов**  
  *Результат*: Устранены фиктивные адрес (`456 Wellness Ave`) и телефон (`+1 603`). Добавлен рабочий Catch-all Mail Redirect, внедрена кликабельная доменная почта `support@fitway.best` (в футере и на странице контактов), регламент ответа до 24 часов и очищенная разметка Schema.org `ContactPoint`. Подробности в [[frontend/trust-signals-contacts]].

---

## Фаза 2: Наращивание базы контента и глубины (Борьба с Thin Content)
*Главная причина вердикта «Бесполезный контент»: на сайте всего ~13 статей блога, что для фитнес-портала расценивается как недостаточный объем.*

- [x] **Расширение библиотеки статей блога (28 статей, 54 страницы в индексе GSC)**  
  *Результат*: Библиотека блога расширена до 28 объемных статей. С учетом программ тренировок, категорий и калькуляторов в Google Search Console успешно проиндексировано 54 страницы. Минимально необходимый объем контента для снятия подозрения в «Under Construction / Low Value Content» достигнут.
- [x] **Увеличение глубины материалов (1200–1800+ слов)**  
  *Результат*: В статьях существенно увеличена глубина проработки темы (пошаговые руководства, таблицы, расчеты, FAQ). Устранен риск вердикта «Thin Content».
- [x] **Исходящие ссылки на научные первоисточники (Evidence-Based)**  
  *Результат*: В контент внедрены прямые исходящие ссылки на авторитетные научные первоисточники (PubMed, NIH, ISSN и др.), что подтверждает тезисы и усиливает сигналы E-E-A-T для YMYL-тематики.

---

## Фаза 3: E-E-A-T и связывание данных в Strapi
*Демонстрация реальной экспертизы в категории YMYL (Your Money or Your Life).*

- [x] **Назначение рецензентов (`reviewedBy`) в Strapi для всех статей**  
  *Результат*: Настроена перекрёстная проверка, для опубликованных постов в Strapi проставлены рецензенты (`reviewedBy`) с выводом в UI карточки `ReviewedByBox` и Schema.org.
- [x] **Усиление профилей авторов на `/authors/[slug]`**  
  *Результат*: В профили авторов добавлены ссылки на подтвержденные социальные сети и профессиональные профили, био и специализации.

---

## Фаза 4: Органический трафик и разгон поведенческих метрик
*AdSense строго оценивает наличие реальной аудитории и активность пользователей. Задача фазы — довести показатели сайта от первых зацепок в поиске до устойчивого органического и реферального трафика.*

### 4.1. Базовый статус индексации
- [x] **Индексация всех новых страниц в Google Search Console**  
  *Результат*: 54 страницы успешно проиндексированы в GSC. Наблюдается устойчивая динамика показов в поиске (1,69 тыс. показов за 3 месяца с ростом до 40–60 показов в день, средняя позиция 27.5).

### 4.2. Тактический план роста органического трафика
- [x] **Сбор «низковисящих плодов» (Low-Hanging Fruits из GSC)**  
  *Результат*: Настроена прямая синхронизация с Google Search Console API через сервисный аккаунт (`scripts/gsc_client.py`), кэш запросов выгружен в `brain/data/gsc-latest.json` ([[frontend/gsc-api-integration]]). Выявлена и ликвидирована каннибализация запросов по прогрессивной перегрузке: статья `progressive-overload-training-principle...` переориентирована на узкий интент *«Progressive Overload with Dumbbells»* с доказательной базой PubMed (PMID: 36199287, 33671664). Подробно: [[frontend/gsc-crawled-not-indexed-resolution]].
- [ ] **Снайперская контентная стратегия: Long-Tail и «VS» темы**  
  *Действие*: Отказаться от высококонкурентных широких тем. Писать 1–2 статьи в неделю исключительно по низкоконкурентным узким запросам:
  - Сравнения («A vs B»): *Mifflin-St Jeor vs Harris-Benedict*, *RDL vs Conventional Deadlift*, формы креатина.
  - Узкие прикладные проблемы и страхи: *Calorie deficit without losing strength*, *Weight gain in 500 kcal deficit first week*.
- [x] **Интерактивные инструменты и посадочные страницы калькуляторов (pSEO)**  
  *Результат*: Развернута архитектура Hub & Spoke для инструментов:
  - Основной хаб `/tools` укреплен (добавлен каталог 5 калькуляторов, 4-этапная методология, разметка `ItemList` и сохранена оригинальная микроразметка для защиты позиций).
  - Создано 5 отдельных посадочных страниц с глубокими руководствами (800–1200 слов, формулы, таблицы, PubMed): `/tools/bmi-calculator`, `/tools/calorie-calculator`, `/tools/macro-calculator`, `/tools/one-rep-max-calculator`, `/tools/ideal-weight-calculator`.
  - Внедрены интерактивные виджеты (Macro, 1RM, Ideal Weight, BMI, Calorie), микроразметка `SoftwareApplication`, `FAQPage`, хлебные крошки `BreadcrumbList` и блоки перелинковки `RelatedCalculators`.
  - Все страницы синхронизированы в `sitemap.ts`, HTML-карте (`/sitemap`) и `llms.txt`.
- [x] **Внутренняя кольцевая перелинковка (Topic Clusters & Anchor Matrix)**  
  *Результат*: Создан мастер-реестр `internal-links.md` ([[frontend/ai-agents-skills-architecture]]). Развернута кольцевая перелинковка между лидером трафика `hypertrophy-training-guide...`, непроиндексированными статьями `what-eat-after-workout...`, `lose-weight-without-losing-muscle`, хабами категорий блога (Nutrition, Muscle Building, Training, Motivation) и калькуляторами `/tools/*` ([[frontend/gsc-crawled-not-indexed-resolution]]).
- [ ] **Белый посев контента для первичного реферального трафика (Reddit, Quora, сообщества)**  
  *Действие*: Публиковать развернутые экспертные ответы на вопросы пользователей в профильных ветках (r/fitness, r/loseit, Quora) со ссылкой на научные расчеты и материалы FitWay. Цель — привлечь 10–20 целевых живых посетителей в день и дать поисковику поведенческий сигнал доверия.

### 4.3. Критерий перехода к подаче заявки (Gatekeeper)
- [ ] **Достижение планки трафика: от 15–30+ органических кликов в день**  
  *Критерий*: Показы в поиске пробивают уровень 150–250+ в день, клики выходят на стабильные 15–30 в день, среднее время на странице от 1.5–2 минут. Только после этого переходить к Фазе 5.

### 4.4. Click-Growth Action Plan (0.5 → 15–30+ Daily Clicks, Audited 2026-11-25)
*Sub-plan added following the 2026-11-25 GSC + GA4 dual-source audit ([[frontend/gsc-api-integration]], [[frontend/ga4-api-integration]]). Search impressions reached 182.0/day (2,238 over 28d; peak 255/day) and 9/9 inspected articles passed indexation, so the primary bottleneck shifted from crawl/indexation to CTR, sitemap completeness, and GA4 dwell-time quality.*

#### P0: Quick Technical & CTR Wins (Days 1–3 | Target: 3.5–6.5 clicks/day)
- [ ] **Fix Strapi pagination limit in `frontend/src/app/sitemap.ts` and `blog/category/[slug]/page.tsx`**: Add `&pagination[pageSize]=250` to all Strapi fetches (`/api/posts`, `/api/workouts`, `/api/authors`, `/api/categories`) so all 33+ published posts (currently capped at 25 by Strapi default) appear in `sitemap.xml`; submit the 8 missing URLs via `scripts/indexing/index.js` ([[frontend/google-indexing-api]]).
- [ ] **Eliminate double `<title>` suffixes in dynamic routes**: Remove `| Blog` in `frontend/src/app/blog/[slug]/page.tsx` and `| Premium Fitness Workout` in `frontend/src/app/workouts/[slug]/page.tsx` so `layout.tsx` (`%s | FitWay`) produces non-truncated 55–64 char SERP titles.
- [ ] **Resolve Mobility cluster cannibalization & rewrite Top-10 snippets**:
  - `/workouts/beginner-flexibility-mobility-routine-home` (Top-10 in US/CA for `stretching at home`, `mobility drills for beginners`, `stretching for beginners`, 0% CTR): shorten title to `Beginner Stretching at Home: 8 Mobility Drills (30 Min)` and compress meta description from 234 to 150–155 chars.
  - `/blog/mobility-training-flexibility-workout-plan` (692 impr, pos 5.6–10.1): remove `"Stretching for Beginners"` overlap from title (`Mobility Drills Workout Plan: How to Do Them Correctly`) and add an `### How to Do Mobility Drills Correctly (5 Form Rules)` section.
- [ ] **Shorten CTR-leader blog title**: Trim `/blog/bodyweight-training-vs-weight-training-muscle` (pos 5.8–6.4, 7.69% CTR) to `Bodyweight vs Weight Training for Muscle (2026 Guide)` so `(2026 Guide)` is not truncated in SERP.
- [ ] **Add `FAQPage` JSON-LD & complete `BlogPosting` schema in `blog/[slug]/page.tsx`**: Parse `## Frequently Asked Questions` into `FAQPage` structured data and add `dateModified`, `mainEntityOfPage`, and `publisher` fields to `BlogPosting` ([[frontend/seo]]).

#### P1: Striking Distance Push (Pos 8–30), Internal Linking & GA4 Zombie Fix (Weeks 1–2 | Target: 10–16 clicks/day)
- [ ] **Push `/tools/ideal-weight-calculator` (48 impr/7d, pos 29.2; US queries pos 18–24)**: Add `## How to Calculate Ideal Body Weight (Step-by-Step Formula Guide)` with worked examples (`5'4"`, `5'7"`, `5'10"`, `6'0"`), an `IBW formula` FAQ item, and exact-match contextual links from `lose-belly-fat-what-actually-works`, `calorie-deficit-how-to-calculate`, `hypertrophy-training-guide-building-muscle-size`, and `/`.
- [ ] **Upgrade 5 rising Striking Distance articles**:
  - `/blog/calorie-deficit-how-to-calculate` (113 impr/7d, pos 40.7): shorten title to `How to Calculate a Calorie Deficit for Weight Loss`, move `/tools/calorie-calculator` CTA above the fold, and add `## How to Get Into a Calorie Deficit Safely`.
  - `/blog/lose-belly-fat-what-actually-works` (23 impr/7d, pos 15.4): add H3 comparing visceral vs subcutaneous fat loss timelines and cross-link with `calorie-deficit-how-to-calculate` and `truth-about-cardio-and-fat-loss`.
  - `/blog/progressive-overload-training-principle-muscle-growth` (pos 10.2): inject exact query `overload training` (pos 14.7) into H2/intro and link from `upper-lower-split-routine-hypertrophy-guide` and `best-compound-exercises-muscle-growth`.
  - `/blog/upper-lower-split-routine-hypertrophy-guide` (32 impr/7d, pos 21.3): add inbound links from hypertrophy/PPL/compound posts and workouts #12/#13 once restored in `sitemap.xml`.
  - `/blog/hypertrophy-training-guide-building-muscle-size` (66 impr): add a concise 45-word direct answer under H2 targeting `how do you train for hypertrophy?` (pos 6.0) for Featured Snippet capture.
- [ ] **Eliminate GA4 zombie-page risk on category hubs & low-dwell pages**: Add an above-the-fold "Quick Start & Key Takeaways" box (3 bullets + anchor to guide/FAQ + calculator CTA) in `blog/category/[slug]/page.tsx` to lift dwell time on `/blog/category/lifestyle` (14.0s, currently flagged as 1 zombie page), `/blog/category/training` (6.0s), and `/blog/category/nutrition` (16.3s) above 25s (`zombie_pages_count == 0`). Add 3-step intro summaries to `/workouts/beginner-hiit-workout-home-dumbbells-resistance-bands` (10.5s) and `/blog/best-pre-workout-meal-eat-before-training` (18.0s).
- [ ] **Brand consolidation on `/` and `/about`**: Fix missing space in homepage H1 (`Elevate Your Fitness Journeywith AI Precision`) and add prominent CTAs on `/about` (53 branded impr, pos 20.9) to `/`, `/tools`, and `/workouts`.

#### P2: Long-Tail Sniper Content, pSEO & Referral Scaling (Weeks 2–4 | Target: 15–30+ clicks/day)
- [ ] **Publish 2 Long-Tail/VS articles + 1 workout per week (de-duplicated against `existing-posts.md` / `existing-workouts.md`)**:
  - *Mifflin-St Jeor vs Harris-Benedict: Which Calorie Formula Is More Accurate?*
  - *Why You Gain Weight in the First Week of a Calorie Deficit (Water & Glycogen Science)*
  - *Ankle Mobility Drills for Deeper Squats: 5-Minute Pre-Lift Routine*
  - *Romanian Deadlift (RDL) vs Conventional Deadlift: Muscles Worked & Which to Choose*
  - *Creatine Monohydrate vs Creatine HCL: Absorption, Bloating & Cost Comparison*
  - Workout: *15-Minute Desk Worker Mobility & Lower Back Relief Routine* (no equipment)
- [ ] **Expand pSEO long-tail blocks on `/tools/one-rep-max-calculator` and `/tools/macro-calculator`**: Add `1RM Percentage Chart (50%–95%)` for `1rm percentage` (pos 44.5) and cut/recomp macro presets ([[frontend/fitness-calculators-pseo]]).
- [ ] **Scale Pinterest & niche community seeding**: Publish 3–5 infographic pins/week (confirmed 100% GA4 engagement on `pinterest.com / referral`) linking to calculators and hubs, plus 3–4 helpful responses/week on `r/fitness`, `r/loseit`, and `r/flexibility` to grow Tier-1 share toward >= 40%.

#### KPI Milestones to AdSense Gatekeeper
| Stage | Timeline | Impressions/day | Target CTR | Organic Clicks/day | Quality Criteria (GA4 & Tech) |
|---|---|---:|---:|---:|---|
| Baseline | 2026-11-25 | 182 (peak 255) | 0.58% | 0.5 | 1 zombie page, 8 posts missing from `sitemap.xml` |
| P0 | Days 1–3 | 220–300 | 1.8–2.5% | 3.5–6.5 | 33/33 posts in `sitemap.xml`, `<title>` <= 62 chars, `FAQPage` JSON-LD |
| P1 | Weeks 1–2 | 350–550 | 2.5–3.2% | 10–16 | 0 zombie pages (category dwell > 25s), Tier-1 > 35% |
| P2 (Gatekeeper) | Weeks 2–4 | 600–1,000+ | 2.5–3.5% | 15–30+ | 7-day sustained >= 15–30 clicks/day, 0 zombie, Tier-1 >= 40% |

---

## Фаза 5: Финальный чеклист перед повторной отправкой заявки
*Техническая готовность перед нажатием кнопки «Request review» в кабинете AdSense.*

- [ ] **Раскомментировать скрипт Google AdSense в `layout.tsx`**  
  *Действие*: Активировать тег `<Script>` с `adsbygoogle.js` и проверить отсутствие ошибок блокировки в консоли браузера.
- [ ] **Проверить отдачу `ads.txt` и метатега `google-adsense-account`**  
  *Действие*: Убедиться, что `https://fitway.best/ads.txt` отдается без редиректов со статусом 200.
- [ ] **Финальный аудит мобильной версии (Google PageSpeed / Core Web Vitals)**  
  *Действие*: Убедиться, что CLS < 0.1, LCP < 2.5s, верстка не имеет горизонтального скролла на мобильных устройствах.
- [ ] **Отправка заявки на пересмотр в панели Google AdSense**  
  *Дата отправки*: `[Заполнить при отправке]`  
  *Результат*: `[В ожидании / Одобрено]`

---

## 📝 Журнал изменений статуса плана
- **2026-11-25 (GSC + GA4 Dual Audit & Click-Growth Sub-Plan 4.4)**: Completed comparative GSC/GA4 audit and URL Inspection check. GSC 28d impressions doubled to 2,238 (+98.9%) with 7d velocity jumping to 182.0 impressions/day (peak 255/day, hitting Phase 4 impression target), while 9/9 inspected articles passed `Submitted and indexed` (clearing the Nov 18 "Crawled - currently not indexed" backlog). AdSense Gatekeeper remains `WAITING (0.5/15 daily clicks target)` due to 3 technical/SEO bottlenecks discovered by `seo-adsense-architect`: `sitemap.ts` Strapi default 25-item cap dropping 8 published posts, double `<title>` suffixes (`| Blog | FitWay`, `| Premium Fitness Workout | FitWay`) truncating Top-10 Tier-1 snippets, and category hub below-the-fold layout causing 1 GA4 zombie page (`/blog/category/lifestyle`, 14.0s dwell). Added prioritized P0/P1/P2 Click-Growth Action Plan as Section 4.4.
- **2026-11-18 (GSC Аудит: Взрыв показов +84% и новые кластеры в Striking Distance)**: Проведен сравнительный аудит данных Google Search Console API. Зафиксирован всплеск 7-дневной скорости показов с 31.0 до 57.1 в день (+84.2%, пик 109 показов 16.11). Сформировался мощный новый кластер `stretching for beginners` (позиция 11.4, 19 показов), зафиксирован перехват запроса `stylecraze ideal weight` (позиция 10.0), бренд `fitway` вырос до позиции 14.3, а страницы авторов `/authors/sarah-johnson` и `/authors/mike-chen` вошли в ТОП-10 выдачи (позиции 8.1 и 9.1). Статус гейткипера AdSense: `WAITING (0.5/15 daily clicks)` — заявка не отправляется до перехода показов позиций 10-15 в стабильные клики.
- **2026-11-09 (GSC API, перелинковка и деканнибализация)**: Подключен прямой API Google Search Console через сервисный аккаунт (`scripts/gsc_client.py`), кэш аналитики интегрирован в `brain/data/gsc-latest.json` ([[frontend/gsc-api-integration]]). Проведена диагностика 15 непроиндексированных URL: ликвидирована каннибализация по запросу Progressive Overload (статья переориентирована на Dumbbell Progressive Overload с доказательной базой PubMed), сгенерированы глубокие SEO-хабы категорий блога (Nutrition, Muscle Building, Training, Motivation), развернута кольцевая перелинковка со статьи-лидера трафика `hypertrophy-training-guide...` на периферийные материалы ([[frontend/gsc-crawled-not-indexed-resolution]]). Закрыты пункты 4.2 по сбору низковисящих плодов и перелинковке (общий прогресс плана достиг 82%).
- **2026-11-06 (pSEO калькуляторы)**: Запущена кластерная архитектура Hub & Spoke для калькуляторов. Создано 5 посадочных страниц (`/tools/bmi-calculator`, `/tools/calorie-calculator`, `/tools/macro-calculator`, `/tools/one-rep-max-calculator`, `/tools/ideal-weight-calculator`) с интерактивными компонентами, микроразметкой `SoftwareApplication`, `FAQPage`, хлебными крошками и глубокими экспертными статьями. Хаб `/tools` укреплен новой методологией и разметкой `ItemList`.
- **2026-11-06 (стратегия трафика)**: В Фазу 4 интегрирован тактический план разгона органического трафика (Low-Hanging Fruits из GSC, Long-Tail/VS темы, калькуляторы pSEO, внутренняя перелинковка и посев на Reddit/Quora) с таргетом 15–30 кликов/день перед подачей заявки.
- **2026-11-06 (E-E-A-T и GSC)**: Закрыта Фаза 3 (рецензенты `reviewedBy` и соцсети авторов в Strapi). В Фазе 4 закрыта индексация (54 страницы в GSC, 1.69k показов). Пункт по трафику зафиксирован на этапе ожидания роста: 21 клик за 3 месяца — отличный старт для выхода из песочницы, но подавать заявку в AdSense сейчас рискованно до достижения стабильного ежедневного трафика.
- **2026-11-06**: Полностью закрыта Фаза 2 (Борьба с Thin Content): в блоге опубликовано 28 глубоких материалов с исходящими научными ссылками (PubMed/NIH), в Google Search Console проиндексировано 54 страницы сайта. Следующий фокус — E-E-A-T связки авторов и рецензентов в Strapi (Фаза 3) и мониторинг динамики органического трафика (Фаза 4).
- **2026-09-17**: Создан дорожный план. Зафиксировано выполнение Фазы 1 (соцсети в футере, страница Editorial Policy, система рецензирования ReviewedByBox). Следующий приоритет — увеличение количества статей блога в Strapi и перекрёстная простановка связей авторов/рецензентов.
