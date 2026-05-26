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
