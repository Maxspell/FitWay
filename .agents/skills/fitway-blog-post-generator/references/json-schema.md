# JSON Schema — Post Collection (Strapi)

Strapi collection: `posts` | Content-Type: `api::post.post`

## Поля

| Поле         | Тип        | Обязательное | Ограничения                             | В JSON? |
|--------------|------------|:------------:|-----------------------------------------|:-------:|
| `title`      | string     | да           | maxLength: 100, без суффикса `\| FitWay` | да      |
| `slug`       | string     | да           | unique: true, до 60 символов            | да      |
| `content`    | richtext   | да           | Markdown, 1200-1800 слов                | да      |
| `excerpt`    | text       | да           | 120-160 символов, meta description      | да      |
| `author`     | relation   | да           | `{ "id": N }` (объект)                  | да      |
| `reviewedBy` | relation   | да           | `[{ "id": N }]` (массив объектов)       | да      |
| `category`   | relation   | да           | `{ "id": N }`                           | да      |
| `readTime`   | string     | нет          | формат: "X min read"                    | да      |
| `image`      | media      | нет          | загружается отдельно                    | нет     |

---

## Авторы и Рецензенты (E-E-A-T & Peer Review)

В соответствии с медицинскими стандартами YMYL и дорожной картой Google AdSense (Фаза 3), каждая статья **обязана проходить рецензирование**.

| ID | Эксперт | Специализация & Сертификация | Основная роль |
|:---:|---------|------------------------------|---------------|
| **1** | Richard Botich | NASM-CPT, CES (Corrective Exercise) | Автор тренировок / Рецензент упражнений |
| **3** | Sarah Johnson | MS, RD (Registered Dietitian), CDN | Автор питания / Медицинский рецензент (`Medically Reviewed`) |
| **5** | Mike Chen | CSCS (Strength & Conditioning), CISSN | Автор силовых / Научный рецензент (`Scientifically Reviewed`) |

### Правила кросс-рецензирования:
- **`author` и `reviewedBy` никогда не должны совпадать!**
- Для статей о **питании, диетах, добавках и похудении**:
  - Если автор Mike Chen (5) $\rightarrow$ рецензент Sarah Johnson (`[{ "id": 3 }]`).
  - Если автор Sarah Johnson (3) $\rightarrow$ рецензент Mike Chen (`[{ "id": 5 }]`).
- Для статей о **тренировках, гипертрофии, анатомии и технике**:
  - Если автор Mike Chen (5) $\rightarrow$ рецензент Richard Botich (`[{ "id": 1 }]`).
  - Если автор Richard Botich (1) $\rightarrow$ рецензент Mike Chen (`[{ "id": 5 }]`).

---

## ID категорий

| Категория | ID |
|-----------|:--:|
| Nutrition | 1 |
| Training | 3 |
| Weight Loss | 5 |
| Motivation | 8 |
| Lifestyle | 10 |
| Muscle Building | 12 |

---

## Структура `content`

1. **Intro** (1 абзац, hook + проблема, primary keyword в первом абзаце)
2. **H2-секции** (3-6 шт., логическое деление темы)
3. **Таблицы** (минимум 1, максимум 3) внутри H2-секций (GFM-разметка pipe `|---|---|`)
4. **Practical tips** (списки "What to do", конкретные протоколы)
5. **Внутренние ссылки** (2-4 ссылки: 1-2 на тренировки + 1-2 на калькуляторы `/tools/*` из `internal-links.md`)
6. **`## Conclusion`** (краткий итог + следующий практический шаг)
7. **`## Frequently Asked Questions`** (3 вопроса в формате `### Вопрос?`, строго последний блок)

---

## Пример валидного JSON (готовый к импорту)

```json
{
  "title": "How to Lose Weight Without Losing Muscle: A Science-Backed Guide",
  "slug": "lose-weight-without-losing-muscle",
  "content": "Dropping body fat while preserving lean muscle mass is the primary goal of any serious body recomposition phase. When you enter a calorie deficit, your body signals energy preservation pathways that can catabolize muscle tissue unless you provide the exact physiological stimulus and nutritional support required to prevent it.\n\n## 1. Optimize Your Caloric Deficit and Macronutrients\n\nA moderate deficit of 15% to 20% below your Total Daily Energy Expenditure (TDEE) protects metabolic rate while maximizing fat loss. You can calculate your exact targets using the [FitWay Daily Calorie & TDEE Calculator](/tools/calorie-calculator).\n\n| Nutrient | Daily Target | Physiological Purpose |\n|---|---|---|\n| Dietary Protein | 2.0–2.4 g/kg | Muscle protein synthesis & nitrogen retention |\n| Dietary Fats | 0.6–0.8 g/kg | Hormone production & joint health |\n| Carbohydrates | Remainder | Glycogen replenishment & training intensity |\n\nTo fine-tune your specific gram amounts for each meal, utilize the [FitWay Macro Splitter Calculator](/tools/macro-calculator).\n\n## 2. Maintain Heavy Progressive Resistance Training\n\nLifting heavy weights signals to your body that muscle tissue is essential for survival. Follow a structured [Full Body Strength Routine](/workouts/full-body-strength-workout-compound-barbell-dumbbell) 3 to 4 times per week.\n\n## Conclusion\n\nPreserving muscle in a deficit requires three non-negotiables: a moderate deficit, high protein intake (2.0+ g/kg), and heavy compound lifting.\n\n## Frequently Asked Questions\n\n### How much weight should I lose per week to prevent muscle loss?\n\nAim to lose 0.5% to 1.0% of your total body weight per week. Losing faster increases the likelihood of muscle catabolism.\n\n### Should I lift lighter weights with higher reps to cut?\n\nNo. Lifting lighter weights reduces mechanical tension, which signals to the body that dense muscle tissue is no longer needed.\n\n### Can beginners build muscle while losing fat simultaneously?\n\nYes. Untrained individuals, athletes returning from a layoff, or people with higher body fat percentages can experience body recomposition effectively.",
  "excerpt": "Discover science-backed strategies to lose body fat while preserving lean muscle mass through optimal protein intake, controlled deficits, and heavy lifting.",
  "author": { "id": 5 },
  "reviewedBy": [{ "id": 3 }],
  "category": { "id": 5 },
  "readTime": "8 min read"
}
```

---

## Slug & Metadata Rules

- **Без суффикса `| FitWay`** в `title` (Next.js `layout.tsx` добавляет его автоматически через шаблон).
- Только строчные латинские буквы, цифры, дефисы.
- Без стоп-слов (a, an, the, is, are, was, were, to, of, for).
- Максимум 60 символов.
- Уникальность: сверяется с `references/existing-posts.md`.
