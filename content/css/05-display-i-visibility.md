# Display и visibility

Свойство `display` определяет тип отображения элемента и как он взаимодействует с соседями. `visibility` скрывает элемент, но оставляет место в потоке.

## block, inline, inline-block

Block занимает всю ширину строки. Inline — только контент, без управления width/height. Inline-block сочетает inline-поток с блочными размерами.

```css
span.tag {
  display: inline-block;
  padding: 4px 8px;
  background: #eef2ff;
  border-radius: 4px;
}
```

## display: none vs visibility: hidden

`display: none` убирает элемент из потока — соседи занимают его место. `visibility: hidden` делает невидимым, но место сохраняется (полезно для анимаций по opacity).

```css
.modal[hidden] {
  display: none;
}

.tooltip {
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.2s;
}

.card:hover .tooltip {
  visibility: visible;
  opacity: 1;
}
```

## display: flex и grid

Современная вёрстка чаще всего начинается с `display: flex` или `display: grid` на контейнере. Эти значения создают flex/grid formatting context.

```css
.toolbar {
  display: flex;
  align-items: center;
  gap: 12px;
}

.gallery {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
```

## Скрытие для доступности

Для текста «только для скринридеров» используй класс visually-hidden, а не `display: none` на важных подсказках форм.

```css
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}
```

Когда элемент нужно вынести из потока или точно позиционировать — переходим к position.
