# Framer Motion TypeScript Errors

**ОШИБКА:**
`Type 'number[]' is not assignable to type 'Easing | Easing[] | undefined'.`
`Type error: Type '{ ... }' is not assignable to type 'Variants'.`

**КОНТЕКСТ:**
Ошибка возникает на этапе сборки проекта (`next build`), когда в анимациях Framer Motion для свойства `ease` передается кастомная кривая Безье в виде массива чисел (например, `ease: [0.76, 0, 0.24, 1]`). 

**ПРИЧИНА:**
По умолчанию TypeScript выводит тип такого массива просто как `number[]` (массив чисел любой длины). Однако, типы Framer Motion ожидают строгий кортеж, состоящий ровно из четырех чисел `[number, number, number, number]`. Из-за этого несовпадения типов TypeScript обрывает процесс компиляции.

**РЕШЕНИЕ:**
Необходимо явно привести массив к требуемому типу кортежа через утверждение (Type Assertion):

**1. Проблема с массивами (кривые Безье):**
Необходимо явно привести массив к требуемому типу кортежа через утверждение (Type Assertion):
```typescript
transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] }
```

**2. Проблема со строковыми литералами:**
Если передать строку `ease: "easeOut"`, TypeScript выведет её тип как общую строку `string`, а Framer Motion ожидает конкретный литеральный тип.
Решение — добавить `as const` к строке:
```typescript
transition: { duration: 0.3, ease: "easeOut" as const }
```

**СВЯЗИ:**
- [[frontend/mobile-menu]] — Компонент, где мы столкнулись с этой ошибкой и успешно её устранили.
