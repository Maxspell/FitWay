# UI Structure — FitWay Workout Detail Page

Описание интерфейса на основе дизайна страницы. Используй как референс при генерации контента,
чтобы каждое поле JSON точно соответствовало компоненту на странице.

---

## Hero Section (верхняя часть, тёмный фон с фото)

### Badges (строка с тегами)
- `basicInfo.category` → оранжевый badge (например: "MUSCLE GAIN")
- `basicInfo.difficulty` → светлый badge (например: "BEGINNER")

### Title
- `basicInfo.title` → крупный H1, bold, белый текст
- Примеры: "STRENGTH BUILDER", "FULL BODY BLAST", "FAT BURNER HIIT"

### Description (короткая)
- Первые 1–2 предложения из `basicInfo.description` — отображаются под заголовком
- Остальной текст description идёт в SEO-блоки ниже

### Meta-строка с иконками
- ⏱ `basicInfo.time` → "45 min"
- 🔥 `basicInfo.kcal` → "320 kcal"
- 💪 `muscles.targetMuscleGroups` → перечисление через запятую

### CTA кнопки
- "START WORKOUT" (primary, оранжевый)
- "SAVE" (secondary)
- "SHARE" (secondary)

---

## Info Cards (4 карточки под hero)

| Карточка | Поле JSON | Пример |
|----------|-----------|--------|
| EQUIPMENT | `equipment` | "Dumbbells, Bench" |
| TARGET MUSCLES | `muscles.targetMuscleGroups` | "Chest, Back, Shoulders" |
| EXERCISES | count of `exercises` array | "6 Movements" |
| FREQUENCY | `trainingDetails.frequency` | "3x per week" |

---

## Sidebar (правая колонка, оранжевый блок)

- "Upgrade to Pro" CTA
- Контент: "Get unlimited access to all workout programs and expert nutrition plans."
- Кнопка: "Get Access Now"
→ Этот блок не требует данных из JSON, это статичный UI-компонент.

---

## Exercise List

### Заголовок секции
- "EXERCISE LIST (N)" где N = количество упражнений

### Progress bar
- Начальный: 0%
- Обновляется при нажатии "Mark as Done" на каждом упражнении

### Каждый Exercise Card

```
[номер] [name]            [chevron toggle]
        [sets] SETS • [reps]

[FORM PREVIEW video/gif]  EXECUTION TECHNIQUE
                          "[executionTechnique]"

                          PRO TIPS    |  AVOID
                          [proTips]   |  [avoid]

                          PRIMARY MUSCLES: [primaryMuscles]
                          
                          [Mark as Done button]
```

**Важно для контента:**
- `executionTechnique` отображается в кавычках внутри карточки — должен быть полным и подробным
- `proTips` и `avoid` — короткие, умещаются в 2 колонки
- `primaryMuscles` — список через запятую внизу карточки
- `sets` и `reps` отображаются в заголовке карточки: "3 SETS • 12"

---

## Nutrition & Fueling Tips

Блок с тёмным фоном, три колонки:

| Колонка | Цвет заголовка | Поле JSON |
|---------|----------------|-----------|
| ⚡ PRE-WORKOUT FUEL | оранжевый | `nutritionAdvice.preWorkout` |
| ✓ POST-WORKOUT RECOVERY | зелёный | `nutritionAdvice.postWorkout` |
| 💧 HYDRATION STRATEGY | синий | `nutritionAdvice.hydration` |

---

## Main Content / SEO Description (`text`)

Markdown-блок (300–800 слов), рендерится через `ReactMarkdown` с типографикой `prose prose-invert`. Содержит глубокое описание тренировки, физиологическое обоснование и контекстные ссылки на калькуляторы (`/tools/*`).

---

## Expert Tips & Common Mistakes (`expertTips`)

Две карточки под основным текстом:
1. **Expert Tips**: карточка с оранжевой иконкой лампочки `Lightbulb` и маркерами `•`. Берётся из `expertTips.tips`.
2. **Common Mistakes**: карточка с красноватой иконкой предупреждения `AlertCircle` и маркерами `×`. Берётся из `expertTips.commonMistakes`.

> При отсутствии кастомных данных фронтенд автоматически использует дефолтные подсказки по категории тренировки (fallback).

---

## Reviews, Peer Review & Social Share

- **ShareButtons**: кнопки расшаривания воркаута в соцсетях
- **ReviewSystem**: система отзывов и оценок пользователей
- **WorkoutExpertReviewBox**: блок верификации рецензентом (`reviewedBy[0]`) со статусом "Scientifically & Methodologically Reviewed"

---

## Footer

Статичный компонент, не требует данных из JSON:
- Logo + tagline
- Quick Links: Workouts, Blog, Tools, About Us, Contact
- Contact: 123 Fitness Street, New York, NY 10001
- Social: Facebook, Instagram, Twitter
- © 2026 FitWay. All rights reserved.

---

## Цветовая палитра (для контекста)

- Background: `#0f1923` (dark navy)
- Primary accent: `#f97316` (orange)
- Cards: `#1a2535` (dark blue-gray)
- Text primary: `#ffffff`
- Text secondary: `#94a3b8`
- Success/recovery: `#22c55e` (green)
- Hydration: `#3b82f6` (blue)
