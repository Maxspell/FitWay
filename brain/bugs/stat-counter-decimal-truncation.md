# StatCounter Decimal Truncation & Spring Overshoot in Framer Motion

**ОШИБКА:**
1. Некорректное отображение дробных метрик: значение рейтинга `4.9` отображалось на экране как `4/5` вместо `4.9/5`.
2. Риск визуального выброса (overshoot): при пружинной анимации `useSpring` в Framer Motion промежуточные значения могли на мгновение превышать максимальный рейтинг (например, `5.05/5` или `5.1/5`) до стабилизации пружины.

**КОНТЕКСТ:**
Компонент счетчика `StatCounter.tsx` ([frontend/src/components/sections/testimonials/StatCounter.tsx](file:///d:/Users/doomi/ReactProjects/FitWay/frontend/src/components/sections/testimonials/StatCounter.tsx)), используемый в блоке социальной статистики `TestimonialsSection.tsx` на главной странице.

**ПРИЧИНА:**
1. **Срез дробной части через `Math.floor`**:
   Хук `useTransform` форматировал текущее значение анимации через `Math.floor(latest).toLocaleString()`:
   ```typescript
   // БЫЛО:
   const displayValue = useTransform(springValue, (latest) => 
     Math.floor(latest).toLocaleString()
   );
   ```
   Для целых чисел (`10`, `500`) это работало, но для среднего рейтинга `4.9` функция `Math.floor(4.9)` всегда возвращала целое число `4`.
2. **Колебания физики пружины (Spring Physics Oscillation)**:
   При настройках `stiffness: 100, damping: 30` физика пружины по умолчанию может давать микроколебания вокруг конечной точки. Без клампинга это приводит к кратковременному показу нереалистичных цифр (например, рейтинг выше 5 баллов).

**РЕШЕНИЕ:**
1. В интерфейс `StatCounterProps` добавлен опциональный параметр `decimals?: number`:
   ```typescript
   interface StatCounterProps {
     value: number;
     label: string;
     suffix?: string;
     description: string;
     decimals?: number;
   }
   ```
2. В `useTransform` внедрен двухсторонний клампинг от `0` до `value`, а также форматирование через `toFixed(decimals)` при `decimals > 0`:
   ```typescript
   // СТАЛО:
   const displayValue = useTransform(springValue, (latest) => {
     const clamped = Math.min(Math.max(latest, 0), value);
     return decimals > 0 ? clamped.toFixed(decimals) : Math.floor(clamped).toLocaleString();
   });
   ```
   - Для рейтинга передаётся `decimals={1}`, что гарантирует плавное нарастание от `0.0` до `4.9` без превышения 5.0.
   - Для целых чисел (`decimals = 0`) сохраняется целочисленное представление с разделителями тысяч.

**СВЯЗИ:**
- [[frontend/testimonials-reviews-system]] — Архитектура блока отзывов и социальной статистики.
- [[frontend/seo]] — Синхронизация рейтинга UI с `AggregateRating` в Schema.org.
- [[bugs/framer-motion-animation-flicker]] — Особенности работы с анимациями Framer Motion в проекте.
