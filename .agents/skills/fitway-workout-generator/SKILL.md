---
name: fitway-workout-generator
description: >
  AI Fitness Content Architect для проекта FitWay. Генерирует профессиональные,
  SEO-оптимизированные workout pages в формате JSON, строго совместимого со Strapi CMS
  (collection: workout, components: fitness.exercise, fitness.nutrition-tips, fitness.expert-tips),
  плюс готовый промпт для hero-изображения (1200x630) и автоматический пуш в админку Strapi в статусе DRAFT.
  Используй этот скилл всякий раз, когда нужно сгенерировать страницу тренировки,
  workout content, фитнес-статью или данные для CMS-коллекции. Триггеры:
  "сгенерируй тренировку", "создай workout page", "нужен контент для тренировки",
  "добавь workout в CMS", "создай фитнес-контент", "generate workout", "fitway workout".
  Используй скилл даже если пользователь просто описывает тип тренировки без явного
  запроса на генерацию.
---

# FitWay Workout Content Architect

Генерирует workout pages для FitWay — SEO-оптимизированный JSON, готовый к прямому
импорту в Strapi CMS через Content Manager или API.

**Схема строго зафиксирована** — см. `references/json-schema.md`.
**UI-маппинг полей** — см. `references/ui-structure.md`.
**SEO-правила** — см. `references/seo-guide.md`.
**Анти-AI правила (Humanizer)** — см. `.agents/skills/humanizer/SKILL.md`. Обязательно к применению для устранения маркеров машинной генерации в `text`, `description`, `technique`, `tips` и `expertTips`.
**Реестр опубликованных тренировок** — см. `references/existing-workouts.md`. Читай ПЕРВЫМ: каждая новая тренировка должна быть уникальной.

---

## Справочник тренеров и рецензентов (E-E-A-T)

| ID | Эксперт | Квалификация | Роль |
|:--:|---------|--------------|------|
| **1** | Richard Botich | NASM-CPT, CES | Главный тренер / Рецензент упражнений |
| **5** | Mike Chen | CSCS, CISSN | Тренер по силовой подготовке / Научный рецензент |
| **3** | Sarah Johnson | MS, RD, CDN | Рецензент по питанию и восстановлению |

**Кросс-рецензирование**: `author` и `reviewedBy` не могут совпадать. Если автор Richard Botich (1), рецензент Mike Chen (`[{ "id": 5 }]`).

---

## Процесс генерации

### Шаг 1 — Определи параметры тренировки

Из контекста или спроси (одним сообщением, не по одному):

- **category**: `weight-loss` / `muscle-gain` / `toning` / `flexibility` / `strength`
- **difficulty**: Beginner / Intermediate / Advanced
- **equipment**: gym / home / bodyweight only / конкретное оборудование
- **фокус**: группа мышц или цель (например, "ноги", "кор", "всё тело")
- **автор и рецензент**: Richard Botich (1) и Mike Chen (5) по умолчанию

Если пользователь дал достаточно данных — генерируй без уточнений.

### Шаг 1.5 — Проверка уникальности (обязательно)

Открой `references/existing-workouts.md` и сверь планируемый slug и комбинацию (категория + сложность + оборудование). Не создавай дублей существующих программ.

### Шаг 2 — Генерируй по схеме

Полная схема в `references/json-schema.md`. Критичные правила:

**Структура:**
- Только поля из Strapi-схемы. Никаких `seoBlocks`, `trainingDetails`, `primaryKeyword` и т.п.
- `title`: до 70 символов, без суффикса `| FitWay`
- `author`: relation `{ "id": 1 }` или `{ "id": 5 }`
- `reviewedBy`: relation `[{ "id": 5 }]` или `[{ "id": 1 }]` (рецензент $\neq$ автор)
- `equipment`, `targetMuscleGroups`, `muscles` — строки через запятую, не массивы
- `nutritionAdvice` — объект (не массив), три текстовых поля
- `expertTips` — объект (не массив), два текстовых поля: `tips` и `commonMistakes` (по 3 конкретных буллета под этот воркаут с переносом строки `- ...\n- ...`)
- `image` и `video` — не включать в JSON (загружаются отдельно)
- `duration` в упражнении — только для time-based (планка, кардио), иначе `null`

**Контент и перелинковка (Hub & Spoke):**
- `description`: 2-3 коротких предложения — лид/анонс тренировки для превью-карточек и meta description
- `text`: 300–800 слов, основное SEO-описание, Google Helpful Content стиль, EN
- **Внутренние ссылки в `text`**: обязательно добавь 1–2 контекстные ссылки на инструменты:
  - Силовые / масса $\rightarrow$ `[FitWay One-Rep Max Calculator](/tools/one-rep-max-calculator)`
  - Кардио / жиросжигание / тонус $\rightarrow$ `[FitWay Daily Calorie Calculator](/tools/calorie-calculator)` или `[Macro Splitter](/tools/macro-calculator)`
- `technique`: 100–200 слов на упражнение, пошагово
- `tips` и `commonMistakes` (в упражнении): микро-техника конкретного движения
- `expertTips`: макро-стратегия всей тренировочной сессии (3 tips и 3 commonMistakes от тренера/рецензента)
- Тон: Nike Training Club / Men's Health — экспертный, без AI-клише
- Упражнения: только реальные, 4–10 на тренировку

**ЗАПРЕЩЕНО в тексте:**
- Длинное тире `—` (em dash) — по нему мгновенно распознаётся AI-генерация
- Замена: используй запятую, двоеточие, точку или короткое тире `-` где грамматически уместно

**Данные:**
- `calories`: Beginner ~5–6 kcal/min × duration, Intermediate 7–9, Advanced 9–13
- `category`: строго один из пяти enum-значений (kebab-case)
- `difficulty`: с заглавной буквы — `"Beginner"`, `"Intermediate"`, `"Advanced"`

### Шаг 2.5 — Анти-AI вычитка по скиллу Humanizer (`.agents/skills/humanizer/SKILL.md`)

Перед добавлением в JSON обязательно вычитай все текстовые поля воркаута (`description`, `text`, `technique`, `tips`, `commonMistakes`, `expertTips`, `nutritionAdvice`) по стандарту `humanizer`. Текст должен звучать как прямые методические указания квалифицированного тренера (Richard Botich, NASM-CPT или Mike Chen, CSCS), без синтетического лоска чатбота.

**Обязательные правила для контента тренировки:**
1. **Устранить «Not X but Y» (§1)**: вырежи фразы вида `It's not just about moving weight, it's about mind-muscle connection`. Формулируй биомеханическую команду прямо: `Control the eccentric phase for 2 seconds to maximize tension on the pectorals.`
2. **Никаких драматичных лозунгов и однострочников (§2)**: никаких `Consistency is key.`, `Listen to your body.`, `That is the real win.`.
3. **Устранить вводный разогрев (§4)**: в поле `text` и `technique` не начинай с `Let's dive in`, `Here's what you need to know`, `Without further ado`. С первого предложения переходи к биомеханике и структуре тренировки.
4. **Устранить клише AI (§12)**:
   - Запрещены: `delve`, `crucial`, `pivotal`, `game-changer`, `testament`, `tapestry`, `landscape`, `robust`, `underscore`, `meticulously`, `holistic`.
   - Заменяй прямыми спортивными терминами: `essential`, `necessary`, `improves`, `stabilizes`, `activates`.
5. **Запрет надуманных триад (§6)**: не собирай искусственные тройки слов (`form, focus, and fire`).
6. **Полный запрет Em Dash и En Dash (§8)**: ни одного `—` или `–`. Заменяй на двоеточия, точки или запятые.
7. **Запрет высокопарных заменителей глаголов (§18)**: вместо `The Romanian deadlift serves as an exercise that boasts high glute activation` пиши `The Romanian deadlift loads the hamstrings and glutes in a lengthened position.`
8. **Чистые буллеты без декоративного bolding (§19)**: в `expertTips` и `tips` избегай шаблонного bold-оформления каждого пункта (`- **Breathing:** Inhale... - **Footing:** Keep feet flat...`). Пиши прямые указания: `- Inhale deeply at the top, brace your core, and maintain abdominal pressure until passing the sticking point.`
9. **Активный залог вместо пассивного (§11)**: пиши команды атлету напрямую: `Pull your elbows toward your hips` вместо `Elbows should be pulled toward hips`.

### Шаг 3 — Валидация перед выводом

- [ ] slug и фокус проверены по `existing-workouts.md`, нет дублирования
- [ ] `author` = `{ "id": N }` и `reviewedBy` = `[{ "id": N }]` (разные ID)
- [ ] `category` — одно из: `weight-loss`, `muscle-gain`, `toning`, `flexibility`, `strength`
- [ ] `calories` соответствует `duration` и `difficulty`
- [ ] `description` — 2-3 предложения, не длиннее
- [ ] `text` ≥ 300 слов и содержит минимум 1 ссылку на калькулятор (`/tools/*`)
- [ ] `expertTips` содержит уникальные 3 tips и 3 commonMistakes для макро-сессии
- [ ] **пройдена полная вычитка по скиллу `humanizer`**: нет "Not X but Y", нет "crucial/pivotal/delve", нет em dash, нет шаблонного bolding в советах, живой тренерский тон
- [ ] нет em dash `—` и en dash `–` нигде в тексте
- [ ] каждое упражнение имеет `name`, `sets`, `reps`, `technique`
- [ ] нет лишних полей вне Strapi-схемы
- [ ] JSON валиден синтаксически
- [ ] подготовлен промпт для hero-изображения тренировки (1200x630, 16:9)

### Шаг 4 — Автоматический импорт в Strapi (Production Draft)

После успешной генерации и валидации агент выполняет следующие шаги **автоматически**:

1. **Сохранение в staging-файл `backend/scripts/workouts.json`**:
   - Запиши сгенерированный объект тренировки в `backend/scripts/workouts.json` в виде массива `[ { ... } ]`.
2. **Отправка в Strapi**:
   - Выполни команду импорта в продакшн Strapi:
     ```bash
     node backend/scripts/push-workout.js backend/scripts/workouts.json --prod
     ```
   - Тренировка загружается в Strapi строго в статусе **DRAFT** (`publishedAt: null`, `?status=draft`). Фотографии обложки (`image`) пользователь добавляет вручную через админку Strapi перед финальной публикацией.
3. **Регистрация в реестре**:
   - Сразу добавь новый slug, название, категорию, сложность и оборудование в `references/existing-workouts.md` и обнови счётчик общего числа тренировок.

### Шаг 5 — Вывод

Верни по порядку:

1. **Статус импорта в Strapi** (ID созданного черновика в production)
2. **Полный JSON тренировки** в code block
3. **Summary** (3–5 строк):
   - Название, slug, категория, уровень сложности
   - Длительность, калории, оборудование, целевые мышцы
   - Автор (имя и ID) и рецензент (имя и ID)
   - Контекстные ссылки на калькуляторы в тексте
4. **Visual Content Suggestions (Hero Image Prompt)**: готовый промпт для генератора изображений (Midjourney / Flux / DALL-E 3)

---

## Visual Content Suggestions (Hero Image Prompt)

Изображения в JSON не входят. После summary выдай промпт для основного изображения (Hero/Cover) тренировки, готовый к генерации:
- **Формат**: 1200×630 (соотношение сторон 16:9 / OG Image).
- **Стиль**: Editorial fitness photography (уровня Nike Training Club, Men's Health, Gymshark editorial), аутентичный атлетичный вид, без пластикового AI-эффекта («uncanny valley»).
- **Сюжет**: Фокус на реальной биомеханике упражнения из этой программы (например, жим гантелей на наклонной скамье, тяга к поясу или присед), атлет правильного телосложения в момент концентрации.
- **Освещение и цвета**: Кинематографичный боковой или контровой свет (rim lighting), подчеркивающий рельеф мышц; палитра соответствует стилю FitWay (темно-синий/графитовый фон `#1B2B3B`, теплый естественный свет).
- **Ограничения**: Без текста, без типографики, без логотипов, без водяных знаков, анатомически корректные руки (5 пальцев) и пропорциональные гантели/штанги.

---

## Ограничения

- НЕ добавлять поля, которых нет в Strapi-схеме
- НЕ использовать массивы там, где Strapi ожидает строку
- НЕ включать `image`/`video`/`media` в JSON
- НЕ придумывать несуществующие упражнения
- НЕ использовать медицинские обещания
- НЕ завышать `calories` (типичная ошибка: 1000 kcal за 30 мин — нереально)
