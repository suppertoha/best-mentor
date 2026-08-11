# Box model

Каждый элемент в CSS — прямоугольная «коробка». Понимание box model объясняет, откуда берутся отступы, почему блок «вылезает» за родителя и как считать реальную ширину элемента.

## Состав коробки

Элемент состоит из четырёх слоёв: content → padding → border → margin. Свойства `width` и `height` по умолчанию задают размер **контентной** области.

```css
.card {
  width: 300px;
  padding: 16px;
  border: 2px solid #e0e0e0;
  margin: 24px auto;
}
```

## box-sizing

`content-box` (по умолчанию) — padding и border добавляются к width. `border-box` — width включает padding и border. В проектах почти всегда используют border-box глобально.

```css
*,
*::before,
*::after {
  box-sizing: border-box;
}

.box {
  width: 200px;
  padding: 20px;
  border: 4px solid #333;
  /* при border-box реальная ширина = 200px */
}
```

## margin и схлопывание

Вертикальные margin соседних блоков «схлопываются» — берётся больший. Это частая причина «странных» отступов между секциями.

```css
.section {
  margin-bottom: 32px;
}

.section + .section {
  margin-top: 0; /* не добавляет 32 + 32 */
}
```

## overflow

Если контент не помещается, `overflow` управляет поведением: скрыть, прокрутить или показать всё.

```css
.scroll-area {
  max-height: 240px;
  overflow-y: auto;
}

.avatar {
  width: 48px;
  height: 48px;
  overflow: hidden;
  border-radius: 50%;
}
```

| Свойство | Что делает |
| --- | --- |
| `padding` | Внутренний отступ от border до контента |
| `border` | Рамка вокруг padding |
| `margin` | Внешний отступ до соседних элементов |
| `box-sizing` | Как width/height считают padding и border |

> Перед тем как «подкрутить margin», проверь box-sizing и реальную ширину с padding — это решает половину проблем вёрстки.

В следующей главе разберём display и visibility — как элемент участвует в потоке документа и виден ли он пользователю.
