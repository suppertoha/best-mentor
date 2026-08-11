# Метаданные head

Секция `<head>` не отображается на странице, но сообщает браузеру и поисковикам важные сведения: кодировку, заголовок вкладки, описание и связи с другими ресурсами.

## Минимальный набор head

Кодировка, viewport и title — база для любой современной страницы.

```html
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Курс HTML — Глава о метаданных</title>
</head>
```

## meta description и keywords

`description` часто попадает в сниппет поисковой выдачи. `keywords` сегодня почти не влияет на ранжирование, но встречается в старых проектах.

```html
<meta
  name="description"
  content="Краткое описание страницы для поисковиков и соцсетей."
/>
<meta name="keywords" content="HTML, метаданные, head" />
```

## Подключение стилей и иконок

CSS подключают через `<link rel="stylesheet">`. Favicon — через `<link rel="icon">`.

```html
<link rel="stylesheet" href="/css/main.css" />
<link rel="icon" href="/favicon.ico" sizes="any" />
<link rel="icon" href="/icon.svg" type="image/svg+xml" />
```

## Open Graph для соцсетей

Теги `og:*` управляют превью при расшаривании ссылки в мессенджерах и соцсетях.

```html
<meta property="og:title" content="Курс HTML" />
<meta property="og:description" content="Учимся разметке с нуля" />
<meta property="og:image" content="https://example.com/og-cover.jpg" />
<meta property="og:type" content="website" />
```

## preload и preconnect

Подсказки браузеру ускоряют загрузку критичных ресурсов и установку соединения с CDN.

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossorigin />
```

> Всё, что влияет на SEO, шрифты и иконки, но не видно в body, обычно живёт в head.

Держи head компактным: подключай только нужные ресурсы, иначе первая отрисовка страницы замедлится.
