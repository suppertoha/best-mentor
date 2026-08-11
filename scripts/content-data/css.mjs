export default [
  {
    slug: "css-introduction",
    title: "Введение",
    file: "01-vvedenie.md",
    sortOrder: 0,
    skip: true,
  },
  {
    slug: "css-selectors",
    title: "Селекторы и свойства",
    file: "02-selektory.md",
    sortOrder: 1,
    skip: true,
  },
  {
    slug: "css-flexbox",
    title: "Flexbox",
    file: "03-flexbox.md",
    sortOrder: 2,
    skip: true,
  },
  {
    slug: "css-box-model",
    title: "Box model",
    file: "04-box-model.md",
    sortOrder: 3,
    intro:
      "Каждый элемент в CSS — прямоугольная «коробка». Понимание box model объясняет, откуда берутся отступы, почему блок «вылезает» за родителя и как считать реальную ширину элемента.",
    sections: [
      {
        h: "Состав коробки",
        p: "Элемент состоит из четырёх слоёв: content → padding → border → margin. Свойства `width` и `height` по умолчанию задают размер **контентной** области.",
        code: `.card {
  width: 300px;
  padding: 16px;
  border: 2px solid #e0e0e0;
  margin: 24px auto;
}`,
        lang: "css",
      },
      {
        h: "box-sizing",
        p: "`content-box` (по умолчанию) — padding и border добавляются к width. `border-box` — width включает padding и border. В проектах почти всегда используют border-box глобально.",
        code: `*,
*::before,
*::after {
  box-sizing: border-box;
}

.box {
  width: 200px;
  padding: 20px;
  border: 4px solid #333;
  /* при border-box реальная ширина = 200px */
}`,
        lang: "css",
      },
      {
        h: "margin и схлопывание",
        p: "Вертикальные margin соседних блоков «схлопываются» — берётся больший. Это частая причина «странных» отступов между секциями.",
        code: `.section {
  margin-bottom: 32px;
}

.section + .section {
  margin-top: 0; /* не добавляет 32 + 32 */
}`,
        lang: "css",
      },
      {
        h: "overflow",
        p: "Если контент не помещается, `overflow` управляет поведением: скрыть, прокрутить или показать всё.",
        code: `.scroll-area {
  max-height: 240px;
  overflow-y: auto;
}

.avatar {
  width: 48px;
  height: 48px;
  overflow: hidden;
  border-radius: 50%;
}`,
        lang: "css",
      },
    ],
    table: {
      headers: ["Свойство", "Что делает"],
      rows: [
        ["`padding`", "Внутренний отступ от border до контента"],
        ["`border`", "Рамка вокруг padding"],
        ["`margin`", "Внешний отступ до соседних элементов"],
        ["`box-sizing`", "Как width/height считают padding и border"],
      ],
    },
    quote:
      "Перед тем как «подкрутить margin», проверь box-sizing и реальную ширину с padding — это решает половину проблем вёрстки.",
    outro:
      "В следующей главе разберём display и visibility — как элемент участвует в потоке документа и виден ли он пользователю.",
  },
  {
    slug: "css-display-and-visibility",
    title: "Display и visibility",
    file: "05-display-i-visibility.md",
    sortOrder: 4,
    intro:
      "Свойство `display` определяет тип отображения элемента и как он взаимодействует с соседями. `visibility` скрывает элемент, но оставляет место в потоке.",
    sections: [
      {
        h: "block, inline, inline-block",
        p: "Block занимает всю ширину строки. Inline — только контент, без управления width/height. Inline-block сочетает inline-поток с блочными размерами.",
        code: `span.tag {
  display: inline-block;
  padding: 4px 8px;
  background: #eef2ff;
  border-radius: 4px;
}`,
        lang: "css",
      },
      {
        h: "display: none vs visibility: hidden",
        p: "`display: none` убирает элемент из потока — соседи занимают его место. `visibility: hidden` делает невидимым, но место сохраняется (полезно для анимаций по opacity).",
        code: `.modal[hidden] {
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
}`,
        lang: "css",
      },
      {
        h: "display: flex и grid",
        p: "Современная вёрстка чаще всего начинается с `display: flex` или `display: grid` на контейнере. Эти значения создают flex/grid formatting context.",
        code: `.toolbar {
  display: flex;
  align-items: center;
  gap: 12px;
}

.gallery {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}`,
        lang: "css",
      },
      {
        h: "Скрытие для доступности",
        p: "Для текста «только для скринридеров» используй класс visually-hidden, а не `display: none` на важных подсказках форм.",
        code: `.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}`,
        lang: "css",
      },
    ],
    outro:
      "Когда элемент нужно вынести из потока или точно позиционировать — переходим к position.",
  },
  {
    slug: "css-positioning",
    title: "Позиционирование",
    file: "06-pozicionirovanie.md",
    sortOrder: 5,
    intro:
      "Свойство `position` управляет тем, как элемент размещается на странице: в потоке, относительно себя, родителя или viewport.",
    sections: [
      {
        h: "static и relative",
        p: "`static` — по умолчанию. `relative` оставляет элемент в потоке, но позволяет сдвигать через top/left и служит контекстом для absolute-детей.",
        code: `.badge {
  position: relative;
  top: -8px;
}`,
        lang: "css",
      },
      {
        h: "absolute",
        p: "Элемент выходит из потока и позиционируется относительно ближайшего предка с position не static. Часто используется для иконок в кнопках и бейджей.",
        code: `.card {
  position: relative;
}

.card__badge {
  position: absolute;
  top: 8px;
  right: 8px;
}`,
        lang: "css",
      },
      {
        h: "fixed и sticky",
        p: "`fixed` — относительно viewport (шапка, плавающая кнопка). `sticky` — гибрид: в потоке, но «прилипает» при скролле после заданной точки.",
        code: `.site-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: #fff;
}

.fab {
  position: fixed;
  bottom: 24px;
  right: 24px;
}`,
        lang: "css",
      },
      {
        h: "z-index и stacking context",
        p: "Слои накладываются не только по z-index, но по stacking context. Новый контекст создаётся, например, при `position` + `z-index`, `opacity < 1`, `transform`.",
        code: `.dropdown {
  position: absolute;
  z-index: 10;
}

.modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.5);
}`,
        lang: "css",
      },
    ],
    quote:
      "Перед z-index: 9999 проверь, не создал ли родитель изолированный stacking context.",
    outro:
      "Для двумерных сеток страницы лучше подходит CSS Grid — следующая тема.",
  },
  {
    slug: "css-grid",
    title: "CSS Grid",
    file: "07-css-grid.md",
    sortOrder: 6,
    intro:
      "CSS Grid раскладывает элементы по строкам и столбцам. Он идеален для макетов страницы, карточных сеток и сложных шаблонов с областями.",
    sections: [
      {
        h: "Базовая сетка",
        p: "Задай контейнеру `display: grid`, определи колонки и gap. Дочерние элементы автоматически размещаются в ячейках.",
        code: `.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}`,
        lang: "css",
      },
      {
        h: "grid-template-areas",
        p: "Области задаются именами — читаемый способ описать макет «шапка / сайдбар / контент / футер».",
        code: `.layout {
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
.footer { grid-area: footer; }`,
        lang: "css",
      },
      {
        h: "Выравнивание",
        p: "`justify-items`, `align-items`, `place-items` выравнивают содержимое ячеек. На контейнере — `justify-content` / `align-content` для всей сетки.",
        code: `.cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
  align-items: start;
}`,
        lang: "css",
      },
      {
        h: "Grid vs Flexbox",
        list: [
          "Grid — двумерный: строки и столбцы вместе",
          "Flexbox — одномерный: строка или колонка",
          "Для макета страницы часто Grid, для компонентов (navbar, toolbar) — Flex",
        ],
      },
    ],
    outro:
      "Размеры ячеек и отступы зависят от единиц измерения — px, %, rem, vw и других.",
  },
  {
    slug: "css-units",
    title: "Единицы измерения",
    file: "08-edinicy-izmereniya.md",
    sortOrder: 7,
    intro:
      "CSS предлагает абсолютные и относительные единицы. Выбор влияет на адаптивность, доступность и предсказуемость вёрстки.",
    sections: [
      {
        h: "px, %, em, rem",
        p: "px — фиксированные пиксели. % — от родителя. em — от font-size элемента (или родителя для font-size). rem — от корневого font-size (обычно html).",
        code: `html {
  font-size: 16px;
}

.title {
  font-size: 1.5rem; /* 24px */
  margin-bottom: 0.5em; /* от своего font-size */
}

.container {
  width: 90%;
  max-width: 1200px;
}`,
        lang: "css",
      },
      {
        h: "vw, vh, vmin, vmax",
        p: "Viewport units — процент от ширины/высоты окна. Удобны для hero-секций, но на мобильных vh может «скакать» при появлении адресной строки.",
        code: `.hero {
  min-height: 80vh;
  padding: 5vw;
}`,
        lang: "css",
      },
      {
        h: "ch и fr",
        p: "`ch` — ширина символа «0» в текущем шрифте (поля ввода). `fr` — доля свободного места в Grid/Flex.",
        code: `input[type="email"] {
  width: 24ch;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 2fr;
}`,
        lang: "css",
      },
      {
        h: "Практические рекомендации",
        list: [
          "font-size и отступы — rem для единообразия и zoom-доступности",
          "max-width контента — px или rem + % ширина",
          "Не злоупотребляй vw для основного текста — читаемость падает",
        ],
      },
    ],
    table: {
      headers: ["Единица", "От чего считается"],
      rows: [
        ["`rem`", "font-size элемента html"],
        ["`em`", "font-size текущего элемента"],
        ["`%`", "Соответствующее свойство родителя"],
        ["`fr`", "Доступное место в grid/flex"],
      ],
    },
    outro:
      "Цвета и градиенты задают визуальный стиль — следующий блок темы.",
  },
  {
    slug: "css-colors-and-gradients",
    title: "Цвета и градиенты",
    file: "09-cveta-i-gradienty.md",
    sortOrder: 8,
    intro:
      "В CSS цвет задаётся ключевыми словами, hex, rgb/rgba, hsl/hsla и современным синтаксисом с альфа-каналом. Градиенты — через `linear-gradient` и `radial-gradient`.",
    sections: [
      {
        h: "Форматы цвета",
        code: `:root {
  --text: #1a1a2e;
  --muted: rgb(100 116 139);
  --accent: hsl(245 58% 51%);
  --overlay: rgb(0 0 0 / 0.45);
}`,
        lang: "css",
      },
      {
        h: "HSL для дизайна",
        p: "HSL удобен для вариаций: меняешь lightness — получаешь оттенки одного цвета без калькулятора.",
        code: `.btn-primary {
  background: hsl(245 58% 51%);
}

.btn-primary:hover {
  background: hsl(245 58% 45%);
}`,
        lang: "css",
      },
      {
        h: "Линейные градиенты",
        code: `.banner {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.striped {
  background: repeating-linear-gradient(
    45deg,
    #f8fafc,
    #f8fafc 10px,
    #e2e8f0 10px,
    #e2e8f0 20px
  );
}`,
        lang: "css",
      },
      {
        h: "Радиальные и conic",
        code: `.spotlight {
  background: radial-gradient(circle at top, #fff 0%, #e2e8f0 70%);
}

.pie-chart {
  background: conic-gradient(#4f46e5 0 40%, #e2e8f0 40% 100%);
}`,
        lang: "css",
      },
    ],
    quote:
      "Для текста на фоне проверяй контраст (WCAG): не полагайся только на «красивый» градиент.",
    outro:
      "Цвет текста и шрифты — в главе о типографике.",
  },
  {
    slug: "css-typography",
    title: "Типографика",
    file: "10-tipografika.md",
    sortOrder: 9,
    intro:
      "Типографика в CSS — выбор шрифтов, размеров, межстрочного интервала и оформления текста. Хорошая типографика улучшает читаемость курса и интерфейса.",
    sections: [
      {
        h: "font-family и fallback",
        code: `body {
  font-family: "Inter", system-ui, -apple-system, sans-serif;
}

code,
pre {
  font-family: "JetBrains Mono", ui-monospace, monospace;
}`,
        lang: "css",
      },
      {
        h: "Размер, вес и интерлиньяж",
        code: `h1 {
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.2;
}

p {
  font-size: 1rem;
  line-height: 1.6;
}`,
        lang: "css",
      },
      {
        h: "Подключение веб-шрифтов",
        code: `@font-face {
  font-family: "Inter";
  src: url("/fonts/inter.woff2") format("woff2");
  font-weight: 400;
  font-display: swap;
}`,
        lang: "css",
      },
      {
        h: "Дополнительные свойства",
        p: "letter-spacing, text-transform, text-decoration, text-align. Для длинных текстов курса — max-width около 65–75ch.",
        code: `.article {
  max-width: 68ch;
  text-align: left;
  hyphens: auto;
}`,
        lang: "css",
      },
    ],
    outro:
      "Фон страницы и блоков часто сочетается с типографикой — разберём в следующей главе.",
  },
  {
    slug: "css-backgrounds",
    title: "Фоны",
    file: "11-fony.md",
    sortOrder: 10,
    intro:
      "Свойство `background` и связанные с ним задают цвет, изображение, позицию и размер фона элемента.",
    sections: [
      {
        h: "background-color и image",
        code: `.card {
  background-color: #f8fafc;
  background-image: url("/images/pattern.svg");
}`,
        lang: "css",
      },
      {
        h: "background-size и position",
        code: `.hero {
  background-image: url("/images/hero.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}`,
        lang: "css",
      },
      {
        h: "Множественные фоны",
        code: `.layered {
  background:
    linear-gradient(rgb(0 0 0 / 0.4), rgb(0 0 0 / 0.4)),
    url("/images/city.jpg") center / cover no-repeat;
}`,
        lang: "css",
      },
      {
        h: "background-attachment",
        p: "`fixed` создаёт parallax-эффект, но на мобильных может работать нестабильно — тестируй на устройствах.",
        code: `.parallax {
  background-attachment: fixed;
}`,
        lang: "css",
      },
    ],
    outro:
      "Тени и фильтры добавляют глубину и визуальные эффекты поверх фона.",
  },
  {
    slug: "css-shadows-and-filters",
    title: "Тени и фильтры",
    file: "12-teni-i-filtry.md",
    sortOrder: 11,
    intro:
      "`box-shadow` и `text-shadow` имитируют освещение. `filter` применяет графические эффекты: blur, яркость, контраст.",
    sections: [
      {
        h: "box-shadow",
        code: `.card {
  box-shadow:
    0 1px 3px rgb(0 0 0 / 0.1),
    0 8px 24px rgb(0 0 0 / 0.08);
}

.card:hover {
  box-shadow: 0 12px 32px rgb(0 0 0 / 0.12);
}`,
        lang: "css",
      },
      {
        h: "text-shadow",
        code: `.hero-title {
  color: #fff;
  text-shadow: 0 2px 8px rgb(0 0 0 / 0.35);
}`,
        lang: "css",
      },
      {
        h: "filter",
        code: `.avatar--disabled {
  filter: grayscale(1) opacity(0.6);
}

.modal-backdrop {
  backdrop-filter: blur(4px);
}`,
        lang: "css",
      },
      {
        h: "Производительность",
        p: "Тени и blur на больших областях и при анимации могут влиять на FPS. Проверяй в DevTools Performance.",
        list: [
          "Предпочитай transform и opacity для анимаций",
          "backdrop-filter тяжелее обычного filter",
        ],
      },
    ],
    outro:
      "Плавные изменения свойств — через transitions.",
  },
  {
    slug: "css-transitions",
    title: "Transitions",
    file: "13-transitions.md",
    sortOrder: 12,
    intro:
      "CSS transitions плавно анимируют изменение свойств при смене состояния (hover, focus, class toggle) без keyframes.",
    sections: [
      {
        h: "Базовый transition",
        code: `.btn {
  background: #4f46e5;
  transition: background-color 0.2s ease;
}

.btn:hover {
  background: #4338ca;
}`,
        lang: "css",
      },
      {
        h: "Несколько свойств",
        code: `.link {
  color: #4f46e5;
  transform: translateY(0);
  transition:
    color 0.15s ease,
    transform 0.2s ease;
}

.link:hover {
  color: #312e81;
  transform: translateY(-2px);
}`,
        lang: "css",
      },
      {
        h: "transition-property и timing",
        p: "Указывай конкретные свойства, а не `all` — так браузер работает эффективнее. easing: ease, ease-in-out, cubic-bezier(...).",
        code: `.panel {
  opacity: 0;
  transform: translateY(8px);
  transition:
    opacity 0.3s ease-out,
    transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}

.panel.is-open {
  opacity: 1;
  transform: translateY(0);
}`,
        lang: "css",
      },
      {
        h: "Что анимировать",
        list: [
          "opacity, transform — дёшево для GPU",
          "width, height, margin — могут вызывать reflow",
          "Для сложных сценариев — @keyframes",
        ],
      },
    ],
    outro:
      "Более сложные и цикличные анимации — в главе про animations.",
  },
  {
    slug: "css-animations",
    title: "Анимации",
    file: "14-animacii.md",
    sortOrder: 13,
    intro:
      "Анимации через `@keyframes` и `animation` позволяют описать последовательность состояний и запускать её автоматически или по классу.",
    sections: [
      {
        h: "@keyframes",
        code: `@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}`,
        lang: "css",
      },
      {
        h: "animation свойства",
        code: `.toast {
  animation: fade-in 0.4s ease-out forwards;
}

.spinner {
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}`,
        lang: "css",
      },
      {
        h: "animation-fill-mode и direction",
        p: "`forwards` сохраняет финальное состояние. `alternate` — туда-обратно при infinite.",
        code: `.pulse {
  animation: pulse 1.5s ease-in-out infinite alternate;
}

@keyframes pulse {
  from { transform: scale(1); }
  to { transform: scale(1.05); }
}`,
        lang: "css",
      },
      {
        h: "prefers-reduced-motion",
        p: "Уважай настройку пользователя — отключай или упрощай анимации.",
        code: `@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}`,
        lang: "css",
      },
    ],
    outro:
      "Состояния элементов (:hover, :focus) — через псевдоклассы.",
  },
  {
    slug: "css-pseudo-classes",
    title: "Псевдоклассы",
    file: "15-pseudoklassy.md",
    sortOrder: 14,
    intro:
      "Псевдоклассы выбирают элементы по состоянию, позиции в дереве или структуре — без дополнительных классов в HTML.",
    sections: [
      {
        h: "Интерактивные состояния",
        code: `a:hover {
  text-decoration: underline;
}

input:focus-visible {
  outline: 2px solid #4f46e5;
  outline-offset: 2px;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}`,
        lang: "css",
      },
      {
        h: "Структурные псевдоклассы",
        code: `li:first-child {
  font-weight: 600;
}

tr:nth-child(even) {
  background: #f8fafc;
}

p:not(.muted) {
  color: #1e293b;
}`,
        lang: "css",
      },
      {
        h: ":is() и :where()",
        p: "Современные селекторы группируют правила. `:where()` имеет нулевую специфичность — удобно для базовых стилей.",
        code: `:is(h1, h2, h3) {
  line-height: 1.25;
}

:where(ul, ol) {
  margin: 0;
  padding-left: 1.25rem;
}`,
        lang: "css",
      },
      {
        h: "Формы",
        code: `input:required:invalid {
  border-color: #dc2626;
}

input:valid {
  border-color: #16a34a;
}`,
        lang: "css",
      },
    ],
    outro:
      "Псевдоэлементы (::before, ::after) создают декоративные части без разметки.",
  },
  {
    slug: "css-pseudo-elements",
    title: "Псевдоэлементы",
    file: "16-pseudoelements.md",
    sortOrder: 15,
    intro:
      "Псевдоэлементы — виртуальные узлы, которые CSS может стилизовать. Чаще всего ::before и ::after для декора и иконок.",
    sections: [
      {
        h: "::before и ::after",
        p: "Требуют свойство content (даже пустая строка). По умолчанию display: inline — для размеров часто нужен display: block или inline-block.",
        code: `.quote::before {
  content: "«";
  font-size: 2rem;
  color: #94a3b8;
}

.link--external::after {
  content: " ↗";
  font-size: 0.85em;
}`,
        lang: "css",
      },
      {
        h: "Декоративные элементы",
        code: `.divider {
  display: flex;
  align-items: center;
  gap: 12px;
}

.divider::before,
.divider::after {
  content: "";
  flex: 1;
  height: 1px;
  background: #e2e8f0;
}`,
        lang: "css",
      },
      {
        h: "::placeholder и ::selection",
        code: `input::placeholder {
  color: #94a3b8;
}

::selection {
  background: #c7d2fe;
  color: #1e1b4b;
}`,
        lang: "css",
      },
      {
        h: "Ограничения",
        list: [
          "Псевдоэлементы не в DOM — не кликабельны",
          "Не вставляй важный контент только через ::before — доступность",
          "Один ::before и один ::after на элемент",
        ],
      },
    ],
    outro:
      "Когда правила конфликтуют, побеждает специфичность и каскад.",
  },
  {
    slug: "css-specificity",
    title: "Специфичность",
    file: "17-specifichnost.md",
    sortOrder: 16,
    intro:
      "Специфичность определяет, какое CSS-правило применится, если несколько селекторов нацелены на один элемент. Это основа каскада.",
    sections: [
      {
        h: "Как считать вес",
        p: "Грубо: id > class/атрибут/псевдокласс > тег/псевдоэлемент. Inline style перебивает id в файле (кроме !important).",
        list: [
          "`p` — один тег",
          "`.btn` — один класс",
          "`#nav` — один id",
          "`button.primary[disabled]` — класс + тег + атрибут",
        ],
      },
      {
        h: "Порядок в файле",
        code: `.text {
  color: gray;
}

.text {
  color: navy; /* побеждает при равной специфичности */
}`,
        lang: "css",
      },
      {
        h: "!important",
        p: "Используй редко — ломает предсказуемость и усложняет override. Утилитарные классы и темы лучше проектировать без !important.",
        code: `.alert {
  color: #b91c1c !important; /* только если нет другого выхода */
}`,
        lang: "css",
      },
      {
        h: ":where() для сброса веса",
        code: `:where(.prose h2) {
  margin-top: 2rem;
}

.prose h2 {
  margin-top: 3rem; /* перебьёт :where при равном контексте */
}`,
        lang: "css",
      },
    ],
    table: {
      headers: ["Селектор", "Пример веса"],
      rows: [
        ["Элемент", "`p` → 0,0,1"],
        ["Класс", "`.card` → 0,1,0"],
        ["ID", "`#main` → 1,0,0"],
        ["Inline", "style= → 1,0,0,0"],
      ],
    },
    quote:
      "Не поднимай специфичность ради победы — упрощай селекторы и структуру классов.",
    outro:
      "CSS-переменные помогают управлять значениями централизованно.",
  },
  {
    slug: "css-custom-properties",
    title: "CSS-переменные",
    file: "18-css-peremennye.md",
    sortOrder: 17,
    intro:
      "Custom properties (CSS variables) — значения с именем `--*`, которые каскадируют и переключаются по контексту (тема, компонент, media).",
    sections: [
      {
        h: "Определение и использование",
        code: `:root {
  --color-primary: #4f46e5;
  --space-md: 16px;
  --radius: 8px;
}

.btn {
  background: var(--color-primary);
  padding: var(--space-md);
  border-radius: var(--radius);
}`,
        lang: "css",
      },
      {
        h: "Fallback",
        code: `.sidebar {
  width: var(--sidebar-width, 280px);
}`,
        lang: "css",
      },
      {
        h: "Тема через переменные",
        code: `:root {
  --bg: #ffffff;
  --text: #1e293b;
}

[data-theme="dark"] {
  --bg: #0f172a;
  --text: #f1f5f9;
}

body {
  background: var(--bg);
  color: var(--text);
}`,
        lang: "css",
      },
      {
        h: "Локальные переменные компонента",
        code: `.card {
  --card-padding: 20px;
  padding: var(--card-padding);
}

.card--compact {
  --card-padding: 12px;
}`,
        lang: "css",
      },
    ],
    outro:
      "Переменные часто меняют внутри media queries для адаптива.",
  },
  {
    slug: "css-media-queries",
    title: "Медиазапросы",
    file: "19-mediazaprosy.md",
    sortOrder: 18,
    intro:
      "Media queries применяют стили при определённых условиях: ширина экрана, ориентация, prefers-color-scheme и другие features.",
    sections: [
      {
        h: "min-width breakpoints",
        code: `.container {
  padding: 16px;
}

@media (min-width: 768px) {
  .container {
    padding: 24px;
  }
}

@media (min-width: 1024px) {
  .container {
    padding: 32px;
    max-width: 1200px;
  }
}`,
        lang: "css",
      },
      {
        h: "orientation и hover",
        code: `@media (orientation: landscape) and (max-height: 500px) {
  .hero {
    min-height: auto;
  }
}

@media (hover: hover) {
  .card:hover {
    transform: translateY(-4px);
  }
}`,
        lang: "css",
      },
      {
        h: "prefers-color-scheme и reduced-motion",
        code: `@media (prefers-color-scheme: dark) {
  :root {
    color-scheme: dark;
  }
}`,
        lang: "css",
      },
      {
        h: "container queries",
        p: "Стили от размера контейнера, а не viewport — `@container` и `container-type`.",
        code: `.card-wrapper {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 120px 1fr;
  }
}`,
        lang: "css",
      },
    ],
    outro:
      "Медиазапросы — инструмент адаптивной вёрстки в следующей главе.",
  },
  {
    slug: "css-responsive-layout",
    title: "Адаптивная вёрстка",
    file: "20-adaptivnaya-verstka.md",
    sortOrder: 19,
    intro:
      "Адаптивная вёрстка подстраивает макет под разные экраны: fluid grids, гибкие изображения, breakpoints и переключение раскладки.",
    sections: [
      {
        h: "Fluid images",
        code: `img,
video {
  max-width: 100%;
  height: auto;
  display: block;
}`,
        lang: "css",
      },
      {
        h: "Responsive grid",
        code: `.products {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 24px;
}`,
        lang: "css",
      },
      {
        h: "Скрытие и перестановка",
        code: `@media (max-width: 767px) {
  .sidebar {
    display: none;
  }

  .layout {
    grid-template-columns: 1fr;
  }
}`,
        lang: "css",
      },
      {
        h: "Практические breakpoints",
        list: [
          "Ориентируйся на контент, не на конкретные устройства",
          "Типичные точки: ~480, 768, 1024, 1280px",
          "Проверяй реальные телефоны и zoom 200%",
        ],
      },
    ],
    outro:
      "Подход mobile-first задаёт стили «снизу вверх» — от малого экрана.",
  },
  {
    slug: "css-mobile-first",
    title: "Mobile-first",
    file: "21-mobile-first.md",
    sortOrder: 20,
    intro:
      "Mobile-first — сначала базовые стили для узкого экрана, затем расширение через min-width. Так меньше override и проще поддержка.",
    sections: [
      {
        h: "Базовый стиль = мобильный",
        code: `.nav {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

@media (min-width: 768px) {
  .nav {
    flex-direction: row;
    gap: 24px;
  }
}`,
        lang: "css",
      },
      {
        h: "Прогрессивное улучшение",
        p: "Не обрезай функциональность на мобильном — улучшай раскладку на больших экранах. Touch targets минимум ~44×44px.",
        code: `.btn-icon {
  min-width: 44px;
  min-height: 44px;
}`,
        lang: "css",
      },
      {
        h: "Типографика mobile-first",
        code: `h1 {
  font-size: 1.75rem;
}

@media (min-width: 768px) {
  h1 {
    font-size: 2.25rem;
  }
}`,
        lang: "css",
      },
      {
        h: "Отличие от desktop-first",
        list: [
          "Desktop-first: max-width и «урезание» стилей",
          "Mobile-first: min-width и добавление возможностей",
          "В индустрии mobile-first — стандарт для новых проектов",
        ],
      },
    ],
    quote:
      "Сначала убедись, что страница работает на 320px, потом добавляй колонки и сайдбар.",
    outro:
      "Для именования классов в больших проектах часто используют методологию BEM.",
  },
  {
    slug: "css-bem",
    title: "BEM",
    file: "22-bem.md",
    sortOrder: 21,
    intro:
      "BEM (Block, Element, Modifier) — методология именования CSS-классов. Она делает стили предсказуемыми и снижает конфликты специфичности.",
    sections: [
      {
        h: "Block, Element, Modifier",
        list: [
          "Block — независимый компонент: `.card`",
          "Element — часть блока: `.card__title`",
          "Modifier — вариант: `.card--featured`",
        ],
        code: `.card { }
.card__title { }
.card__body { }
.card--featured {
  border-color: #4f46e5;
}`,
        lang: "css",
      },
      {
        h: "HTML пример",
        code: `<article class="card card--featured">
  <h2 class="card__title">Глава CSS</h2>
  <p class="card__body">Короткое описание.</p>
  <a class="card__link" href="#">Читать</a>
</article>`,
        lang: "html",
      },
      {
        h: "Правила BEM",
        list: [
          "Не вкладывай селекторы глубоко: `.card .title` → `.card__title`",
          "Modifier не используйся сам по себе — вместе с block",
          "Не делай element-of-element: `.card__body__text` — лучше новый block или flat element",
        ],
      },
      {
        h: "BEM и компоненты в React",
        p: "В best-mentor компоненты живут в своих папках (FSD). BEM-классы в scss module или глобальном css согласованы с именем компонента: `LoginForm`, `card__title`.",
        code: `/* LoginForm.module.scss */
.form { }
.form__field { }
.form__submit { }
.form--loading { }`,
        lang: "css",
      },
      {
        h: "Когда не нужен чистый BEM",
        p: "Утилиты (Tailwind), CSS modules с хешами, styled-components — альтернативы. BEM полезен в классической вёрстке и дизайн-системах с глобальным CSS.",
      },
    ],
    quote:
      "Имена классов должны отвечать на вопрос «что это?», а не «как выглядит?» — не `.red-text`, а `.error-message`.",
    outro:
      "С BEM, Flexbox, Grid и адаптивом ты закрываешь базовый стек CSS для вёрстки учебного проекта и реальных интерфейсов.",
  },
];
