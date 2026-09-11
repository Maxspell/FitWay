# Accessibility (a11y) & WCAG Compliance

Данный документ описывает стандарты и решения проблем доступности (Accessibility / a11y) в интерфейсах FitWay, выявляемых аудитами Lighthouse, axe-core и Deque University.

## 1. Контрастность текста и фона (Color Contrast - WCAG 1.4.3 AA)

### Проблема
Правило WCAG 1.4.3 требует минимального коэффициента контрастности **4.5:1** для стандартного текста и **3.0:1** для крупного текста относительно фона:
- *Lighthouse warning*: `Background and foreground colors do not have a sufficient contrast ratio`.
- Фирменный акцентный цвет бренда `#FF8C00` (DarkOrange) в сочетании с белым текстом (`#FFFFFF`) даёт коэффициент контрастности всего **2.33:1**, что приводит к падению оценки Accessibility.

### Решение
Для интерактивных кнопок и переключателей с белым текстом применяется калиброванный тёмно-оранжевый оттенок **`#C25700`** (и состояние hover **`#A34600`**):
- `#C25700` на белом фоне (`#FFFFFF`): контраст **4.51:1** (удовлетворяет WCAG AA).
- `#A34600` (hover состояние): контраст **6.12:1** (с запасом проходит стандарт).

### Обновлённые компоненты
- `HeroContent.tsx`: кнопка «Start Training» переведена на класс `bg-[#C25700] hover:bg-[#A34600] text-white`.
- `CalculatorPreview.tsx`: активные вкладки «BMI Index» и «Daily Calories» используют `bg-[#C25700] text-white`.
- `CalorieCalculator.tsx`: активные переключатели пола («Male» / «Female») переведены на `bg-[#C25700] text-white`.

### Тёмная тема: контрастность плейсхолдеров и вспомогательного текста
- **Проблема в мобильной версии / PageSpeed Insights**: 
  - Элементы `<p>Enter your details to see your result</p>` и `<p>Fill in all fields to calculate your daily needs</p>` находились в контейнере с классом `text-gray-500` на тёмном фоне карточки (`bg-[#1B2B3B]/50` с блюром и градиентом).
  - Серый цвет `text-gray-500` (#6B7280) на тёмном фоне `#1B2B3B` давал недостаточный коэффициент контрастности (ниже порога 4.5:1), вызывая ошибку axe-core / Google PageSpeed Insights:
    > *Background and foreground colors do not have a sufficient contrast ratio. Low-contrast text is difficult or impossible for many users to read.*
- **Решение**:
  - Цвет текста в пустых состояниях калькуляторов в `BmiCalculator.tsx` и `CalorieCalculator.tsx` заменён с `text-gray-500` на **`text-gray-300`** (#D1D5DB).
  - Коэффициент контрастности `text-gray-300` на тёмном фоне `#1B2B3B` составляет **> 7.5:1** (превышает даже строгий стандарт WCAG AAA 7.0:1).
  - Непрозрачность иконок-индикаторов (`Scale`, `Apple`) увеличена с `opacity-20` до `opacity-40` для комфортного визуального восприятия.

---

## 2. Иерархия уровней заголовков (Heading Order - WCAG 1.3.1)

### Проблема
Правило WCAG 1.3.1 требует последовательного нисходящего порядка заголовков (`h1` ➔ `h2` ➔ `h3` ➔ `h4`):
- *Lighthouse warning*: `Heading elements are not in a sequentially-descending order`.
- Пропуск уровней (например, переход от `<h2>` сразу к `<h4>`) дезориентирует пользователей скринридеров и ассистивных технологий.

### Решение
1. **Секция отзывов (`TestimonialCard.tsx`)**:
   - В `TestimonialsSection.tsx` заголовок секции размечен как `<h2>` (*"Trusted by the FitWay Community"*).
   - В карточке `TestimonialCard.tsx` имя пользователя (`Sarah Jenkins` и др.) было размечено как `<h4>`.
   - Заменено на `<h3>` с сохранением визуальных стилей `text-xl font-bold text-white group-hover:text-[#FF8C00] transition-colors`.
   - Итоговая цепочка: `h1` (Hero) ➔ `h2` (Секция) ➔ `h3` (Имя автора отзыва).
2. **Результаты расчёта в калькуляторах (`BmiCalculator.tsx`, `CalorieCalculator.tsx`)**:
   - Значения индекса массы тела (`bmi`) и суточной калорийности (`calories`) ранее использовали тег `<h4>`, не находясь внутри семантической секции с `<h3>`.
   - Заменены на стилизованные `<div>`, исключая нецелевое засорение структуры заголовков страницы.

---

## Связанные документы
- [[frontend/responsive-layout]] — Адаптивная верстка и доступность на мобильных устройствах.
- [[frontend/seo]] — Семантическая структура разметки и E-E-A-T сигналы.
- [[frontend/performance-third-party-scripts]] — Оптимизация показателей аудита Lighthouse.
- [[core/llm-wiki]] — Архитектура базы знаний FitWay.
