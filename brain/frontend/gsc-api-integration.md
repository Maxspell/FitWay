# Google Search Console API Integration & Automated Performance Auditing

Документация по прямому подключению FitWay к **Google Search Console API** через сервисный аккаунт Google Cloud, архитектуре CLI-клиента (`scripts/gsc_client.py`), кэшированию аналитики в `brain/data/gsc-latest.json` и интеграции с AI-агентом `seo-adsense-architect`.

---

## 🎯 Цели и предпосылки

1. **Автономность поискового аудита**: Устранить необходимость ручного экспорта таблиц из GSC. AI-агент должен самостоятельно в реальном времени получать свежие данные о кликах, показах, CTR и позициях.
2. **Контроль гейткипера Google AdSense (Traffic Gatekeeper)**: Отслеживать порог готовности к повторной подаче заявки в AdSense (таргет: **15–30+ органических кликов в день** за последние 7 дней) согласно [[roadmap/adsense-approval-plan]].
3. **Автоматический сбор низковисящих плодов (Low-Hanging Fruits)**: Мгновенная фильтрация запросов со средней позицией **10.0–30.0 (Striking Distance)** и высоким числом показов для быстрой оптимизации контента.
4. **Диагностика индексации страниц через URL Inspection API**: Проверка статуса индексирования любого URL сайта без ручного ввода в браузере.

---

## 🔐 Архитектура авторизации (Service Account)

В отличие от стандартного пользовательского OAuth 2.0 с всплывающими окнами браузера и временными refresh-токенами, для AI-агента развернут **Google Cloud Service Account (сервисный аккаунт)**:
- **Закрытый ключ**: JSON-файл в локальной папке `credentials/` (например, `credentials/fitway-514214-b1d64b203620.json`).
- **Безопасность и Git**: Директория `credentials/` и маска `credentials/*` зафиксированы в корневом `.gitignore` для защиты ключей сервисного аккаунта. Динамический кэш `brain/data/*.json` также добавлен в `.gitignore` (с сохранением `.gitkeep`), чтобы исключить засорение истории Git меняющейся статистикой при сохранении постоянного локального доступа для AI-агентов.
- **Разрешения в Search Console**: Email сервисного аккаунта добавлен в **Settings $\rightarrow$ Users and permissions** ресурса `sc-domain:fitway.best` с правами доступа к поисковой аналитике и URL Inspection.

---

## 💻 CLI-клиент: `scripts/gsc_client.py`

Скрипт написан на Python 3 с использованием официальных библиотек `google-api-python-client` и `google-auth`.

### Основные возможности:
1. **Auto-Discovery ключа**: Автоматически сканирует `credentials/` на наличие актуального JSON-ключа без необходимости ручной передачи пути.
2. **Auto-Resolve ресурса**: Автоматически определяет и подключается к доменному свойству `sc-domain:fitway.best`.
3. **Расчет 7-дневной динамики (Velocity)**: Вычисляет среднее число кликов и показов в день за последнюю неделю и проверяет готовность к AdSense.
4. **Сортировка Low-Hanging Fruits**: Фильтрует запросы на позициях 10–30 по убыванию показов.
5. **URL Inspection API**: Флаг `--inspect <url>` вызывает метод `urlInspection.index.inspect` и возвращает статус индексирования, каноникал Googlebot, дату последнего обхода и рефереры.

```bash
# Получить общую сводку за 28 дней и сохранить в brain/data/
python scripts/gsc_client.py

# Анализ за другой временной диапазон (например, 14 или 90 дней)
python scripts/gsc_client.py --days 90

# Инспекция статуса индексации конкретной страницы
python scripts/gsc_client.py --inspect "https://fitway.best/blog/category/nutrition"
```

---

## 📊 Структура кэша: `brain/data/gsc-latest.json`

Скрипт сохраняет структурированный JSON-отчет в директорию базы знаний `brain/data/gsc-latest.json`:

```json
{
  "metadata": {
    "fetched_at": "2026-11-09T15:07:11.817554Z",
    "site_url": "sc-domain:fitway.best",
    "range_days": 28,
    "start_date": "2026-10-10",
    "end_date": "2026-11-07"
  },
  "overview": {
    "total_clicks": 11,
    "total_impressions": 895,
    "average_ctr": 1.23,
    "average_position": 27.5,
    "last_7_days": {
      "clicks": 4,
      "impressions": 248,
      "avg_daily_clicks": 0.5,
      "avg_daily_impressions": 31.0,
      "adsense_gatekeeper_status": "WAITING (0.5/15 daily clicks target)"
    }
  },
  "low_hanging_fruits": [ ... ],
  "top_queries": [ ... ],
  "top_pages": [ ... ],
  "daily_timeline": [ ... ]
}
```

---

## 🤖 Интеграция с агентом `seo-adsense-architect`

Манифест агента [`.agents/agents/seo-adsense-architect.md`] напрямую ссылается на этот инструмент:
- Агент обучен запускать скрипт перед выдачей рекомендаций по контенту.
- При запросе тем для блога агент считывает `low_hanging_fruits` и внедряет фразы (например, *"creatine for professionals"*, *"hiit with resistance bands"*) в статьи по правилам [[frontend/ai-agents-skills-architecture]].
- Агент сверяет метрику `adsense_gatekeeper_status` и блокирует преждевременную подачу заявки на пересмотр AdSense.

---

## 🔗 Связанные документы
- [[roadmap/adsense-approval-plan]] — Дорожная карта AdSense и пороговые требования трафика.
- [[frontend/gsc-crawled-not-indexed-resolution]] — Разбор и устранение статуса «Просканировано, но не проиндексировано» через URL Inspection API.
- [[frontend/seo]] — Общая SEO-стратегия и архитектура поисковой оптимизации FitWay.
- [[frontend/fitness-calculators-pseo]] — pSEO калькуляторы как ключевой фактор роста органического трафика.

