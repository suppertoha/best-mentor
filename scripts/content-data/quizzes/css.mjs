import { q, quiz } from "./helpers.mjs";

export default {
  "css-introduction": quiz([
    q(
      "Что такое CSS?",
      "Язык стилей для оформления HTML",
      ["Язык программирования для логики на сервере", "База данных", "Протокол передачи файлов"],
    ),
    q(
      "Как чаще всего подключают CSS к HTML?",
      "Через <link rel=\"stylesheet\">",
      ["Через <script>", "Через <meta>", "Через <canvas>"],
    ),
  ]),
  "css-selectors": quiz([
    q(
      "Какой селектор выберет элемент с class=\"btn\"?",
      ".btn",
      ["#btn", "btn", "*btn"],
    ),
    q(
      "Что делает селектор p a?",
      "Выбирает ссылку внутри абзаца",
      ["Выбирает все абзацы и ссылки отдельно", "Выбирает только прямого ребёнка", "Выбирает id a"],
    ),
  ]),
  "css-flexbox": quiz([
    q(
      "Какое свойство включает flex-контейнер?",
      "display: flex",
      ["position: flex", "flex: container", "layout: flex"],
    ),
    q(
      "Что делает justify-content?",
      "Выравнивает элементы по главной оси",
      ["Меняет цвет фона", "Задаёт шрифт", "Скрывает overflow"],
    ),
  ]),
  "css-box-model": quiz([
    q(
      "Из чего состоит box model?",
      "content, padding, border, margin",
      ["width, height, color, font", "header, body, footer", "flex, grid, block"],
    ),
    q(
      "Что добавляет padding?",
      "Внутренний отступ между контентом и границей",
      ["Внешний отступ между соседними блоками", "Толщину линии текста", "Тень элемента"],
    ),
  ]),
  "css-display-and-visibility": quiz([
    q(
      "Чем display: none отличается от visibility: hidden?",
      "none убирает элемент из потока, hidden оставляет место",
      ["Ничем", "hidden удаляет из DOM", "none делает элемент прозрачным, но кликабельным"],
    ),
  ]),
  "css-positioning": quiz([
    q(
      "Какое значение position вырывает элемент из обычного потока относительно viewport?",
      "fixed",
      ["static", "relative", "sticky без скролла"],
    ),
    q(
      "Относительно чего позиционируется position: absolute без positioned-предка?",
      "Относительно ближайшего positioned-предка или initial containing block",
      ["Всегда относительно <body>", "Относительно соседнего элемента", "Относительно window только при fixed"],
    ),
  ]),
  "css-grid": quiz([
    q(
      "Какое свойство включает CSS Grid?",
      "display: grid",
      ["display: flex", "grid: on", "layout: grid"],
    ),
    q(
      "Что задаёт grid-template-columns?",
      "Количество и размеры колонок сетки",
      ["Цвет ячеек", "Отступы между строками текста", "Порядок flex-элементов"],
    ),
  ]),
  "css-units": quiz([
    q(
      "Чем rem отличается от em?",
      "rem считается от размера шрифта корня, em — от родителя",
      ["rem только для ширины", "em всегда равен px", "rem не работает в media queries"],
    ),
    q(
      "Какая единица удобна для адаптивного шрифта относительно viewport?",
      "vw",
      ["px", "cm", "pt"],
    ),
  ]),
  "css-colors-and-gradients": quiz([
    q(
      "Какой формат цвета поддерживает прозрачность?",
      "rgba()",
      ["#RRGGBB без alpha", "color-name", "rgb() без четвёртого параметра"],
    ),
  ]),
  "css-typography": quiz([
    q(
      "Какое свойство задаёт семейство шрифтов?",
      "font-family",
      ["font-style", "text-decoration", "line-height"],
    ),
    q(
      "Что делает line-height?",
      "Задаёт высоту строки текста",
      ["Меняет жирность шрифта", "Добавляет подчёркивание", "Выравнивает блок по центру"],
    ),
  ]),
  "css-backgrounds": quiz([
    q(
      "Какое свойство задаёт фоновое изображение?",
      "background-image",
      ["src", "image", "bg-url"],
    ),
    q(
      "Что делает background-size: cover?",
      "Масштабирует картинку, чтобы покрыть всю область",
      ["Повторяет изображение плиткой", "Обрезает только по ширине", "Скрывает фон"],
    ),
  ]),
  "css-shadows-and-filters": quiz([
    q(
      "Какое свойство добавляет тень блоку?",
      "box-shadow",
      ["text-shadow только для текста блока", "filter: shadow", "drop-shadow на display"],
    ),
  ]),
  "css-transitions": quiz([
    q(
      "Что анимирует transition?",
      "Плавное изменение CSS-свойств во времени",
      ["Только transform", "Только цвет текста", "Только размер шрифта без duration"],
    ),
    q(
      "Какое свойство задаёт длительность перехода?",
      "transition-duration",
      ["animation-time", "delay-only", "speed"],
    ),
  ]),
  "css-animations": quiz([
    q(
      "Чем @keyframes отличается от transition?",
      "Позволяет описать несколько шагов анимации по времени",
      ["Работает только с hover", "Не требует animation-name", "Заменяет media queries"],
    ),
  ]),
  "css-pseudo-classes": quiz([
    q(
      "Какой псевдокласс стилизует ссылку при наведении?",
      ":hover",
      ["::hover", ":active-only", ":focus-visible-hover"],
    ),
    q(
      "Для чего используют :focus?",
      "Стилизовать элемент в фокусе с клавиатуры или мыши",
      ["Только для disabled полей", "Только для первого ребёнка", "Только для ссылок visited"],
    ),
  ]),
  "css-pseudo-elements": quiz([
    q(
      "Какой синтаксис у псевдоэлемента?",
      "::before",
      [":before как псевдокласс в старом CSS без content", ":pseudo", "::element"],
    ),
    q(
      "Что обязательно нужно для ::before и ::after?",
      "Свойство content",
      ["position: absolute всегда", "display: block только", "z-index: 1"],
    ),
  ]),
  "css-specificity": quiz([
    q(
      "Что имеет больший вес: #id или .class?",
      "#id",
      [".class", "они равны", "зависит от порядка в файле только"],
    ),
  ]),
  "css-custom-properties": quiz([
    q(
      "Как объявить CSS-переменную?",
      "--main-color: #6c63ff;",
      ["$main-color: #6c63ff;", "var-main-color: #6c63ff;", "@main-color: #6c63ff;"],
    ),
    q(
      "Как использовать CSS-переменную?",
      "color: var(--main-color);",
      ["color: --main-color;", "color: $main-color;", "color: use(--main-color);"],
    ),
  ]),
  "css-media-queries": quiz([
    q(
      "Для чего нужны media queries?",
      "Применять стили в зависимости от ширины экрана и других условий",
      ["Подключать JavaScript", "Валидировать HTML", "Сжимать изображения на сервере"],
    ),
  ]),
  "css-responsive-layout": quiz([
    q(
      "Что такое адаптивная вёрстка?",
      "Интерфейс подстраивается под разные размеры экранов",
      ["Только мобильная версия отдельным сайтом", "Фиксированная ширина 1200px", "Только desktop-first"],
    ),
  ]),
  "css-mobile-first": quiz([
    q(
      "Что означает подход mobile-first?",
      "Сначала стили для маленьких экранов, потом расширяем через min-width",
      ["Сначала desktop, потом max-width", "Только мобильное приложение", "Отключение CSS на desktop"],
    ),
  ]),
  "css-bem": quiz([
    q(
      "Как в BEM называется модификатор блока button с темой primary?",
      "button--primary",
      ["button-primary", "button.primary", "button__primary"],
    ),
    q(
      "Что обозначает __ в BEM?",
      "Элемент блока",
      ["Модификатор", "Состояние hover", "Глобальная переменная"],
    ),
  ]),
};
