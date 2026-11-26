# FitWay Pinterest SEO & Visual Guide

Pinterest работает для FitWay как **визуальный поисковик** и главный социальный источник **Tier-1 (US/UK/CA)** реферального трафика с высокой вовлеченностью.

---

## 1. Официальная карта досок FitWay (Pinterest Boards)

Актуальный список сверен с живым профилем `https://www.pinterest.com/fitway_best/` (2026-11-26). Используй **строго эти 5 точных названий досок** (не придумывай несуществующие):

| Board Name (точное) | Текущие пины | Тематика и какие URL туда вести |
|---|:-:|---|
| **Muscle Building & Hypertrophy** | 1 | Гипертрофия, сплиты (Upper/Lower, PPL), прогрессивная перегрузка, силовые тренировки и гантели |
| **Fitness Calculators & Tools** | 2 | Прямые пины на `/tools/*` (TDEE, Macro, 1RM, Ideal Weight, BMI) |
| **Stretching & Mobility Routines** | 1 | Растяжка, мобильность бедер/спины/голеностопа, восстановление, гибкость |
| **Calorie Deficit & Fat Loss** | 1 | Похудение, дефицит калорий, кардио vs силовые, висцеральный жир, рекомпозиция, `/tools/calorie-calculator` |
| **Nutrition & Macro Tracking** | **0 (приоритет!)** | Белок, БЖУ, meal prep, креатин, магний, витамин D, омега-3, пред/пост-тренировочное питание |

> **Примечание:** если появится много домашних тренировок без инвентаря или HIIT для новичков, можно предложить пользователю создать 6-ю доску (например, *Home Workouts & Beginner Routines*), но по умолчанию распределяй пины по 5 существующим доскам выше.

---

## 2. Проверка уникальности и UTM-разметка

- Перед генерацией **обязательно открой `references/existing-pins.md`** и проверь, что именно уже опубликовано на этом URL и на этой доске.
- Для каждого нового пина формируй Target URL с UTM-меткой по стандарту профиля:
  `https://fitway.best/<path>?utm_source=pinterest&utm_medium=social&utm_campaign=<topic_pinN>`
  *(имя кампании бери в lowercase snake_case, например `creatine_dosage_pin6` или `ideal_weight_calc_pin7`).*

---

## 3. Пять проверенных углов для одного URL (Pin Angles)

Никогда не делай одинаковые пины под одну статью и не дублируй формат из `references/existing-pins.md`. Разводи их по поисковому интенту:

1. **Data / Comparison Infographic**
   - Хук: сравнение двух методов, формул или таблица норм (например, *Mifflin-St Jeor vs Harris-Benedict*, *Cardio vs Lifting for Fat Loss*).
   - Визуал: 2 колонки `#243447` с оранжевыми акцентами `#FF8C00` и цифрами.
2. **Step-by-Step Checklist / Blueprint**
   - Хук: *5-Step...*, *Beginner Blueprint...*, *How to Fix...*
   - Визуал: пронумерованные шаги `01`-`05` в оранжевых бейджах.
3. **Myth vs Science (Contrarian Search)**
   - Хук: популярное заблуждение vs научный факт (например, *Why Scale Weight Spikes in Week 1 of a Deficit*).
   - Визуал: блок «Common Myth» vs «What Research Shows».
4. **Workout / Exercise Visual Plan**
   - Хук: готовая схема тренировки (упражнения, подходы, время, уровень).
   - Визуал: список упражнений с иконками или editorial dark-mode фото + компактная плашка параметров.
5. **Calculator / Tool Promo Pin**
   - Хук: *Calculate Your Exact... Free Tool*, *Stop Guessing Your Macros*.
   - Визуал: макет dark-mode UI-карточки калькулятора с результатом и CTA-плашкой `#C25700`.

---

## 4. SEO-правила текстов Pinterest

- **Title (40-100 символов):** главный поисковый запрос в первых 40 символах. Пиши ясно и конкретно, без кликбейта (*«How to Calculate a Calorie Deficit Without Losing Muscle»*, а не *«You Won't Believe This Fat Loss Trick»*).
- **Description (250-500 символов):**
  - Первые **50 символов** видны в ленте до «More» — вставляй туда главный ключ и выгоду.
  - Впиши 2-3 смежных long-tail ключа естественными предложениями.
  - Заканчивай четким CTA: *«Save this guide and calculate your numbers free at fitway.best.»*
  - Хэштеги: Pinterest снизил их вес — используй **0-3** точных хэштега в конце или обходись без них.
- **Alt Text (80-150 символов):** опиши, что нарисовано на пине (график, чек-лист, упражнение), естественно включив ключевой запрос.
- **On-Image Text (на самом пине):**
  - Максимум **6-10 слов** в главном заголовке (текст должен читаться с экрана смартфона в сетке 2 колонки).
  - Потренируй читаемость: крупные цифры, 3-4 коротких пункта, **без em dash (`—`)**.

---

## 5. Шаблон промпта для визуала 2:3 (`1000x1500`)

Используй этот каркас при генерации промптов (вставляй конкретные заголовки и цифры из статьи):

```text
Vertical 2:3 Pinterest infographic poster (1000x1500), dark-mode sports-science UI design matching FitWay aesthetic. Deep navy slate background (#1B2B3B) with elevated dark slate cards (#243447), subtle thin border rgba(255,255,255,0.1), rounded 24px corners. Vibrant orange (#FF8C00) accent badges, icons, and progress bars, solid #C25700 CTA pill badge at bottom. Crisp white (#FFFFFF) bold sans-serif headline at top reading "[EXACT SHORT HOOK]". Structured modular layout showing [CONCRETE VISUAL BLOCKS: e.g., 4 numbered step cards / 2-column comparison chart / macro split bars] with readable labels in #FFFFFF and #D1D5DB: "[LABEL 1]", "[LABEL 2]", "[LABEL 3]". Bottom orange pill reading "[SHORT CTA, e.g., Free Calculator at FitWay.best]". High contrast, uncluttered, modern health-tech dashboard look like Whoop or Apple Fitness, no white background, no watermarks, crisp legible typography. --ar 2:3
```

Если нужен фотореалистичный пин с упражнением или атлетом (вместо чистой инфографики):
```text
Vertical 2:3 editorial fitness Pinterest pin (1000x1500), documentary athletic photography in dark navy slate (#1B2B3B) studio lighting with subtle warm amber rim light (#FF8C00). [ATHLETE ACTION / EXERCISE FORM], authentic skin texture, anatomically accurate, dark uncluttered upper and lower gradient zones (#1B2B3B) for text legibility. Top bold white (#FFFFFF) sans-serif headline reading "[EXACT HOOK]". Bottom dark slate glass card (#243447) with vibrant orange (#FF8C00) accent line and crisp white text "[3-4 BULLET METRICS OR CTA]". Clean editorial layout, high contrast, no clutter. --ar 2:3
```
