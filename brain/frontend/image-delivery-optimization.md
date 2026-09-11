# Оптимизация доставки изображений (Image Delivery & LCP)

## Контекст и проблема
В отчетах Lighthouse / Chrome Performance Insights было зафиксировано предупреждение **«Improve image delivery (Est savings ~52 KiB)»**:
1. **LCP Hero-изображение (Unsplash)**:
   - Карточка фитнес-тренировки в `HeroVisuals.tsx` грузила внешнюю картинку с `images.unsplash.com` через Next.js image proxy (`_next/image?url=https%3A%2F%2Fimages.unsplash.com%2F...`).
   - Размер отдачи составлял ~83.5 KiB (потенциальная экономия 33.6 KiB). Отсутствовал точный атрибут `sizes`, из-за чего браузер мог запрашивать более тяжелый вариант сетки.
2. **Аватары пользователей (i.pravatar.cc)**:
   - В блоке отзывов/доверия `HeroContent.tsx` 4 аватара загружались через стандартный тег `<img>` напрямую со стороннего домена `https://i.pravatar.cc/150?u=user[1-4]`.
   - Фактический размер файлов был 150x150 px, тогда как в интерфейсе они отображаются в кружках 40x40 px (36x36 px на мобильных).
   - Внешние запросы к `pravatar.cc` создавали лишние DNS/TLS-хендшейки и блокировали отрисовку доверительного блока (First Contentful Paint).

---

## Реализованные изменения

### 1. Локализация и сжатие Hero-изображения
- Изображение скачано в высоком качестве, конвертировано в легковесный WebP и сохранено локально: `frontend/public/images/hero-fitness.webp`.
- В компоненте `frontend/src/components/hero/HeroVisuals.tsx`:
  - Заменен внешний URL Unsplash на локальный путь `/images/hero-fitness.webp`.
  - Добавлен точный атрибут `sizes`:
    ```tsx
    <Image 
      src="/images/hero-fitness.webp"
      alt="Fitness Training"
      fill
      sizes="(max-width: 1024px) 300px, 380px"
      className="object-cover"
      priority
    />
    ```
  - Это позволяет Next.js генерировать отзывчивые изображения строго под габариты родительского контейнера (300px на планшетах/мобильных и 380px на десктопе), избегая отдачи 1000px+ полотна.

### 2. Локализация и оптимизация аватаров пользователей
- Создана директория `frontend/public/images/avatars/`.
- 4 аватара скачаны и оптимизированы в WebP (`user-1.webp` — `user-4.webp`) размером всего 2.4–3.9 KiB каждый.
- В компоненте `frontend/src/components/hero/HeroContent.tsx`:
  - Заменен обычный тег `<img>` на компонент `<Image>` из `next/image`.
  - Указаны точные размеры `width={40}` и `height={40}`:
    ```tsx
    <Image 
      src={`/images/avatars/user-${i}.webp`} 
      alt={`User ${i}`}
      width={40}
      height={40}
      className="object-cover w-full h-full"
    />
    ```

---

## Результаты
- **Устранена зависимость от внешних доменов**: Браузер больше не делает сторонние сетевые запросы к `i.pravatar.cc` и `images.unsplash.com` при загрузке первого экрана (Hero).
- **Снижение веса ресурсов**: Суммарная экономия трафика превысила 50+ KiB.
- **Ускорение LCP и FCP**: Статические изображения кэшируются браузером и Nginx напрямую как `1st party` ресурсы со сжатием и моментальной отдачей.

---

## Ссылки на связанные документы
- [[frontend/performance-third-party-scripts]] — Аудит производительности Lighthouse, нагрузка на main-thread и сторонние скрипты.
- [[frontend/responsive-layout]] — Mobile-first сетки и адаптивность компонентов.
- [[deploy/strapi-media-production]] — Настройка медиа-файлов Strapi и Next Image `remotePatterns`.
- [[index]] — Главный индекс базы знаний FitWay.
