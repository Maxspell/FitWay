# Google Search Console: Предупреждение «Вбудований об’єкт <parent_node> не може містити поле itemReviewed»

Документация устранения некритичной ошибки (Warning) в отчете Google Search Console **«Фрагменти відгуків» (Review Snippets)**, вызванной конфликтом иерархии сущностей в JSON-LD микроразметке Schema.org на главной странице сайта (`https://fitway.best/`).

---

## 1. Описание проблемы

В Google Search Console в разделе **«Покращення» -> «Фрагменти відгуків»** было зафиксировано предупреждение:
> **Вбудований об’єкт "<parent_node>" не може містити поле "itemReviewed".** Вилучіть поле "itemReviewed", щоб уникнути конфлікту напрямків. Тип об’єкта "<parent_node>" несумісний із цим об’єктом.

### Симптомы и контекст:
1. Затронуты 10 элементов отзывов на главной странице (`https://fitway.best/`).
2. В качестве названий элементов фигурировали заголовки тренировок (например, *«Advanced Powerlifting Workout: 8 Exercises for Maximum Strength»*, *«Beginner Bodyweight Workout...»*).
3. При ручной проверке в инструменте **Google Rich Results Test** (`/test/rich-results`) тест завершался со статусом «Валидно» (зеленые галочки) без критических ошибок.

---

## 2. Причина возникновения ошибки (Root Cause)

На главной странице ([frontend/src/app/page.tsx](file:///d:/Users/doomi/ReactProjects/FitWay/frontend/src/app/page.tsx)) в блоке микроразметки Schema.org (`@graph`) отзывы динамически подставлялись внутрь родительского узла `@type: "Organization"`:

```json
{
  "@type": "Organization",
  "@id": "https://fitway.best/#organization",
  "name": "FitWay",
  "aggregateRating": { ... },
  "review": [
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "..." },
      "reviewBody": "...",
      "itemReviewed": {
        "@type": "ExercisePlan",
        "name": "Advanced Powerlifting Workout",
        "url": "https://fitway.best/workouts/advanced-powerlifting-workout"
      }
    }
  ]
}
```

### Конфликт стандартов Google Search Console vs Schema.org:
1. **Автоматическое связывание с родителем**: По спецификации Google Review Snippets, когда объект `@type: "Review"` вложен непосредственно в массив `review` родительской сущности (в данном случае `Organization`), **родительский узел автоматически выступает в роли предмета отзыва**.
2. **Конфликт направлений (Directional Conflict)**: Наличие поля `itemReviewed` внутри вложенного отзыва указывает другое направление связи (отзыв на `ExercisePlan`), в то время как родительский узел — `Organization`. Google интерпретирует это как несовместимость типов («Тип об’єкта <parent_node> несумісний із цим об’єктом»).
3. **Почему Rich Results Test не показывал ошибку**: Тест расширенных результатов выполняет синтаксическую проверку JSON-LD типов данных, тогда как поисковый робот Googlebot и отчет Search Console применяют контекстные бизнес-правила отображения поисковых сниппетов (Review Snippet guidelines).

---

## 3. Решение

В файле [frontend/src/app/page.tsx](file:///d:/Users/doomi/ReactProjects/FitWay/frontend/src/app/page.tsx) из маппинга отзывов сущности `Organization` удалено избыточное свойство `itemReviewed`:

```diff
           "review": reviews.map((rev: Review) => ({
             "@type": "Review",
             "author": {
               "@type": "Person",
               "name": rev.name,
             },
             "datePublished": rev.createdAt,
             "reviewRating": {
               "@type": "Rating",
               "ratingValue": rev.rating,
               "bestRating": "5",
               "worstRating": "1",
             },
             "reviewBody": rev.content,
-            ...(rev.workout && {
-              "itemReviewed": {
-                "@type": "ExercisePlan",
-                "name": rev.workout.title,
-                "url": `${siteUrl}/workouts/${rev.workout.slug}`,
-              },
-            }),
           })),
```

### Разделение зон ответственности микроразметки:
- **Главная страница (`/`)**: Отзывы характеризуют платформу/организацию в целом (`Organization` -> `review`), подтверждая общий уровень сервиса и агрегированный рейтинг (`aggregateRating`).
- **Страница конкретной тренировки (`/workouts/[slug]`)**: Отзывы вложены непосредственно в сущность `ExercisePlan` ([frontend/src/app/workouts/[slug]/page.tsx](file:///d:/Users/doomi/ReactProjects/FitWay/frontend/src/app/workouts/%5Bslug%5D/page.tsx)), где они напрямую привязаны к программе тренировки без поля `itemReviewed`.

---

## 4. Верификация

1. **Компиляция**: Запущена локальная сборка `npm run build` в `frontend/`. Сборка завершилась успешно (`exit code 0`).
2. **Google Search Console**: После деплоя на продакшн в отчете «Фрагменти відгуків» запускается валидация по кнопке **«Перевірити виправлення»**.

---

## 5. Связанные разделы базы знаний
- [[frontend/testimonials-reviews-system]] — Архитектура блока отзывов, Swiper Coverflow и исходная схема разметки.
- [[frontend/seo]] — Комплексная стратегия структурированных данных Schema.org и E-E-A-T.
- [[bugs/canonical-tag-inheritance]] — Другие распространенные диагностические проблемы Google Search Console.
