# Позиционирование

Свойство `position` управляет тем, как элемент размещается на странице: в потоке, относительно себя, родителя или viewport.

## static и relative

`static` — по умолчанию. `relative` оставляет элемент в потоке, но позволяет сдвигать через top/left и служит контекстом для absolute-детей.

```css
.badge {
  position: relative;
  top: -8px;
}
```

## absolute

Элемент выходит из потока и позиционируется относительно ближайшего предка с position не static. Часто используется для иконок в кнопках и бейджей.

```css
.card {
  position: relative;
}

.card__badge {
  position: absolute;
  top: 8px;
  right: 8px;
}
```

## fixed и sticky

`fixed` — относительно viewport (шапка, плавающая кнопка). `sticky` — гибрид: в потоке, но «прилипает» при скролле после заданной точки.

```css
.site-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: #fff;
}

.fab {
  position: fixed;
  bottom: 24px;
  right: 24px;
}
```

## z-index и stacking context

Слои накладываются не только по z-index, но по stacking context. Новый контекст создаётся, например, при `position` + `z-index`, `opacity < 1`, `transform`.

```css
.dropdown {
  position: absolute;
  z-index: 10;
}

.modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.5);
}
```

> Перед z-index: 9999 проверь, не создал ли родитель изолированный stacking context.

Для двумерных сеток страницы лучше подходит CSS Grid — следующая тема.
