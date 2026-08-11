# Flexbox

**Flexbox** — способ выстроить элементы в ряд или колонку и выровнять их по центру, краям, с равными промежутками.

## Включение

```css
.container {
  display: flex;
}
```

Дочерние элементы становятся **flex-элементами**.

## Направление

```css
.row {
  display: flex;
  flex-direction: row; /* по умолчанию: слева направо */
}

.column {
  display: flex;
  flex-direction: column;
}
```

## Выравнивание

```css
.toolbar {
  display: flex;
  justify-content: space-between; /* по главной оси */
  align-items: center;            /* по поперечной */
  gap: 12px;
}
```

| `justify-content` | Эффект |
| ----------------- | ------ |
| `flex-start` | В начало |
| `center` | По центру |
| `space-between` | Края + равные промежутки |
| `space-around` | Отступы вокруг элементов |

## Размеры flex-элементов

```css
.sidebar {
  flex: 0 0 240px; /* не растёт, не сжимается, база 240px */
}

.content {
  flex: 1; /* занимает оставшееся место */
}
```

## Пример: шапка сайта

```html
<header class="header">
  <a class="logo" href="/">Best Mentor</a>
  <nav class="nav">
    <a href="/sections">Разделы</a>
    <a href="/profile">Профиль</a>
  </nav>
</header>
```

```css
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background: #fff;
  border-bottom: 1px solid #eee;
}

.nav {
  display: flex;
  gap: 16px;
}

.logo {
  font-weight: 600;
  text-decoration: none;
  color: #1a1a2e;
}
```

## Когда использовать

- Навигация, тулбары, кнопки в ряд
- Центрирование блока по вертикали и горизонтали
- Карточки в ряд с `gap`

Для сложных сеток страницы позже пригодится **CSS Grid**, но Flexbox закрывает большинство задач на старте.
