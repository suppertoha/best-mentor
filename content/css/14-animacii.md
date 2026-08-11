# Анимации

Анимации через `@keyframes` и `animation` позволяют описать последовательность состояний и запускать её автоматически или по классу.

## @keyframes

```css
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

## animation свойства

```css
.toast {
  animation: fade-in 0.4s ease-out forwards;
}

.spinner {
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
```

## animation-fill-mode и direction

`forwards` сохраняет финальное состояние. `alternate` — туда-обратно при infinite.

```css
.pulse {
  animation: pulse 1.5s ease-in-out infinite alternate;
}

@keyframes pulse {
  from { transform: scale(1); }
  to { transform: scale(1.05); }
}
```

## prefers-reduced-motion

Уважай настройку пользователя — отключай или упрощай анимации.

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

Состояния элементов (:hover, :focus) — через псевдоклассы.
