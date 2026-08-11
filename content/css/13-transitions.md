# Transitions

CSS transitions плавно анимируют изменение свойств при смене состояния (hover, focus, class toggle) без keyframes.

## Базовый transition

```css
.btn {
  background: #4f46e5;
  transition: background-color 0.2s ease;
}

.btn:hover {
  background: #4338ca;
}
```

## Несколько свойств

```css
.link {
  color: #4f46e5;
  transform: translateY(0);
  transition:
    color 0.15s ease,
    transform 0.2s ease;
}

.link:hover {
  color: #312e81;
  transform: translateY(-2px);
}
```

## transition-property и timing

Указывай конкретные свойства, а не `all` — так браузер работает эффективнее. easing: ease, ease-in-out, cubic-bezier(...).

```css
.panel {
  opacity: 0;
  transform: translateY(8px);
  transition:
    opacity 0.3s ease-out,
    transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}

.panel.is-open {
  opacity: 1;
  transform: translateY(0);
}
```

## Что анимировать

- opacity, transform — дёшево для GPU
- width, height, margin — могут вызывать reflow
- Для сложных сценариев — @keyframes

Более сложные и цикличные анимации — в главе про animations.
