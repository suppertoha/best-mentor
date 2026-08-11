# Адаптивная вёрстка

Адаптивная вёрстка подстраивает макет под разные экраны: fluid grids, гибкие изображения, breakpoints и переключение раскладки.

## Fluid images

```css
img,
video {
  max-width: 100%;
  height: auto;
  display: block;
}
```

## Responsive grid

```css
.products {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 24px;
}
```

## Скрытие и перестановка

```css
@media (max-width: 767px) {
  .sidebar {
    display: none;
  }

  .layout {
    grid-template-columns: 1fr;
  }
}
```

## Практические breakpoints

- Ориентируйся на контент, не на конкретные устройства
- Типичные точки: ~480, 768, 1024, 1280px
- Проверяй реальные телефоны и zoom 200%

Подход mobile-first задаёт стили «снизу вверх» — от малого экрана.
