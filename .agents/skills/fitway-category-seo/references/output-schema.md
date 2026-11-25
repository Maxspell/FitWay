# Output Schema — Strapi Category Content

Формат вывода текстовых полей для ручной или автоматической вставки в Strapi Admin (`Content Manager -> Categories`).

---

## 📋 Поля коллекции `category`

| Поле в Strapi | Тип | Ограничения | Назначение в Next.js 14 |
|:---|:---:|:---|:---|
| **`title`** | String | 2–6 слов, Primary Keyword | Отображается как главный **`<h1>`** страницы категории |
| **`intro`** | Text | 40–70 слов, чистый текст (без MD и ссылок) | Рендерится **над** сеткой карточек статей в шапке категории |
| **`text`** | Richtext | 350–600 слов + FAQ, Markdown | Рендерится **под** листингом и пагинацией статей. Содержит H2, списки, FAQ и ссылки |
| **`metaTitle`** | String | До 60 символов, **БЕЗ `\| FitWay`** | Подставляется в тег `<title>` через Next.js шаблон `%s \| FitWay` |
| **`metaDescription`** | Text | 120–160 символов | Подставляется в `<meta name="description">` |

---

## ⚠️ Критические правила для Next.js App Router

1. **Запрет суффикса бренда в `metaTitle`**:
   - `frontend/src/app/layout.tsx` содержит глобальный шаблон:
     ```ts
     title: {
       template: "%s | FitWay",
     }
     ```
   - Если в Strapi указать `metaTitle: "Nutrition Guide | FitWay"`, браузер отрендерит:
     `Nutrition Guide | FitWay | FitWay` (грубая SEO-ошибка задваивания бренда).
   - **Всегда пиши чистый заголовок без бренда!**

2. **Иерархия заголовков в `text`**:
   - Поле `text` **НЕ должно содержать `# H1`**. Заголовок H1 уже выводится фронтендом из поля `title`.
   - В `text` начинай сразу со второго уровня: `##`.

3. **Формат FAQ внутри `text`**:
   - Оформляется в самом конце поля `text` как `## Frequently Asked Questions`, под ним 3-4 вопроса как `### Question?` и прямые ответы абзацами по 40–70 слов.

---

## 📄 Пример эталонного вывода

```markdown
### 1. title
Science-Backed Fitness Nutrition

### 2. intro
Explore evidence-based nutrition strategies designed to fuel intense training, accelerate muscle recovery, and optimize body composition. Our certified dietitians and strength coaches break down macronutrient timing, energy balance, and clinical research into actionable daily protocols.

### 3. text
## Evidence-Based Nutrition: The Foundation of Physical Progress

Achieving meaningful body recomposition requires understanding energy balance, macronutrient distribution, and nutritional timing. Rather than relying on restrictive dietary trends, our editorial team focuses on peer-reviewed research from the International Society of Sports Nutrition (ISSN) and clinical trials.

### Calculating Your Caloric Foundation
Your daily caloric target dictates whether you build muscle, lose fat, or maintain weight. Before adjusting specific nutrients, use our [FitWay Daily Calorie & TDEE Calculator](/tools/calorie-calculator) to determine your baseline maintenance intake and establish a safe 15% to 20% deficit or surplus.

### Macronutrient Distribution and Protein Quality
Protein provides the essential amino acids required for muscle protein synthesis (MPS). Athletes engaged in resistance training require between 1.6 and 2.2 grams of protein per kilogram of body weight daily. You can fine-tune your specific macronutrient breakdown using the [FitWay Macro Splitter Calculator](/tools/macro-calculator). Combine optimal nutrition with structured training by following our [Full Body Strength Routine](/workouts/full-body-strength-workout-compound-barbell-dumbbell).

## Frequently Asked Questions

### What is the most important factor in sports nutrition?
Energy balance is the primary determinant of body weight changes, while total daily protein intake dictates how much lean muscle is preserved or built. Timing and supplements are secondary.

### How much protein can the body absorb in one meal?
The body absorbs almost all protein consumed, but muscle protein synthesis typically peaks with 25 to 40 grams of high-quality, leucine-rich protein per feeding.

### Do I need dietary supplements to build muscle?
No. Whole foods should provide the vast majority of your micronutrients and macronutrients. Supplements like creatine monohydrate and whey protein are convenient tools, not mandatory requirements.

### 4. metaTitle
Evidence-Based Fitness Nutrition & Macro Guides

### 5. metaDescription
Science-backed sports nutrition guides, macronutrient strategies, and meal planning protocols verified by registered dietitians at FitWay.
```

