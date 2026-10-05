# CI/CD Deployment Pipeline on VPS

## Обзор
Деплой проекта FitWay выполняется автоматически при пуше в ветку `main` с помощью GitHub Actions (`.github/workflows/deploy.yml`) через SSH на Ubuntu VPS.

## Архитектура Pipeline
Пайплайн проверяет список измененных файлов в коммите (`git diff --name-only HEAD~1 HEAD`) и выборочно выполняет шаги сборки и перезапуска для фронтенда и бэкенда.

```
git push origin main
       │
       ▼
GitHub Actions (appleboy/ssh-action)
       │
       ▼
/var/www/FitWay
  ├── git fetch & git reset --hard origin/main
  │
  ├── [CHANGED_FILES contains 'frontend/']
  │     ├── npm install (if package.json changed)
  │     ├── npm run build (Next.js SSG/ISR)
  │     └── pm2 restart fitway-frontend
  │
  └── [CHANGED_FILES contains 'backend/']
        ├── npm install (if package.json changed)
        ├── npm run build (Strapi admin & TypeScript compilation)
        └── pm2 restart fitway-backend
```

## Ключевое правило: Обязательная сборка Strapi (`npm run build`) перед перезапуском
В Strapi v5 при любых изменениях схем данных (`schema.json`), контроллеров или сервисов процесс PM2 (`fitway-backend`) запускает скомпилированный код. 

**Проблема:**
Если выполнять `pm2 restart fitway-backend` без предварительного `npm run build`, бэкенд либо стартует со старыми артефактами в кэше, либо падает с ошибками отсутствующих типов или скомпилированных файлов админ-панели.

**Решение в `deploy.yml`:**
```yaml
            # BACKEND
            if echo "$CHANGED_FILES" | grep -q '^backend/'; then

              cd /var/www/FitWay/backend

              if echo "$CHANGED_FILES" | grep -q 'backend/package'; then
                npm install
              fi

              NODE_OPTIONS="--max-old-space-size=2048" npm run build

              pm2 restart fitway-backend
            fi
```

> **Предотвращение OOM:** Флаг `NODE_OPTIONS="--max-old-space-size=2048"` предотвращает падение процесса компиляции Webpack/Vite (`JavaScript heap out of memory`) на VPS, гарантируя создание артефакта админки `dist/build/index.html`. Детали: [[bugs/build-errors]].

## Ручные операции при изменении схемы Strapi
1. **API Token Permissions:** После добавления новых полей/коллекций в схему убедиться, что у токена `NEXT_PUBLIC_STRAPI_API_TOKEN` в админке Strapi (`Settings -> API Tokens`) включены права на чтение (`find`, `findOne`).
2. **Перезапуск с обновлением ENV:** При изменении `.env` использовать:
   ```bash
   pm2 restart fitway-backend --update-env
   ```

## Связанные страницы
- [[backend/strapi-v5-collections]] — Создание коллекций и управление правами в Strapi v5.
- [[frontend/blog-category-content-system]] — Расширение контент-типа Category новыми полями.
- [[deploy/nextjs-build-failure]] — Ошибки сборки и манифестов Next.js.
- [[deploy/strapi-media-production]] — Конфигурация SSL, субдомена Strapi и Next/Image.
