# Scroll-To-Top Component with Circular Progress

Интерактивная кнопка возврата наверх со встроенным динамическим круговым индикатором прогресса прокрутки страницы.

## Overview
- **Component Path**: `frontend/src/components/common/ScrollToTop.tsx`
- **Layout Integration**: Подключена глобально в `frontend/src/app/layout.tsx` для автоматического отображения на всех страницах сайта.
- **Type**: Client Component (`"use client"`).

## Features & UX
1. **Dynamic Visibility**:
   - Кнопка полностью скрыта (`opacity-0 translate-y-4 pointer-events-none scale-90`), когда пользователь находится вверху страницы (порог `scrollTop <= 100px`).
   - Плавно всплывает с масштабированием (`opacity-100 translate-y-0 pointer-events-auto scale-100`) при начале скролла вниз.
2. **Circular Progress Indicator**:
   - Построена на базе векторного SVG-кольца (`<circle>` радиусом 20px, длина окружности $2 \pi r \approx 125.66$).
   - Вычисляет точный процент прокрутки: `(scrollTop / (scrollHeight - clientHeight)) * 100`.
   - Заполняется динамическим смещением `strokeDashoffset` с плавной CSS-анимацией перехода `transition-[stroke-dashoffset] duration-150 ease-out`.
   - Фоновая дорожка круга: полупрозрачная белая `text-white/15`.
   - Активный индикатор прогресса: акцентный оранжевый цвет дизайн-системы FitWay (`text-[#FF8C00]`).
3. **Smooth Scroll Action**:
   - При клике инициирует нативный плавный переход `window.scrollTo({ top: 0, behavior: "smooth" })`.
4. **Design & Micro-interactions**:
   - Темная стеклянная подложка (`bg-[#1e232a]/90 backdrop-blur-md hover:bg-[#252b34]`).
   - Глубокая тень `shadow-xl shadow-black/40` и закругление `rounded-full`.
   - Иконка `ArrowUp` из `lucide-react` с микроанимацией смещения вверх при ховере (`group-hover:-translate-y-0.5`).
   - Фокусное кольцо доступности `focus-visible:ring-2 focus-visible:ring-[#FF8C00]`.

## Layout Integration
Компонент смонтирован на уровне корневого слоя приложения [layout.tsx](file:///d:/Users/doomi/ReactProjects/FitWay/frontend/src/app/layout.tsx) перед закрывающим тегом `</body>`:

```tsx
import ScrollToTop from "@/components/common/ScrollToTop";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow relative">{children}</main>
          <Footer />
        </div>
        <ScrollToTop />
        {/* scripts, analytics, ld+json */}
      </body>
    </html>
  );
}
```

## Related Links
- [[frontend/responsive-layout]] — Общая адаптивность и поведение макета.
- [[frontend/accessibility-wcag-fixes]] — Цветовая контрастность и доступность элементов интерфейса.
- [[frontend/breadcrumbs]] — Глобальные компоненты навигации в корневом лейауте.
