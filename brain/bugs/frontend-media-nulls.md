# Frontend: Null Pointer on Strapi Media URL

**ОШИБКА:**
`TypeError: Cannot read properties of null (reading 'url')`

**КОНТЕКСТ:**
Ошибка возникает при рендеринге списков элементов (например, через `.map()`), которые используют медиа-файлы из Strapi. В данном случае ошибка проявилась на странице `/workouts`.

**ПРИЧИНА:**
В Strapi данные о медиа-файлах могут быть отсутствовать (`null`), если изображение не было загружено для конкретной записи. Попытка прямого обращения к `workout.image.url` вызывает падение приложения, если `workout.image` равен `null`.

**РЕШЕНИЕ:**
1. Использовать **Optional Chaining** (`?.`) при обращении к свойствам объекта изображения.
2. Предусмотреть **Fallback (запасной вариант)** изображения, чтобы UI не ломался и не выглядел пустым.

**ПРИМЕР ИСПРАВЛЕНИЯ:**

```tsx
// Плохо: упадет, если image === null
<Image src={getStrapiMedia(workout.image.url)} ... />

// Хорошо: безопасно обрабатывает отсутствие данных
<Image 
  src={workout.image?.url ? getStrapiMedia(workout.image.url) : "https://via.placeholder.com/600x400?text=No+Image"} 
  ... 
/>
```

**СВЯЗИ:**
- [[core/llm-wiki]] — паттерн ведения этой базы знаний.
- [[frontend/ui-system]] — общие принципы работы с UI.
