# Тени и фильтры

`box-shadow` и `text-shadow` имитируют освещение. `filter` применяет графические эффекты: blur, яркость, контраст.

## box-shadow

```css
.card {
  box-shadow:
    0 1px 3px rgb(0 0 0 / 0.1),
    0 8px 24px rgb(0 0 0 / 0.08);
}

.card:hover {
  box-shadow: 0 12px 32px rgb(0 0 0 / 0.12);
}
```

## text-shadow

```css
.hero-title {
  color: #fff;
  text-shadow: 0 2px 8px rgb(0 0 0 / 0.35);
}
```

## filter

```css
.avatar--disabled {
  filter: grayscale(1) opacity(0.6);
}

.modal-backdrop {
  backdrop-filter: blur(4px);
}
```

## Производительность

Тени и blur на больших областях и при анимации могут влиять на FPS. Проверяй в DevTools Performance.

- Предпочитай transform и opacity для анимаций
- backdrop-filter тяжелее обычного filter

Плавные изменения свойств — через transitions.
