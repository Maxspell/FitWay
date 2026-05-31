# Strapi Build Errors

## JavaScript Heap Out of Memory (VPS)

**ОШИБКА:**
При сборке админки Strapi (`npm run build`) на VPS с ограниченным объемом оперативной памяти может возникнуть ошибка нехватки памяти (OOM - Out of Memory):
```text
FATAL ERROR: Ineffective mark-compacts near heap limit Allocation failed - JavaScript heap out of memory
```

**ПРИЧИНА:**
Процесс сборки Webpack (который использует Strapi под капотом) потребляет больше оперативной памяти, чем разрешено Node.js по умолчанию, или больше, чем физически доступно на сервере.

**РЕШЕНИЕ:**
Увеличить лимит памяти для процесса Node.js с помощью переменной окружения `NODE_OPTIONS` и флага `--max-old-space-size` (значение указывается в мегабайтах).

```bash
NODE_ENV=production NODE_OPTIONS="--max-old-space-size=2048" npm run build
```
*(В данном примере выделяется 2 ГБ памяти. Если на сервере 1 ГБ, можно попробовать `1024` и добавить swap-файл).*

---

## Конфликт `useState` и `metadata` в одном файле (App Router)

**ОШИБКА:**
```text
Error: You're importing a component that needs useState.
It only works in a Client Component but none of its parents
are marked with "use client"
```

**КОНТЕКСТ:**
Ошибка возникает в Next.js 14+ (App Router) когда один файл `page.tsx` одновременно:
- Экспортирует `metadata` (или `generateMetadata`) → требует **Server Component**
- Использует хуки (`useState`, `useEffect`) → требует **Client Component** (`"use client"`)

Эти два требования несовместимы в одном файле.

**РЕШЕНИЕ:**
Разделить файл на два: Server Component-обёртку и Client Component с UI.

```
src/app/contact/
├── page.tsx           ← Server Component: только metadata + импорт клиентского компонента
└── ContactClient.tsx  ← Client Component: "use client" + всё интерактивное UI
```

`page.tsx` (Server Component):
```tsx
import { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact",
  description: "...",
};

export default function ContactPage() {
  return <ContactClient />;
}
```

`ContactClient.tsx` (Client Component):
```tsx
"use client";

import { useState } from "react";
// ... весь интерактивный UI
```

**ПРАВИЛО:**
> В Next.js App Router `metadata` и хуки React **никогда** не могут быть в одном файле.
> Всегда выносить интерактивные части в отдельный `*Client.tsx`.

**СВЯЗИ:**
- [[frontend/contact-form]] — конкретная реализация контактной формы по этому паттерну.
- [[deploy/nextjs-build-failure]] — другие ошибки сборки Next.js на VPS.
