# Медиазапросы

Media queries применяют стили при определённых условиях: ширина экрана, ориентация, prefers-color-scheme и другие features.

## min-width breakpoints

```css
.container {
  padding: 16px;
}

@media (min-width: 768px) {
  .container {
    padding: 24px;
  }
}

@media (min-width: 1024px) {
  .container {
    padding: 32px;
    max-width: 1200px;
  }
}
```

## orientation и hover

```css
@media (orientation: landscape) and (max-height: 500px) {
  .hero {
    min-height: auto;
  }
}

@media (hover: hover) {
  .card:hover {
    transform: translateY(-4px);
  }
}
```

## prefers-color-scheme и reduced-motion

```css
@media (prefers-color-scheme: dark) {
  :root {
    color-scheme: dark;
  }
}
```

## container queries

Стили от размера контейнера, а не viewport — `@container` и `container-type`.

```css
.card-wrapper {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 120px 1fr;
  }
}
```

Медиазапросы — инструмент адаптивной вёрстки в следующей главе.
