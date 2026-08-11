# Canvas

Элемент `<canvas>` — растровая область для рисования через JavaScript: графики, игры, обработка изображений. Разметка задаёт только размеры холста.

## Создание canvas

Укажи `width` и `height` в HTML или через JS. Контекст рисования получают методом `getContext('2d')`.

```html
<canvas id="chart" width="400" height="200"></canvas>

<script>
  const canvas = document.getElementById("chart");
  const ctx = canvas.getContext("2d");
</script>
```

## Базовые фигуры

2D-контекст рисует прямоугольники, линии и дуги. Цвет заливки и обводки задаётся до вызова методов.

```html
ctx.fillStyle = "#4a90e2";
ctx.fillRect(20, 20, 120, 60);

ctx.strokeStyle = "#333";
ctx.lineWidth = 2;
ctx.strokeRect(20, 100, 120, 60);
```

## Текст и изображения

На холст можно выводить текст и вставлять загруженные картинки.

```html
ctx.font = "20px sans-serif";
ctx.fillText("Продажи за месяц", 20, 40);

const img = new Image();
img.src = "logo.png";
img.onload = () => ctx.drawImage(img, 200, 20, 80, 80);
```

## Анимация через requestAnimationFrame

Для плавной анимации перерисовывай кадр в цикле `requestAnimationFrame`.

```html
let x = 0;

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillRect(x, 80, 40, 40);
  x = (x + 2) % canvas.width;
  requestAnimationFrame(draw);
}

draw();
```

> Canvas — пиксели. Для векторной графики и иконок чаще удобнее SVG.

Для сложных дашбордов рассмотри готовые библиотеки (Chart.js и аналоги), но понимание 2D context остаётся полезным.
