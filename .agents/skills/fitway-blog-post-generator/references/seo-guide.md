# SEO Guide — FitWay Blog Posts

## Структура контента для Google

### Title (поле `title`)
- 50–100 символов (оптимально 55–65)
- Primary keyword — в начале или середине заголовка
- Числа работают хорошо: "7 Ways to...", "30-Day Plan for..."
- Вопросы: "How to...", "Why Does...", "What Is..."
- Избегай кликбейта — Google Helpful Content Update штрафует за него

### Slug
- Только primary keyword + 1-2 уточняющих слова
- Без дат (теряет актуальность)
- Пример: `best-protein-sources-muscle-gain` (не `top-10-best-protein-sources-for-muscle-gain-in-2025`)

### Excerpt (= meta description)
- 120–160 символов СТРОГО
- Включи: primary keyword, пользу для читателя, мягкий CTA
- Шаблон: "[Что узнает читатель] + [конкретная польза]. [CTA или уточнение]"
- Пример: "Discover the best pre-workout meals for energy and performance. Learn what to eat 1-3 hours before training for maximum results."

### Content Structure

```
H1 (= title, добавляется Strapi/фронтендом автоматически)
├── Intro paragraph (hook + проблема + что получит читатель)
├── H2: [Основная тема 1]
│   ├── текст 150-300 слов
│   └── списки / bold факты
├── H2: [Основная тема 2]
├── H2: [Практические советы / How to Apply]
│   └── нумерованный список
├── Таблица(ы) внутри H2 (минимум 1)
├── H2: Conclusion (summary + CTA)
└── H2: Frequently Asked Questions (последний блок)
    ├── ### Question 1?
    ├── ### Question 2?
    └── ### Question 3?
```

## Keyword Strategy

### Primary Keyword
- 1 keyword на статью
- Частота: в title, первом абзаце, 1 H2, excerpt
- Суммарно 3-5 раз в тексте (не больше)

### LSI Keywords (семантически связанные)
Примеры для FitWay тематик:

**Muscle building:**
- primary: "build muscle fast"
- LSI: muscle hypertrophy, progressive overload, protein intake, resistance training, muscle recovery

**Weight loss:**
- primary: "lose weight fast"
- LSI: calorie deficit, fat burning, metabolism, cardio workout, meal plan

**Workout plans:**
- primary: "beginner workout plan"
- LSI: strength training, exercise routine, gym schedule, fitness goals, workout splits

**Nutrition:**
- primary: "pre-workout meal"
- LSI: macronutrients, carbohydrates, energy boost, meal timing, sports nutrition

## Тональность и стиль

### Ориентиры
- Healthline.com — медицинская точность + доступность
- Greatist.com — молодёжный, практичный
- Men's Health / Women's Health — lifestyle + конкретика

### Что делать
- Факты подкреплять исследованиями: прямые ссылки на PubMed (`https://pubmed.ncbi.nlm.nih.gov/<PMID>/`), PMID проверены поиском, минимум 3 на статью (E-E-A-T для YMYL)
- Личное обращение: "you", "your workout", "your goals"
- Конкретные цифры: "aim for 0.7-1g of protein per pound" (не "eat enough protein")
- Actionable advice: каждый раздел должен давать что-то применимое

### Что НЕ делать (Анти-AI стандарт Humanizer)
- Строго соблюдать `.agents/skills/humanizer/SKILL.md`
- Никаких em dash `—` и en dash `–` (маркер AI-генерации для поисковиков)
- Никаких конструкций "Not X but Y" (`not just about X, it's about Y`, `rather than`)
- Никаких искусственных разогревов: "Let's dive in", "Let's explore", "Here's what you need to know"
- Никаких фраз: "In conclusion", "It's important to note that", "This article will explore", "At its core", "That is the real win"
- Никаких AI-клише: `delve`, `crucial`, `pivotal`, `testament`, `tapestry`, `landscape`, `robust`, `underscore`, `meticulous`, `game-changer`
- Никаких медицинских гарантий: "will cure", "guaranteed results", "lose 10kg in a week"
- Никакого padding и навязчивых триад: каждый абзац должен нести новый факт или прикладную рекомендацию
- Никакого декоративного bolding на каждом буллете в списках

## CTA в Conclusion

Варианты для FitWay:
- "Start your fitness journey with the FitWay app today."
- "Try the [relevant] workout plan in the FitWay program."
- "Track your progress with FitWay and see results faster."
- "Download the FitWay app and get your personalized plan."

## Таблицы

- Минимум 1 таблица на статью, максимум 3
- Подходящие форматы: сравнение вариантов, нормы и диапазоны, схема трекинга, "что думаешь vs реальность"
- 3-6 строк, до 4 колонок, понятные заголовки
- Таблицы дают шанс на featured snippet: делай заголовок колонки близким к запросу

## FAQ (последний блок статьи)

- `## Frequently Asked Questions` после Conclusion, 3 вопроса `###`
- Вопросы по логике People Also Ask: формулировки как в реальных поисковых запросах, разные интенты (how long, can I, does X cause Y)
- Ответ 60-120 слов, первое предложение сразу отвечает на вопрос
- FAQ рендерится как H2/H3 с краткими ответами: Google убрал FAQ rich snippets, но блок помогает AI Overviews и покрытию long-tail запросов
- Не дублируй Conclusion, без CTA

## Внутренние ссылки

- Максимум 2-3 ссылки в теле статьи
- Без дублей одного URL на странице
- Анкор по смыслу совпадает со страницей назначения
- Ссылки на фильтры категорий (`?category=...`) не использовать
