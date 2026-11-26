# FitWay Pinterest API v5 Auto-Publishing Pipeline

Автономный конвейер для публикации пинов в Pinterest (`https://www.pinterest.com/fitway_best/`) по расписанию через официальный **Pinterest API v5** (`POST /v5/pins`, zero dependencies на Node.js 20+).

---

## Структура

- `scripts/pinterest/index.js` — CLI для OAuth 2.0, кэширования досок, валидации очереди и публикации пинов.
- `scripts/pinterest/queue.json` — очередь пинов на публикацию (добавляются через скилл `fitway-social-generator` или вручную).
- `scripts/pinterest/assets/` — сюда складываются готовые `2:3` изображения (`.png` или `.jpg`/`.jpeg`).
- `credentials/pinterest_app.json` *(в `.gitignore`)* — `app_id` и `app_secret`.
- `credentials/pinterest_token.json` *(в `.gitignore`)* — `access_token` и авто-ротируемый `refresh_token`.
- `credentials/pinterest_boards.json` *(в `.gitignore`)* — кэш `board_id` для 5 досок FitWay.

---

## Шаг 1. Настройка приложения в Pinterest Developer Portal

1. Зайди на [developers.pinterest.com](https://developers.pinterest.com/) под бизнес-аккаунтом `fitway_best` и создай приложение (**Create app**).
2. В настройках приложения (**Configure** / **Redirect URIs**) добавь:
   ```text
   http://localhost:8787/callback
   ```
3. Скопируй **App ID** и **App secret** и создай файл `credentials/pinterest_app.json`:
   ```json
   {
     "app_id": "YOUR_PINTEREST_APP_ID",
     "app_secret": "YOUR_PINTEREST_APP_SECRET",
     "redirect_uri": "http://localhost:8787/callback"
   }
   ```

---

## Шаг 2. Одноразовая OAuth 2.0 авторизация

Запусти:
```bash
node scripts/pinterest/index.js --auth
```
1. Открой выведенную ссылку в браузере и подтверди доступ (`boards:read,boards:write,pins:read,pins:write`).
2. Локальный сервер на порту `8787` автоматически поймает `code` и сохранит токены в `credentials/pinterest_token.json`.
   *(Если выполняешь на удаленном сервере без браузера — скопируй `code` из адресной строки после редиректа и выполни `node scripts/pinterest/index.js --code <CODE>`.)*
3. Загрузи ID своих 5 досок:
   ```bash
   node scripts/pinterest/index.js --boards
   ```

---

## Шаг 3. Получение Standard Access (Production)

По умолчанию приложение находится в **Trial Access**: чтение досок на `api.pinterest.com` уже работает, но `POST /v5/pins` разрешен только в Sandbox (`api-sandbox.pinterest.com`).

Чтобы получить **Standard Access** и публиковать пины в продакшн:
1. Включи запись экрана (QuickTime / OBS, ~45-60 сек) и сними единым видео:
   - Запуск OAuth в Sandbox:
     ```bash
     node scripts/pinterest/index.js --auth --sandbox
     ```
     Покажи на экране страницу авторизации Pinterest и нажатие кнопки **Give access / Allow** (сохранение токена в `credentials/pinterest_sandbox_token.json`).
   - Вызов списка досок и создание пина в Sandbox (`--sandbox` автоматически создаст доску в Sandbox, если ее там еще нет, и оставит пин в `queue.json` в статусе `pending` для будущего продакшн-постинга):
     ```bash
     node scripts/pinterest/index.js --publish-next --id protein-muscle-chart-pin6 --sandbox --force
     ```
   - Покажи в терминале успешный ответ (ID созданного Sandbox-пина).
2. Отправь заявку на **Standard Access** в кабинете `developers.pinterest.com`, приложив это видео.
3. После одобрения **ничего переписывать в коде не нужно** — просто запускай без флага `--sandbox` (`node scripts/pinterest/index.js --publish-next`), и уже сохраненный продакшн-токен (`credentials/pinterest_token.json`) сразу начнет публиковать пины на реальные доски.

---

## Шаг 4. Рабочий процесс и расписание (`cron`)

### Проверка очереди перед публикацией
```bash
node scripts/pinterest/index.js --validate
node scripts/pinterest/index.js --publish-next --dry-run
```

### Публикация вручную
```bash
node scripts/pinterest/index.js --publish-next
```

### Автопостинг по расписанию (Ubuntu VPS `crontab -e`)
Публикация 3 раза в неделю (Пн / Ср / Пт в 15:00 UTC — утренний пик аудитории США):
```cron
0 15 * * 1,3,5 cd /var/www/FitWay && /usr/bin/node scripts/pinterest/index.js --publish-next >> /var/log/fitway-pinterest.log 2>&1
```

*(Рекомендуется запускать на VPS или локально, а не в stateless GitHub Actions, потому что Pinterest ротирует `refresh_token` при каждом обновлении, и локальный `credentials/pinterest_token.json` автоматически сохраняет новый токен на диске.)*

---

## Формат элемента в `scripts/pinterest/queue.json`

```json
{
  "version": 1,
  "pins": [
    {
      "id": "ideal-weight-calc-pin6",
      "status": "pending",
      "board": "Fitness Calculators & Tools",
      "title": "Ideal Body Weight Calculator: Devine & Robinson Formulas",
      "description": "Find your healthy weight range based on height and frame using clinical Devine, Robinson, Miller, and Hamwi formulas. Free tool with no sign-up at fitway.best.",
      "alt_text": "Dark-mode infographic comparing ideal body weight formulas by height on FitWay",
      "link": "https://fitway.best/tools/ideal-weight-calculator?utm_source=pinterest&utm_medium=social&utm_campaign=ideal_weight_pin6",
      "image": "ideal-weight-calc-pin6.png",
      "visual_angle": "Calculator Promo + Formula Comparison Card",
      "scheduled_for": "2026-11-30T15:00:00Z"
    }
  ]
}
```
