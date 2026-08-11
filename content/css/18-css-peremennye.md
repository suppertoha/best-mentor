# CSS-переменные

Custom properties (CSS variables) — значения с именем `--*`, которые каскадируют и переключаются по контексту (тема, компонент, media).

## Определение и использование

```css
:root {
  --color-primary: #4f46e5;
  --space-md: 16px;
  --radius: 8px;
}

.btn {
  background: var(--color-primary);
  padding: var(--space-md);
  border-radius: var(--radius);
}
```

## Fallback

```css
.sidebar {
  width: var(--sidebar-width, 280px);
}
```

## Тема через переменные

```css
:root {
  --bg: #ffffff;
  --text: #1e293b;
}

[data-theme="dark"] {
  --bg: #0f172a;
  --text: #f1f5f9;
}

body {
  background: var(--bg);
  color: var(--text);
}
```

## Локальные переменные компонента

```css
.card {
  --card-padding: 20px;
  padding: var(--card-padding);
}

.card--compact {
  --card-padding: 12px;
}
```

Переменные часто меняют внутри media queries для адаптива.
