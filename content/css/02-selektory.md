# Селекторы и свойства

Селектор говорит браузеру, **к каким элементам** применить стили.

## Типы селекторов

**По тегу:**

```css
p {
  line-height: 1.6;
}
```

**По классу** (точка):

```css
.card {
  padding: 16px;
  border-radius: 8px;
  background: #fff;
}
```

```html
<div class="card">Контент карточки</div>
```

**По id** (решётка, один на странице):

```css
#header {
  height: 64px;
}
```

**По атрибуту:**

```css
input[type="email"] {
  border-color: #6c63ff;
}
```

## Комбинаторы

```css
/* Потомок: nav внутри header на любом уровне */
header nav a {
  text-decoration: none;
}

/* Дочерний: прямой ребёнок */
.menu > li {
  list-style: none;
}

/* Сосед */
h2 + p {
  margin-top: 0;
}
```

## Псевдоклассы

```css
a:hover {
  color: #6c63ff;
}

button:focus {
  outline: 2px solid #6c63ff;
}

li:first-child {
  font-weight: 600;
}
```

## Частые свойства

```css
.text {
  /* Текст */
  color: #333;
  font-size: 16px;
  font-weight: 500;
  text-align: center;

  /* Блок */
  width: 100%;
  padding: 12px 16px;
  margin: 0 auto;
  background: #f5f5f7;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
}
```

| Группа | Свойства |
| ------ | -------- |
| Текст | `color`, `font-size`, `font-weight`, `line-height` |
| Блок | `width`, `height`, `padding`, `margin` |
| Рамка | `border`, `border-radius`, `box-shadow` |
| Фон | `background`, `background-color` |

## Box model

Каждый блок = content + padding + border + margin.

```css
.box {
  box-sizing: border-box; /* padding и border входят в width */
  width: 200px;
  padding: 16px;
  border: 2px solid #ccc;
  margin: 12px;
}
```

> `box-sizing: border-box` — хорошая привычка для предсказуемой вёрстки.

## Практика

Сверстай карточку с классом `.lesson-card`: белый фон, скругление, тень, заголовок и абзац с отступами.
