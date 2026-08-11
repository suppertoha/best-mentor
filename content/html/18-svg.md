# SVG

SVG (Scalable Vector Graphics) — векторная графика в XML-разметке. Масштабируется без потери качества и доступна для стилизации через CSS.

## Inline SVG в HTML

SVG можно вставить прямо в документ. Атрибут `viewBox` задаёт систему координат.

```html
<svg width="120" height="120" viewBox="0 0 120 120" aria-hidden="true">
  <circle cx="60" cy="60" r="50" fill="#6c5ce7" />
</svg>
```

## Базовые фигуры

Элементы `<rect>`, `<line>`, `<polygon>`, `<path>` описывают геометрию.

```html
<svg viewBox="0 0 200 100" width="200" height="100">
  <rect x="10" y="10" width="80" height="40" rx="8" fill="#dfe6e9" />
  <line x1="110" y1="30" x2="190" y2="30" stroke="#2d3436" stroke-width="4" />
  <polygon points="150,60 170,90 130,90" fill="#00b894" />
</svg>
```

## Стилизация через CSS

Классы и псевдоклассы работают с SVG так же, как с HTML.

```html
<style>
  .icon {
    fill: currentColor;
    transition: transform 0.2s ease;
  }

  .icon:hover {
    transform: scale(1.1);
  }
</style>

<svg class="icon" width="24" height="24" viewBox="0 0 24 24">
  <path d="M12 2l3 7h7l-5.5 4.5 2 7L12 17l-6.5 3.5 2-7L2 9h7z" />
</svg>
```

## SVG как img и symbol

Внешний файл подключают через `<img src="icon.svg">`. Для спрайтов используют `<symbol>` и `<use>`.

```html
<svg style="display: none">
  <symbol id="icon-search" viewBox="0 0 24 24">
    <circle cx="11" cy="11" r="7" />
    <line x1="16" y1="16" x2="21" y2="21" />
  </symbol>
</svg>

<svg width="24" height="24"><use href="#icon-search" /></svg>
```

## Доступность SVG

Декоративную иконку скрывают `aria-hidden="true"`. Информативную сопровождают `<title>` внутри SVG или текстом рядом.

```html
<svg role="img" aria-labelledby="search-title">
  <title id="search-title">Поиск</title>
  <!-- path -->
</svg>
```

SVG идеален для иконок, логотипов и простых иллюстраций. Для фото по-прежнему используй растровые форматы.
