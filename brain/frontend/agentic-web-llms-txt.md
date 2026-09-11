# Agentic Web & llms.txt Specification

Стандарт и рекомендации по подготовке сайта для AI-агентов (Agentic Browsing, LLM Crawlers, Google Lighthouse Agentic Web Audit).

## Контекст и проблема
При запуске аудита Chrome Lighthouse в категории **Agentic Browsing** (раздел *Agent Accessibility*) для `https://fitway.best/llms.txt` возникала ошибка:
> **llms.txt does not follow recommendations**
> *Error: File does not appear to contain any links.*

Хотя файл существовал физически в `frontend/public/llms.txt`, парсер Lighthouse не распознавал ссылки, так как пути были указаны простым текстом:
```markdown
- /workouts : A comprehensive workout library...
- /blog : Expert articles and resources...
```

## Требования спецификации llms.txt (llmstxt.org)
Согласно стандарту [llmstxt.org](https://llmstxt.org/) и [Chrome Lighthouse Agentic Browsing Audit](https://developer.chrome.com/docs/lighthouse/agentic-browsing/llms-txt):
1. **H1 Заголовок**: Должен содержать один главный заголовок первого уровня `# Project Name`.
2. **Blockquote**: Краткое описание проекта сразу под H1 (`> Description`).
3. **Markdown-ссылки**: Разделы должны содержать ссылки в стандартном markdown-синтаксисе:
   ```markdown
   - [Anchor Text](https://absolute-url): Описание раздела
   ```
4. **H2 Секции**: Структурирование по разделам (`## Core Pages`, `## Tools & Calculators`, `## Company & Contact`, `## Optional`).
5. **Секция Optional**: Рекомендуется включать ссылку на `sitemap.xml`.

## Итоговая реализация в FitWay
Файл расположен по пути `frontend/public/llms.txt` и доступен по адресу `https://fitway.best/llms.txt`:

```markdown
# FitWay

> FitWay is a modern health and fitness platform providing science-backed workout programs, fitness calculators (BMI, Daily Calorie / TDEE), and expert nutrition and training articles.

## Core Pages

- [Workouts Directory](https://fitway.best/workouts): Comprehensive workout library with programs for weight loss, strength, muscle building, and toning.
- [Fitness & Nutrition Blog](https://fitway.best/blog): Science-backed articles, guides, and tips on exercise, nutrition, recovery, and healthy lifestyle.
- [Authors & Fitness Experts](https://fitway.best/authors): Certified trainers, nutritionists, and health coaches behind FitWay content.

## Tools & Calculators

- [Fitness Calculators](https://fitway.best/tools): Free health tools including Body Mass Index (BMI) and Daily Calorie (TDEE) calculator.

## Company & Contact

- [About FitWay](https://fitway.best/about): Company mission, editorial standards, and fitness philosophy.
- [Contact Us](https://fitway.best/contact): Get in touch with the FitWay editorial and support team.

## Optional

- [Sitemap](https://fitway.best/sitemap.xml): Full XML sitemap indexing all workouts, blog posts, authors, and static pages.
```

## Размещение и отслеживание в Git
- Файл расположен в `frontend/public/llms.txt` и отдаётся сервером Next.js по URL `/llms.txt`.
- **Конфигурация `.gitignore`**: 
  - `!frontend/public/llms.txt` явно добавлен в отслеживаемые Git-файлы, чтобы обновляться автоматически при деплоях.
  - `frontend/public/ads.txt` целенаправленно оставлен в `.gitignore`, чтобы не публиковать рекламный идентификатор AdSense (`pub-xxxx`) в публичном репозитории на GitHub (загружается на сервер вручную).


## Связанные разделы базы знаний
- [[frontend/seo]] — Общая SEO-стратегия и GEO (Generative Engine Optimization).
- [[frontend/authors-system]] — Профили экспертов и авторов, на которые ссылается `llms.txt`.
- [[core/llm-wiki]] — Паттерн ведения базы знаний.

