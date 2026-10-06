# Google AdSense & Legal Pages Compliance: Privacy Policy, Consent & Title Template Fix

> **Статус**: Готово к продакшену (Verified & Build Passed)  
> **Дата**: 6 октября 2026 г.  
> **Связанные документы**: [[roadmap/adsense-approval-plan]], [[frontend/seo]], [[frontend/trust-signals-contacts]], [[bugs/canonical-tag-inheritance]]

---

## 1. Контекст и цели

В рамках подготовки FitWay к прохождению модерации Google AdSense («Бесполезный контент / Low value content») был проведен аудит соответствия юридических страниц и механизмов согласия пользователей (User Consent):
1. **Cookie-баннер & CMP**: Проверка необходимости cookie-баннера для прохождения первичной проверки сайта.
2. **Аудит Privacy Policy (`/privacy-policy`)**: Проверка текста на соответствие официальным правилам AdSense Program Policies (требования к раскрытию cookies, сторонних поставщиков рекламы, механизмов отказа и контактных данных).
3. **Устранение дублирования бренда в метаданных**: Исправление ошибки `| FitWay | FitWay` в тегах `<title>` на нескольких страницах сайта.

---

## 2. Требования Google AdSense: Cookie-баннер vs Сертифицированный CMP

- **Первичная модерация сайта (Site Approval)**:
  - Самописный всплывающий cookie-баннер **не является** блокирующим фактором для получения апрува сайта.
  - Однако обязательным условием является наличие легкодоступной страницы **Privacy Policy** (в футере) с явным указанием использования cookies сторонними рекламными сервисами (включая Google).
- **Показ рекламы в регионах EEA / UK / Швейцария (GDPR & IAB TCF v2.2)**:
  - Начиная с 2024 года, показ рекламы AdSense европейским пользователям требует сертифицированной платформы управления согласием (**Google-certified CMP**).
  - **Архитектурное решение FitWay**: Использование встроенного в консоль AdSense бесплатного CMP-модуля («Конфиденциальность и сообщения» -> GDPR). При активации он автоматически внедряется через стандартный скрипт AdSense (`adsbygoogle.js`) и показывает юридически корректный баннер пользователям из ЕС без утяжеления кодовой базы Next.js самописными скриптами.

---

## 3. Модернизация страницы Privacy Policy (`/privacy-policy`)

В файле `frontend/src/app/privacy-policy/page.tsx` были выявлены и устранены следующие несоответствия стандартам AdSense и регуляторике:

### 3.1. Устранение шаблонных ошибок формулировок
- Были исправлены опечатки копипаста документации Google, где обращение шло к «вашим пользователям» (`"to serve ads to your users based on their visit to your site"`), на корректные формулировки от первого лица платформы FitWay (`"to our users based on their visit to our site"`).

### 3.2. Обязательные раскрытия AdSense (Third-Party Vendors & Opt-out)
По правилам AdSense в политике обязательно должны быть раскрыты сторонние поставщики и предоставлены прямые ссылки на отказ:
- Добавлен раздел **4. Google AdSense & Third-Party Advertising** с раскрытием использования cookies (включая DoubleClick cookie).
- Внедрен интерактивный блок ссылок для отказа от персонализированной рекламы:
  - [Google Ads Settings](https://adssettings.google.com)
  - [AboutAds.info Choices](https://www.aboutads.info/choices/)
  - [Network Advertising Initiative Opt-Out](https://optout.networkadvertising.org/)
  - [Your Online Choices (EU/EEA)](https://www.youronlinechoices.com/)

### 3.3. Разделы GDPR & CCPA (Права субъектов данных)
- Добавлен раздел **7. Your Privacy Rights (GDPR & CCPA)**:
  - Право на доступ и переносимость данных (Access & Portability).
  - Право на исправление (Rectification).
  - Право на удаление («Right to be Forgotten»).
  - Право на отзыв согласия и запрет обработки.

### 3.4. Легитимные контактные данные (E-E-A-T & Trust)
- В раздел **9. Contact Us** интегрированы официальный доменный email `support@fitway.best` и ссылка на домен `https://fitway.best`.

### 3.5. Самореферентный Canonical Tag
- В метаданные страницы добавлен обязательный канонический URL:
  ```ts
  alternates: {
    canonical: "https://fitway.best/privacy-policy",
  }
  ```

---

## 4. Устранение дублирования бренда в `<title>` (`| FitWay | FitWay`)

### 4.1. Причина бага
В корневом лейауте `frontend/src/app/layout.tsx` настроен глобальный шаблон заголовков:
```ts
title: {
  default: "AI Fitness Plans & Science-Backed Workouts | FitWay",
  template: "%s | FitWay",
}
```
Next.js автоматически подставляет значение `title` дочерней страницы вместо `%s`. Если в дочерней странице было жестко прописано `title: "Privacy Policy | FitWay"`, итоговый HTML рендерил:
`<title>Privacy Policy | FitWay | FitWay</title>`.

### 4.2. Исправленные страницы
Суффикс `| FitWay` был удален из параметров `title` в пользу шаблонной авто-подстановки:
1. `src/app/privacy-policy/page.tsx`: `title: "Privacy Policy"`
2. `src/app/terms-of-service/page.tsx`: `title: "Terms of Service"`
3. `src/app/editorial-policy/page.tsx`: `title: "Editorial Policy & Quality Standards"` (и в `openGraph.title`)
4. `src/app/workouts/[slug]/page.tsx`: fallback `title: "Workout Not Found"`
5. `src/app/blog/[slug]/page.tsx`: fallback `title: "Blog Post Not Found"`
6. `src/app/authors/[slug]/page.tsx`: fallback `title: "Author Not Found"`

---

## 5. Валидация и сборка

Выполнена локальная тестовая компиляция через `npm run build`:
- Сборка прошла со статусом `exit code 0`.
- Все 19 статических/динамических маршрутов успешно собраны.
- Заголовки страниц отображаются чисто и профессионально как в сниппетах поисковой выдачи, так и во вкладках браузера.
