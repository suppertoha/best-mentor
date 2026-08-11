# Mobile-first

Mobile-first — сначала базовые стили для узкого экрана, затем расширение через min-width. Так меньше override и проще поддержка.

## Базовый стиль = мобильный

```css
.nav {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

@media (min-width: 768px) {
  .nav {
    flex-direction: row;
    gap: 24px;
  }
}
```

## Прогрессивное улучшение

Не обрезай функциональность на мобильном — улучшай раскладку на больших экранах. Touch targets минимум ~44×44px.

```css
.btn-icon {
  min-width: 44px;
  min-height: 44px;
}
```

## Типографика mobile-first

```css
h1 {
  font-size: 1.75rem;
}

@media (min-width: 768px) {
  h1 {
    font-size: 2.25rem;
  }
}
```

## Отличие от desktop-first

- Desktop-first: max-width и «урезание» стилей
- Mobile-first: min-width и добавление возможностей
- В индустрии mobile-first — стандарт для новых проектов

> Сначала убедись, что страница работает на 320px, потом добавляй колонки и сайдбар.

Для именования классов в больших проектах часто используют методологию BEM.
