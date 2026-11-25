# JSON Schema — FitWay Workout Page (Strapi-exact)

Схема строго соответствует Strapi content-types:
- Collection: `workout` (API: `api::workout.workout`)
- Components: `fitness.nutrition-tips`, `fitness.expert-tips`, `fitness.exercise`
- Relations: `author` (`api::author.author`), `reviewedBy` (`api::author.author`)

Генерируй JSON только с этими полями. Никаких лишних ключей.

---

## Корневая структура

```json
{
  "title": "...",
  "slug": "...",
  "description": "2-3 short sentences. Preview text for cards and meta description.",
  "text": "Full SEO description here, 300-800 words with internal links to tools/calculators...",
  "difficulty": "Beginner",
  "duration": 45,
  "calories": 320,
  "category": "muscle-gain",
  "equipment": "Dumbbells, Bench, Pull-up Bar",
  "targetMuscleGroups": "Chest, Back, Shoulders",
  "frequency": "3 times per week",
  "author": { "id": 1 },
  "reviewedBy": [{ "id": 5 }],
  "nutritionAdvice": {
    "preWorkout": "...",
    "postWorkout": "...",
    "hydration": "..."
  },
  "expertTips": {
    "tips": "- Maintain consistent eccentric control across all primary exercises.\n- Inhale deeply before the eccentric phase and exhale forcefully during exertion.\n- Take a full 90-120 seconds of rest between primary compound efforts.",
    "commonMistakes": "- Rushing through reps and relying on elastic recoil instead of muscular contraction.\n- Allowing shoulder anterior tilt or lumbar hyperextension when fatigue sets in.\n- Skipping proper joint warm-ups before lifting moderate to heavy working sets."
  },
  "exercises": [ ... ]
}
```

> `image` и `video` — media-поля Strapi, загружаются отдельно через Media Library. В JSON не включать.

---

## Поля верхнего уровня

| Поле | Тип | Обязательное | Примечания |
|------|-----|:-----------:|------------|
| `title` | string | ✅ | SEO-friendly, до 70 символов, без суффикса `\| FitWay` |
| `slug` | uid | ✅ | auto из title, kebab-case |
| `description` | text | ✅ | 2-3 коротких предложения, лид/анонс для карточек и meta |
| `text` | text | ✅ | 300–800 слов, основное SEO-описание тренировки + ссылки на калькуляторы |
| `difficulty` | enum | ✅ | `"Beginner"` / `"Intermediate"` / `"Advanced"` |
| `duration` | integer | ✅ | минуты: Beginner 20–35, Intermediate 35–55, Advanced 50–75 |
| `calories` | integer | — | kcal: ~5–6/min Beginner, 7–9 Intermediate, 9–13 Advanced |
| `category` | enum | ✅ | строго из списка категорий ниже |
| `equipment` | string | — | через запятую: `"Dumbbells, Resistance Bands"` |
| `targetMuscleGroups` | string | — | через запятую: `"Chest, Triceps, Anterior Deltoid"` |
| `frequency` | string | — | `"3 times per week"` / `"2–3x weekly"` |
| `author` | relation | ✅ | `{ "id": N }` (объект) |
| `reviewedBy` | relation | ✅ | `[{ "id": N }]` (массив объектов) |
| `nutritionAdvice` | component | — | объект `fitness.nutrition-tips` |
| `expertTips` | component | — | объект `fitness.expert-tips` (по 3 конкретных буллета под этот воркаут) |
| `exercises` | component[] | — | массив, 4–10 упражнений `fitness.exercise` |

---

## Авторы и Рецензенты (E-E-A-T & Peer Review)

Каждая тренировка должна быть закреплена за сертифицированным тренером и проверена экспертом:

| ID | Эксперт | Специализация & Сертификация | Роль в воркаутах |
|:--:|---------|------------------------------|------------------|
| **1** | Richard Botich | NASM-CPT, CES (Corrective Exercise Specialist) | Главный автор тренировок и техники |
| **5** | Mike Chen | CSCS (Strength & Conditioning Specialist), CISSN | Силовой методист / Научный рецензент |
| **3** | Sarah Johnson | MS, RD (Registered Dietitian), CDN | Рецензент по спортивному питанию и нутрициологии |

### Правило связки:
- Если автор Richard Botich (ID: 1) $\rightarrow$ `reviewedBy: [{ "id": 5 }]` (Mike Chen).
- Если автор Mike Chen (ID: 5) $\rightarrow$ `reviewedBy: [{ "id": 1 }]` (Richard Botich).

---

## Внутренняя перелинковка в поле `text` (Hub & Spoke)

В основном тексте описания (`text`, 300–800 слов) **обязательно размести 1–2 контекстные ссылки**:
1. Для **силовых тренировок и набора массы** (`strength`, `muscle-gain`):
   - Ссылка на [FitWay One-Rep Max Calculator](/tools/one-rep-max-calculator) для подбора рабочих процентов (например: `"...use our [One-Rep Max (1RM) Calculator](/tools/one-rep-max-calculator) to determine your 75% to 85% working loads..."`).
2. Для **жиросжигания и тонуса** (`weight-loss`, `toning`):
   - Ссылка на [FitWay Daily Calorie & TDEE Calculator](/tools/calorie-calculator) или [Macro Splitter](/tools/macro-calculator) (например: `"...pair this high-intensity circuit with a mild energy deficit using the [FitWay Daily Calorie Calculator](/tools/calorie-calculator)..."`).

---

### category enum (строго эти значения)
- `"weight-loss"` — кардио, HIIT, жиросжигание
- `"muscle-gain"` — гипертрофия, силовые
- `"toning"` — тонус, лёгкие веса + объём
- `"flexibility"` — растяжка, мобильность, йога
- `"strength"` — максимальная сила, тяжёлые базовые

---

## nutritionAdvice (fitness.nutrition-tips)

```json
"nutritionAdvice": {
  "preWorkout": "60–90 minutes before training, consume a balanced meal with complex carbs and lean protein (e.g., oatmeal with whey or toast with eggs).",
  "postWorkout": "Within 45 minutes post-workout, consume fast-acting protein and carbs to initiate muscle protein synthesis.",
  "hydration": "Drink 500ml water 2 hours before training, 150-250ml every 15-20 minutes during, and replenish with electrolytes for sessions exceeding 60 minutes."
}
```

---

## expertTips (fitness.expert-tips)

Блок макро-советов и типичных ошибок для всей тренировочной сессии (отображается в карточках "Expert Tips" и "Common Mistakes" под основным текстом).

Правила:
- `tips`: 3 конкретных буллета через перенос строки `\n` со знаком `- ` (дыхание, темп сессии, правильная разминка/отдых именно для этой программы).
- `commonMistakes`: 3 конкретные ошибки через перенос строки `\n` со знаком `- ` (неправильный расчет сил, травмоопасные ошибки протокола).

```json
"expertTips": {
  "tips": "- Maintain consistent eccentric control across all primary exercises.\n- Inhale deeply before the eccentric phase and exhale forcefully during exertion.\n- Take a full 90-120 seconds of rest between primary compound efforts.",
  "commonMistakes": "- Rushing through reps and relying on elastic recoil instead of muscular contraction.\n- Allowing shoulder anterior tilt or lumbar hyperextension when fatigue sets in.\n- Skipping proper joint warm-ups before lifting moderate to heavy working sets."
}
```

---

## exercises[] (fitness.exercise)

```json
{
  "name": "Barbell Romanian Deadlift",
  "sets": 3,
  "reps": "8-10",
  "duration": null,
  "muscles": "Hamstrings, Glutes, Lower Back",
  "technique": "Stand tall holding a barbell with an overhand grip at shoulder-width. Hinge backward at the hips while maintaining a slight bend in the knees and a flat spine. Lower the bar down the shins until you feel a deep stretch in the hamstrings, then drive through the heels and extend the hips to return to the starting position.",
  "tips": "Rest 90 seconds between sets. Keep the bar in contact with your legs throughout the movement to minimize spinal torque.",
  "commonMistakes": "Rounding the lumbar spine or squatting down instead of hinging at the hips."
}
```
