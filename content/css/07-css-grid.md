# CSS Grid

CSS Grid раскладывает элементы по строкам и столбцам. Он идеален для макетов страницы, карточных сеток и сложных шаблонов с областями.

## Базовая сетка

Задай контейнеру `display: grid`, определи колонки и gap. Дочерние элементы автоматически размещаются в ячейках.

```css
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
```

## grid-template-areas

Области задаются именами — читаемый способ описать макет «шапка / сайдбар / контент / футер».

```css
.layout {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
  grid-template-columns: 240px 1fr;
  gap: 16px;
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.footer { grid-area: footer; }
```

## Выравнивание

`justify-items`, `align-items`, `place-items` выравнивают содержимое ячеек. На контейнере — `justify-content` / `align-content` для всей сетки.

```css
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
  align-items: start;
}
```

## Grid vs Flexbox

- Grid — двумерный: строки и столбцы вместе
- Flexbox — одномерный: строка или колонка
- Для макета страницы часто Grid, для компонентов (navbar, toolbar) — Flex

Размеры ячеек и отступы зависят от единиц измерения — px, %, rem, vw и других.
