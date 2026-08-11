# Типографика

Типографика в CSS — выбор шрифтов, размеров, межстрочного интервала и оформления текста. Хорошая типографика улучшает читаемость курса и интерфейса.

## font-family и fallback

```css
body {
  font-family: "Inter", system-ui, -apple-system, sans-serif;
}

code,
pre {
  font-family: "JetBrains Mono", ui-monospace, monospace;
}
```

## Размер, вес и интерлиньяж

```css
h1 {
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.2;
}

p {
  font-size: 1rem;
  line-height: 1.6;
}
```

## Подключение веб-шрифтов

```css
@font-face {
  font-family: "Inter";
  src: url("/fonts/inter.woff2") format("woff2");
  font-weight: 400;
  font-display: swap;
}
```

## Дополнительные свойства

letter-spacing, text-transform, text-decoration, text-align. Для длинных текстов курса — max-width около 65–75ch.

```css
.article {
  max-width: 68ch;
  text-align: left;
  hyphens: auto;
}
```

Фон страницы и блоков часто сочетается с типографикой — разберём в следующей главе.
