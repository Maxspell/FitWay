# Contact Form Implementation

## Technical Stack
- **Frontend**: Next.js (App Router), Framer Motion, Lucide React.
- **Backend**: Strapi v5.
- **Communication**: Client $\rightarrow$ Next.js API Route $\rightarrow$ Strapi (via API Token).

## UI/UX Design Pattern
The implementation follows the "High-End Fitness" aesthetic used in the [[NewsletterSection]]:
- **Glassmorphism**: Use of `glass-card` and subtle gradients.
- **State-Driven UI**: Transition between `idle`, `loading`, `success`, and `error` states.
- **Motion**: 
  - Page load staggered reveals.
  - `AnimatePresence` for smooth swapping of form and success messages.
  - Spring animations for success checkmarks.
- **Inputs**: Clean, dark-themed inputs with `#FF8C00` focus rings.

## Архитектура файлов (Server / Client Split)

В Next.js App Router `metadata` и хуки React несовместимы в одном файле.
Контактная страница разделена на два файла:

```
src/app/contact/
├── page.tsx          ← Server Component: экспортирует metadata, рендерит ContactClient
└── ContactClient.tsx ← Client Component: "use client", весь интерактивный UI и хуки
```

> ⚠️ Это **обязательный паттерн** для любой страницы, которая одновременно нуждается в SEO-метаданных и интерактивном UI. Подробнее: [[bugs/build-errors#конфликт-usestate-и-metadata-в-одном-файле-app-router]]

## Integration Flow
The form submits to `/api/contact`, which validates the input and forwards it to the `contact-messages` Strapi collection.
