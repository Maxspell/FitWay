# Trust Signals & Contact Architecture (E-E-A-T & Google AdSense)

> **Статус**: Активно / Внедрено  
> **Дата последнего обновления**: 2026-10-05  
> **Связанные документы**: [[roadmap/adsense-approval-plan]], [[frontend/contact-form]], [[frontend/editorial-policy]], [[frontend/seo]], [[core/llm-wiki]]

---

## 1. Контекст и проблематика модерации (AdSense & YMYL)

При прохождении модерации Google AdSense на предмет «Бесполезный контент / Low value content» и проверке асессорами Google поискового фактора **E-E-A-T** (Experience, Expertise, Authoritativeness, Trustworthiness) в нише здоровья и фитнеса (YMYL):

### Проблема фейковых контактных данных (Misrepresentation)
Использование шаблонных адресов (например, *456 Wellness Ave, New York, NY 10001*) и случайных номеров телефонов с несовпадающими кодами штатов/стран:
1. Идентифицируется автоматическими парсерами и модераторами как признак сайта-дорвея, шаблонной заготовки или сгенерированного PBN.
2. Не имеет подтверждения в базе Google Maps / Google Business.
3. Прямо нарушает правила Google AdSense в части прозрачности владельца ресурса (*Misrepresentation Policy*).

### Решение для цифрового издания (Digital-First Publishing)
Для контентных порталов, блогов и тренировочных платформ **отсутствие физического офиса и телефонной линии является абсолютно легитимной нормой**. Главное требование поисковых систем — **достоверность** (не указывать ложные данные) и **наличие работающих каналов связи**.

---

## 2. Архитектура доменной почты и Mail Redirect (Catch-all)

### Настройка на уровне регистратора/хостинга
- **Провайдер**: adm.tools (Хостинг «Украина»).
- **Режим переадресации**: `Mail redirect` для домена `fitway.best` в режиме **Catch-all** перенаправляет все входящие письма с домена на целевой почтовый ящик команды (`fitway.best777@gmail.com`).
- **Преимущество**: Любой сервисный адрес (`support@fitway.best`, `contact@fitway.best`, `editorial@fitway.best`) гарантированно доставляется без необходимости оплаты отдельных почтовых ящиков.

### Унификация официального адреса поддержки
В качестве единого публичного контактного канала выбран:
```text
support@fitway.best
```
Ранее упоминавшийся в коде адрес `info@fitway.best` полностью заменен во всех компонентах и разметке сайта.

---

## 3. Изменения в компонентах фронтенда

### 1. Футер ([`Footer.tsx`](file:///d:/Users/doomi/ReactProjects/FitWay/frontend/src/components/Footer.tsx))
- **Удалены**: фейковые строки `456 Wellness Ave`, `New York, NY 10001` и телефон `+1 (603) 842-3420`.
- **Внедрены**:
  - Четкий статус проекта: `Digital Fitness & Health Platform`
  - Кликабельная ссылка: `<a href="mailto:support@fitway.best">support@fitway.best</a>` с ховером и подчеркиванием.
  - Регламент ответа: `Support: Mon – Fri (Response within 24h)`.
  - Быстрая ссылка на форму обратной связи: `Send a Message →` (`/contact`).

### 2. Контактная страница ([`ContactClient.tsx`](file:///d:/Users/doomi/ReactProjects/FitWay/frontend/src/app/contact/ContactClient.tsx))
- **Удалены**: карточки физического адреса и телефона.
- **Обновлены карточки инфо-блока**:
  - `Direct Email` (`Mail` icon) — кликабельная ссылка на `mailto:support@fitway.best`.
  - `Support Hours` (`Clock` icon) — рабочие часы `Mon – Fri: 9:00 AM – 6:00 PM (EST)` и гарантия ответа в течение 24 рабочих часов.
  - `Platform Operations` (`Globe` icon) — статус `Online Fitness & Health Publication / Global Editorial Coverage`.
- Очищены неиспользуемые импорты Lucide (`Phone`, `MapPin` заменены на `Globe`).

### 3. Структурированные данные Schema.org ([`contact/page.tsx`](file:///d:/Users/doomi/ReactProjects/FitWay/frontend/src/app/contact/page.tsx))
- Из блока `ContactPage` (`mainEntity.contactPoint`) удалено недостоверное поле `telephone`.
- Структурированные данные приведены к строго валидному виду:
```json
{
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "mainEntity": {
    "@type": "Organization",
    "name": "FitWay",
    "url": "https://fitway.best",
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer support",
      "email": "support@fitway.best",
      "url": "https://fitway.best/contact"
    }
  }
}
```

### 4. Редакционная политика ([`editorial-policy/page.tsx`](file:///d:/Users/doomi/ReactProjects/FitWay/frontend/src/app/editorial-policy/page.tsx))
- В пункте «4. Corrections & Medical Notice» адрес для отправки запросов на исправление фактов и опечаток обновлен на активную ссылку `mailto:support@fitway.best`.

---

## 4. Чеклист валидации Trust Signals для AdSense
- [x] Отсутствуют вымышленные физические адреса и телефонные номера.
- [x] Почта на собственном домене (`support@fitway.best`) является активной ссылкой `mailto:`.
- [x] Настроен почтовый перехватчик (Mail redirect) на реальный Gmail.
- [x] Указан прозрачный SLA (время ответа техподдержки/редакции — до 24 рабочих часов).
- [x] Schema.org `ContactPoint` полностью синхронизирована с видимым контентом.
