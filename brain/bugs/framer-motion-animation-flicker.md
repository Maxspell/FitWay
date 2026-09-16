# Framer Motion Animation Flickering & Conflict with Tailwind Transitions

## Симптомы проблемы

После появления анимированных блоков при скролле (или по окончании анимации входа) карточки или секции внезапно дергаются, мигают (flicker / jitter), либо анимация резко сбрасывается и перезапускается при легком скролле страницы.

Проблема наблюдалась в компонентах:
- `frontend/src/components/sections/WhyFitWay.tsx`
- `frontend/src/components/sections/ExpertsSection.tsx`

---

## Причины возникновения

### 1. Конкуренция Framer Motion Transform и Tailwind `transition-all`
Самая частая и коварная причина:
```tsx
// ❌ АНТИПАТТЕРН: transition-all на motion.div
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  className="p-8 rounded-3xl bg-white/5 hover:border-white/20 transition-all group"
>
```
* **Механика сбоя:** Framer Motion управляет положением элемента через инлайн-стили `style="transform: translateY(...) opacity: ..."`, пересчитывая их на каждом кадре `requestAnimationFrame`.
* Браузерный CSS-переход `transition: all` от Tailwind перехватывает изменение свойства `transform` и пытается интерполировать его независимо от Framer Motion.
* Когда анимация Framer Motion завершается и `transform` фиксируется в `none` / `matrix(...)`, CSS-transition пытается довести его задержкой, вызывая повторное дергание, скачок позиции или мерцание (feedback loop).

### 2. Отсутствие `viewport={{ once: true }}`
Если в `whileInView` не указано `{ once: true }`, Framer Motion отслеживает видимость элемента при каждом пикселе скролла. На границе экрана элемент может выходить из порога видимости на долю миллисекунды, из-за чего анимация непрерывно триггерится снова и снова.

### 3. Наложение размытий (GPU Backdrop Filter / Layer Repaint Glitch)
Фоновые декоративные элементы с огромным `blur-[150px]` без явного выноса в отдельный слой композиции (`-z-10`, `pointer-events-none`) заставляют браузер перерисовывать соседние карточки с `backdrop-blur` и прозрачностями при окончании анимации.

### 4. Нестабильные React Keys
Использование `key={index}` вместо уникального идентификатора (`key={pillar.title}` или `key={author.documentId}`) приводит к тому, что при ре-рендерах дерева React переиспользует DOM-ноды с несинхронизированным внутренним состоянием анимации.

---

## Решение и канонический паттерн

Разделение ответственности:
1. **Внешний `<motion.div>`** отвечает **только** за анимацию появления (`framer-motion`). Никаких `transition-all` или CSS-переходов трансформации на этом элементе быть не должно!
2. **Внутренний `<div>`** отвечает за ховеры, фон, рамки и цвета через CSS (`transition-colors duration-300`).
3. Обязательно указывается `viewport={{ once: true }}`.
4. Фоновые декорации изолируются с помощью `-z-10 pointer-events-none`.

### Пример корректной реализации:

```tsx
// ✅ ПРАВИЛЬНЫЙ ПАТТЕРН:
{items.map((item, index) => (
  <motion.div
    key={item.id}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    viewport={{ once: true }}
    className="group relative h-full"
  >
    {/* Внутренний контейнер с CSS transition только для безопасных свойств (цвета, фон) */}
    <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors duration-300 h-full">
      <div className="w-14 h-14 rounded-2xl group-hover:scale-110 transition-transform duration-300">
        <item.icon className="h-7 w-7" />
      </div>
      <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
      <p className="text-gray-400">{item.description}</p>
    </div>
  </motion.div>
))}
```

---

## Связанные страницы
- [[bugs/framer-motion-type-errors]] — ошибки типизации easing във Framer Motion.
- [[frontend/responsive-layout]] — правила мобильных отступов и сеток секций.
- [[bugs/nextjs-dev-build-conflict]] — конфликт фоновой сборки `npm run build` с запущенным `npm run dev`.
