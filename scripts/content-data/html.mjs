export default [
  {
    slug: "html-introduction",
    title: "Введение",
    file: "01-vvedenie.md",
    sortOrder: 0,
    skip: true,
  },
  {
    slug: "html-tags-and-structure",
    title: "Теги и структура",
    file: "02-tegi-i-struktura.md",
    sortOrder: 1,
    skip: true,
  },
  {
    slug: "html-forms",
    title: "Формы",
    file: "03-formy.md",
    sortOrder: 2,
    skip: true,
  },
  {
    slug: "html-semantic-markup",
    title: "Семантическая разметка",
    file: "04-semanticheskaya-razmetka.md",
    sortOrder: 3,
    intro:
      "Семантическая разметка описывает смысл содержимого, а не только его внешний вид. Браузеры, поисковики и скринридеры лучше понимают структуру страницы, когда ты используешь правильные теги.",
    sections: [
      {
        h: "Зачем нужна семантика",
        p: "Тег `<div>` подходит для контейнера без особого смысла, но заголовок статьи логичнее обернуть в `<article>`, а навигацию — в `<nav>`. Семантика помогает поддерживать код и улучшает доступность.",
        list: [
          "Поисковые системы точнее определяют главную тему страницы",
          "Скринридеры сообщают пользователю тип блока (шапка, меню, основной контент)",
          "Код проще читать без лишних комментариев",
        ],
      },
      {
        h: "Основные семантические теги",
        p: "HTML5 добавил набор тегов для типовых областей страницы. Их можно комбинировать внутри общего каркаса.",
        code: `<header>
  <nav>
    <a href="/">Главная</a>
    <a href="/blog">Блог</a>
  </nav>
</header>

<main>
  <article>
    <h1>Как выбрать хостинг</h1>
    <p>Краткое введение в тему статьи.</p>
    <section>
      <h2>Критерии выбора</h2>
      <p>Цена, поддержка, расположение серверов.</p>
    </section>
  </article>

  <aside>
    <h2>Популярные статьи</h2>
    <ul>
      <li><a href="/css-grid">CSS Grid</a></li>
    </ul>
  </aside>
</main>

<footer>
  <p>&copy; 2026 Учебный проект</p>
</footer>`,
        lang: "html",
      },
      {
        h: "article, section и div",
        p: "`<article>` — самостоятельный фрагмент контента (пост, карточка товара). `<section>` — тематическая группа внутри статьи или страницы. `<div>` оставляй, когда семантического тега нет, но нужен контейнер для стилей или скриптов.",
        code: `<article class="product-card">
  <h2>Наушники Pro</h2>
  <section class="product-card__specs">
    <h3>Характеристики</h3>
    <p>Bluetooth 5.3, 30 часов работы.</p>
  </section>
  <section class="product-card__reviews">
    <h3>Отзывы</h3>
    <p>4.8 из 5 по оценкам покупателей.</p>
  </section>
</article>`,
        lang: "html",
      },
      {
        h: "figure и time",
        p: "Тег `<figure>` объединяет иллюстрацию и подпись. `<time>` машиночитаемо хранит дату или время — удобно для календарей и микроразметки.",
        code: `<figure>
  <img src="chart.png" alt="График роста посещаемости за год" />
  <figcaption>Рис. 1 — динамика трафика в 2025 году</figcaption>
</figure>

<p>
  Опубликовано
  <time datetime="2026-03-15">15 марта 2026</time>
</p>`,
        lang: "html",
      },
    ],
    table: {
      headers: ["Тег", "Назначение"],
      rows: [
        ["<header>", "Шапка сайта или раздела"],
        ["<nav>", "Блок навигации"],
        ["<main>", "Основное содержимое (один на страницу)"],
        ["<article>", "Независимый контент"],
        ["<aside>", "Боковая панель, дополнение к основному тексту"],
        ["<footer>", "Подвал страницы или секции"],
      ],
    },
    outro:
      "Выбирай семантический тег по роли блока, а не по тому, как он выглядит. Внешний вид всегда настраивается через CSS.",
  },
  {
    slug: "html-tables",
    title: "Таблицы",
    file: "05-tablitsy.md",
    sortOrder: 4,
    intro:
      "Таблицы в HTML предназначены для табличных данных: расписания, прайс-листы, сравнения характеристик. Для вёрстки страниц таблицы не используют — для этого есть CSS Grid и Flexbox.",
    sections: [
      {
        h: "Базовая структура таблицы",
        p: "Минимальный набор: `<table>`, строки `<tr>`, ячейки `<td>`. Заголовки столбцов оформляют через `<th>`.",
        code: `<table>
  <tr>
    <th>Язык</th>
    <th>Год появления</th>
    <th>Область</th>
  </tr>
  <tr>
    <td>HTML</td>
    <td>1991</td>
    <td>Разметка</td>
  </tr>
  <tr>
    <td>CSS</td>
    <td>1996</td>
    <td>Стили</td>
  </tr>
</table>`,
        lang: "html",
      },
      {
        h: "thead, tbody и tfoot",
        p: "Группировка частей таблицы упрощает стилизацию и делает разметку понятнее для скринридеров.",
        code: `<table>
  <thead>
    <tr>
      <th>Товар</th>
      <th>Цена</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Клавиатура</td>
      <td>4 990 ₽</td>
    </tr>
    <tr>
      <td>Мышь</td>
      <td>1 290 ₽</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <th>Итого</th>
      <td>6 280 ₽</td>
    </tr>
  </tfoot>
</table>`,
        lang: "html",
      },
      {
        h: "Объединение ячеек",
        p: "Атрибуты `colspan` и `rowspan` растягивают ячейку на несколько столбцов или строк.",
        code: `<table>
  <tr>
    <th rowspan="2">Курс</th>
    <th colspan="2">Оценка</th>
  </tr>
  <tr>
    <th>Теория</th>
    <th>Практика</th>
  </tr>
  <tr>
    <td>HTML</td>
    <td>5</td>
    <td>5</td>
  </tr>
</table>`,
        lang: "html",
      },
      {
        h: "Подпись и доступность",
        p: "Элемент `<caption>` задаёт заголовок таблицы. Атрибут `scope` у `<th>` указывает, к чему относится заголовок — к столбцу или строке.",
        code: `<table>
  <caption>Расписание занятий на неделю</caption>
  <thead>
    <tr>
      <th scope="col">День</th>
      <th scope="col">Время</th>
      <th scope="col">Тема</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Понедельник</th>
      <td>18:00</td>
      <td>Семантика HTML</td>
    </tr>
  </tbody>
</table>`,
        lang: "html",
      },
      {
        h: "Стилизация таблиц",
        p: "Базовое оформление задаётся через CSS: границы, отступы, чередование строк.",
        code: `table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ccc;
  padding: 8px 12px;
  text-align: left;
}

tbody tr:nth-child(even) {
  background-color: #f7f7f7;
}`,
        lang: "css",
      },
    ],
    quote:
      "Таблица — для данных, а не для сетки страницы. Если нужны колонки без табличных данных, используй CSS.",
    outro:
      "Перед публикацией проверь, что у каждой ячейки есть смысл, а заголовки связаны с данными через `scope` или явную структуру.",
  },
  {
    slug: "html-images",
    title: "Изображения",
    file: "06-izobrazheniya.md",
    sortOrder: 5,
    intro:
      "Изображения делают страницу наглядной, но увеличивают вес документа. Правильные форматы, размеры и альтернативный текст — обязательная часть грамотной вёрстки.",
    sections: [
      {
        h: "Тег img",
        p: "`<img>` — одиночный тег. Обязательные атрибуты: `src` (путь к файлу) и `alt` (текстовое описание для доступности и при ошибке загрузки).",
        code: `<img
  src="/images/team-photo.jpg"
  alt="Команда разработчиков на конференции"
  width="800"
  height="450"
/>`,
        lang: "html",
      },
      {
        h: "Атрибуты width и height",
        p: "Явные размеры резервируют место под картинку до загрузки и уменьшают сдвиг макета (CLS). Значения можно задавать в HTML, а масштаб — в CSS.",
        code: `<img
  src="avatar.png"
  alt="Аватар пользователя"
  width="96"
  height="96"
  class="avatar"
/>

<style>
  .avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    object-fit: cover;
  }
</style>`,
        lang: "html",
      },
      {
        h: "Адаптивные изображения с srcset",
        p: "Атрибут `srcset` позволяет браузеру выбрать файл под плотность экрана или ширину viewport.",
        code: `<img
  src="hero-800.jpg"
  srcset="
    hero-400.jpg 400w,
    hero-800.jpg 800w,
    hero-1200.jpg 1200w
  "
  sizes="(max-width: 600px) 100vw, 800px"
  alt="Горный пейзаж на рассвете"
/>`,
        lang: "html",
      },
      {
        h: "picture для разных форматов",
        p: "Элемент `<picture>` подключает WebP или AVIF с запасным вариантом для старых браузеров.",
        code: `<picture>
  <source srcset="banner.avif" type="image/avif" />
  <source srcset="banner.webp" type="image/webp" />
  <img src="banner.jpg" alt="Баннер курса по вёрстке" />
</picture>`,
        lang: "html",
      },
      {
        h: "Декоративные изображения",
        p: "Если картинка не несёт информации, оставь пустой `alt`. Для иконок рядом с текстом это нормальная практика.",
        list: [
          "Информативное изображение — осмысленный alt",
          "Декоративное — alt=\"\"",
          "Изображение-ссылка — alt описывает цель перехода",
        ],
      },
    ],
    outro:
      "Сжимай файлы, указывай размеры и не забывай про alt: это влияет и на доступность, и на SEO.",
  },
  {
    slug: "html-audio-video",
    title: "Аудио и видео",
    file: "07-audio-i-video.md",
    sortOrder: 6,
    intro:
      "HTML5 позволяет встраивать аудио и видео без Flash. Браузер показывает встроенный плеер, а ты контролируешь источники, субтитры и поведение воспроизведения.",
    sections: [
      {
        h: "Видео с тегом video",
        p: "Атрибут `controls` добавляет стандартные кнопки управления. `poster` — картинка до старта воспроизведения.",
        code: `<video
  controls
  width="640"
  height="360"
  poster="preview.jpg"
>
  <source src="lesson.mp4" type="video/mp4" />
  <source src="lesson.webm" type="video/webm" />
  Ваш браузер не поддерживает видео HTML5.
</video>`,
        lang: "html",
      },
      {
        h: "Аудио с тегом audio",
        p: "Для подкастов и звуковых эффектов используй `<audio>`. Можно отключить автозагрузку через `preload=\"none\"`.",
        code: `<audio controls preload="metadata">
  <source src="intro.ogg" type="audio/ogg" />
  <source src="intro.mp3" type="audio/mpeg" />
  Аудио недоступно в этом браузере.
</audio>`,
        lang: "html",
      },
      {
        h: "Субтитры и дорожки",
        p: "Внутри `<video>` элемент `<track>` подключает субтитры. Атрибут `kind` указывает тип дорожки.",
        code: `<video controls>
  <source src="talk.mp4" type="video/mp4" />
  <track
    kind="subtitles"
    src="talk-ru.vtt"
    srclang="ru"
    label="Русские субтитры"
    default
  />
</video>`,
        lang: "html",
      },
      {
        h: "Атрибуты воспроизведения",
        p: "Частые флаги: `autoplay`, `muted`, `loop`, `playsinline`. Автовоспроизведение в большинстве браузеров работает только с отключённым звуком.",
        code: `<video muted autoplay loop playsinline>
  <source src="background.webm" type="video/webm" />
</video>`,
        lang: "html",
      },
    ],
    table: {
      headers: ["Атрибут", "Назначение"],
      rows: [
        ["controls", "Показать элементы управления"],
        ["poster", "Превью-изображение для video"],
        ["preload", "Подсказка браузеру: none | metadata | auto"],
        ["muted", "Без звука (нужен для autoplay)"],
        ["loop", "Повторять после окончания"],
      ],
    },
    outro:
      "Для продакшена добавляй несколько форматов и субтитры — так контент доступен на разных устройствах и для большей аудитории.",
  },
  {
    slug: "html-links-anchors",
    title: "Ссылки и якоря",
    file: "08-ssylki-i-yakorya.md",
    sortOrder: 7,
    intro:
      "Ссылки соединяют страницы и разделы внутри документа. Якоря позволяют прыгать к нужному заголовку без перезагрузки всей страницы.",
    sections: [
      {
        h: "Внешние и внутренние ссылки",
        p: "Атрибут `href` задаёт адрес. Для перехода на другой сайт указывай полный URL; для страниц своего проекта — относительный путь.",
        code: `<a href="https://developer.mozilla.org/">MDN</a>
<a href="/about.html">О проекте</a>
<a href="../index.html">На главную</a>`,
        lang: "html",
      },
      {
        h: "Якорные ссылки",
        p: "Ссылка с `#id` ведёт к элементу с таким же `id` на странице. Идентификатор должен быть уникальным.",
        code: `<nav>
  <a href="#intro">Введение</a>
  <a href="#practice">Практика</a>
</nav>

<h2 id="intro">Введение</h2>
<p>Текст раздела...</p>

<h2 id="practice">Практика</h2>
<p>Задания для закрепления...</p>`,
        lang: "html",
      },
      {
        h: "target и rel",
        p: "Открытие в новой вкладке: `target=\"_blank\"`. Всегда добавляй `rel=\"noopener noreferrer\"` из соображений безопасности.",
        code: `<a
  href="https://example.com/docs"
  target="_blank"
  rel="noopener noreferrer"
>
  Документация (откроется в новой вкладке)
</a>`,
        lang: "html",
      },
      {
        h: "Ссылки на email и телефон",
        p: "Схемы `mailto:` и `tel:` запускают почтовый клиент или набор номера на мобильных устройствах.",
        code: `<a href="mailto:hello@example.com">Написать нам</a>
<a href="tel:+74951234567">+7 (495) 123-45-67</a>`,
        lang: "html",
      },
      {
        h: "Доступные ссылки",
        p: "Текст ссылки должен быть понятен вне контекста. Избегай «нажми здесь» без пояснения, куда ведёт переход.",
        list: [
          "Описывай назначение: «Скачать программу курса (PDF)»",
          "Для иконок без текста используй aria-label",
          "Не делай несколько ссылок на один и тот же URL с разным текстом без причины",
        ],
      },
    ],
    outro:
      "Проверяй все href вручную и в DevTools: битые ссылки портят опыт пользователя и доверие к сайту.",
  },
  {
    slug: "html-lists",
    title: "Списки",
    file: "09-spiski.md",
    sortOrder: 8,
    intro:
      "Списки структурируют перечисления: пункты меню, шаги инструкции, термины со значениями. HTML предлагает три основных типа списков.",
    sections: [
      {
        h: "Маркированный список ul",
        p: "Элемент `<ul>` содержит пункты `<li>`. Порядок не важен — подходит для меню и наборов свойств.",
        code: `<ul>
  <li>HTML</li>
  <li>CSS</li>
  <li>JavaScript</li>
</ul>`,
        lang: "html",
      },
      {
        h: "Нумерованный список ol",
        p: "`<ol>` нумерует пункты автоматически. Атрибут `start` задаёт начальное число, `reversed` — обратный порядок.",
        code: `<ol>
  <li>Установить редактор кода</li>
  <li>Создать файл index.html</li>
  <li>Открыть страницу в браузере</li>
</ol>

<ol start="5" reversed>
  <li>Пятый шаг</li>
  <li>Четвёртый шаг</li>
</ol>`,
        lang: "html",
      },
      {
        h: "Список определений dl",
        p: "`<dl>` связывает термин `<dt>` с описанием `<dd>`. Удобно для глоссариев и FAQ.",
        code: `<dl>
  <dt>API</dt>
  <dd>Интерфейс для обмена данными между программами.</dd>

  <dt>DOM</dt>
  <dd>Объектная модель документа в браузере.</dd>
</dl>`,
        lang: "html",
      },
      {
        h: "Вложенные списки",
        p: "Внутри `<li>` можно размещать другой список — так строят многоуровневые меню и планы.",
        code: `<ul>
  <li>Frontend
    <ul>
      <li>HTML</li>
      <li>CSS</li>
    </ul>
  </li>
  <li>Backend
    <ul>
      <li>Node.js</li>
      <li>Базы данных</li>
    </ul>
  </li>
</ul>`,
        lang: "html",
      },
      {
        h: "Списки и навигация",
        p: "Меню сайта часто размечают как список ссылок внутри `<nav>`.",
        code: `<nav aria-label="Основное меню">
  <ul>
    <li><a href="/">Главная</a></li>
    <li><a href="/courses">Курсы</a></li>
    <li><a href="/contacts">Контакты</a></li>
  </ul>
</nav>`,
        lang: "html",
      },
    ],
    outro:
      "Выбирай тип списка по смыслу: ul — без порядка, ol — с порядком, dl — термин и определение.",
  },
  {
    slug: "html-head-metadata",
    title: "Метаданные head",
    file: "10-metadannye-head.md",
    sortOrder: 9,
    intro:
      "Секция `<head>` не отображается на странице, но сообщает браузеру и поисковикам важные сведения: кодировку, заголовок вкладки, описание и связи с другими ресурсами.",
    sections: [
      {
        h: "Минимальный набор head",
        p: "Кодировка, viewport и title — база для любой современной страницы.",
        code: `<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Курс HTML — Глава о метаданных</title>
</head>`,
        lang: "html",
      },
      {
        h: "meta description и keywords",
        p: "`description` часто попадает в сниппет поисковой выдачи. `keywords` сегодня почти не влияет на ранжирование, но встречается в старых проектах.",
        code: `<meta
  name="description"
  content="Краткое описание страницы для поисковиков и соцсетей."
/>
<meta name="keywords" content="HTML, метаданные, head" />`,
        lang: "html",
      },
      {
        h: "Подключение стилей и иконок",
        p: "CSS подключают через `<link rel=\"stylesheet\">`. Favicon — через `<link rel=\"icon\">`.",
        code: `<link rel="stylesheet" href="/css/main.css" />
<link rel="icon" href="/favicon.ico" sizes="any" />
<link rel="icon" href="/icon.svg" type="image/svg+xml" />`,
        lang: "html",
      },
      {
        h: "Open Graph для соцсетей",
        p: "Теги `og:*` управляют превью при расшаривании ссылки в мессенджерах и соцсетях.",
        code: `<meta property="og:title" content="Курс HTML" />
<meta property="og:description" content="Учимся разметке с нуля" />
<meta property="og:image" content="https://example.com/og-cover.jpg" />
<meta property="og:type" content="website" />`,
        lang: "html",
      },
      {
        h: "preload и preconnect",
        p: "Подсказки браузеру ускоряют загрузку критичных ресурсов и установку соединения с CDN.",
        code: `<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossorigin />`,
        lang: "html",
      },
    ],
    quote:
      "Всё, что влияет на SEO, шрифты и иконки, но не видно в body, обычно живёт в head.",
    outro:
      "Держи head компактным: подключай только нужные ресурсы, иначе первая отрисовка страницы замедлится.",
  },
  {
    slug: "html-encoding",
    title: "Кодировка",
    file: "11-kodirovka.md",
    sortOrder: 10,
    intro:
      "Кодировка определяет, как байты файла превращаются в символы. Неверная кодировка — причина «кракозябр» вместо русского текста.",
    sections: [
      {
        h: "UTF-8 как стандарт",
        p: "UTF-8 поддерживает кириллицу, эмодзи и символы большинства языков. Для веба это де-факто единственный разумный выбор.",
        code: `<meta charset="UTF-8" />`,
        lang: "html",
      },
      {
        h: "Порядок объявления charset",
        p: "Тег charset должен быть в первых 1024 байтах документа — лучше поставить его сразу после `<head>`, до `<title>`.",
        code: `<!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="UTF-8" />
    <title>Кодировка UTF-8</title>
  </head>
  <body>
    <p>Привет, мир! 🌍</p>
  </body>
</html>`,
        lang: "html",
      },
      {
        h: "Кодировка файла в редакторе",
        p: "HTML объявляет кодировку, но сам файл тоже должен быть сохранён в UTF-8. Проверь настройки редактора: «Save with UTF-8» или «UTF-8 without BOM».",
        list: [
          "VS Code: в статус-баре отображается UTF-8",
          "BOM для HTML обычно не нужен",
          "При копировании из Word проверяй спецсимволы",
        ],
      },
      {
        h: "HTML-сущности",
        p: "Некоторые символы в разметке пишут через именованные сущности или числовые коды.",
        code: `<p>Знак &lt; меньше, &amp; амперсанд, &copy; копирайт.</p>
<p>Числовой код: &#8381; — символ рубля.</p>`,
        lang: "html",
      },
      {
        h: "HTTP-заголовок Content-Type",
        p: "Сервер может дополнительно сообщать кодировку в заголовке ответа. Важно, чтобы он совпадал с meta charset.",
        code: `Content-Type: text/html; charset=UTF-8`,
        lang: "html",
      },
    ],
    outro:
      "Если видишь нечитаемый текст — сначала проверь charset в HTML и кодировку сохранения файла.",
  },
  {
    slug: "html-iframe",
    title: "iframe",
    file: "12-iframe.md",
    sortOrder: 11,
    intro:
      "Элемент `<iframe>` встраивает другую HTML-страницу внутрь текущей: карту, видео с хостинга, виджет оплаты. Это отдельный контекст просмотра со своими ограничениями безопасности.",
    sections: [
      {
        h: "Базовое встраивание",
        p: "Атрибут `src` указывает URL встраиваемой страницы. Задавай `width`, `height` или стилизуй через CSS.",
        code: `<iframe
  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
  title="Видеоурок по HTML"
  width="560"
  height="315"
  allowfullscreen
></iframe>`,
        lang: "html",
      },
      {
        h: "title для доступности",
        p: "Атрибут `title` обязателен для скринридеров: он описывает содержимое фрейма.",
        code: `<iframe
  src="/widgets/weather.html"
  title="Прогноз погоды на сегодня"
  width="300"
  height="200"
></iframe>`,
        lang: "html",
      },
      {
        h: "sandbox и безопасность",
        p: "Атрибут `sandbox` ограничивает возможности встроенного документа: скрипты, формы, переходы наверх.",
        code: `<iframe
  src="https://untrusted.example/widget"
  sandbox="allow-scripts allow-same-origin"
  title="Сторонний виджет"
></iframe>`,
        lang: "html",
      },
      {
        h: "loading=\"lazy\"",
        p: "Ленивая загрузка откладывает загрузку iframe до приближения к области видимости — полезно ниже первого экрана.",
        code: `<iframe
  src="/map.html"
  title="Карта офиса"
  loading="lazy"
  width="100%"
  height="400"
></iframe>`,
        lang: "html",
      },
    ],
    table: {
      headers: ["Атрибут", "Назначение"],
      rows: [
        ["src", "Адрес встраиваемой страницы"],
        ["title", "Описание для assistive technologies"],
        ["sandbox", "Ограничения безопасности"],
        ["allowfullscreen", "Разрешить полноэкранный режим"],
        ["loading", "lazy — отложенная загрузка"],
      ],
    },
    outro:
      "Встраивай только доверенные источники и по возможности используй sandbox — iframe расширяет поверхность атаки.",
  },
  {
    slug: "html-global-attributes",
    title: "Глобальные атрибуты",
    file: "13-globalnye-atributy.md",
    sortOrder: 12,
    intro:
      "Глобальные атрибуты можно ставить почти на любой HTML-элемент. Они управляют идентификаторами, классами, доступностью, перетаскиванием и скрытием контента.",
    sections: [
      {
        h: "id и class",
        p: "`id` уникален на странице и нужен для якорей и связи с label. `class` — для CSS и выборки в JS, значений может быть несколько.",
        code: `<p id="lead" class="text text--large highlight">
  Вводный абзац статьи.
</p>`,
        lang: "html",
      },
      {
        h: "hidden и contenteditable",
        p: "`hidden` полностью скрывает элемент от отображения и доступности (если не переопределено CSS). `contenteditable` разрешает редактирование прямо в браузере.",
        code: `<p hidden>Черновик, не показывать пользователю.</p>

<div contenteditable="true">
  Кликни и отредактируй этот текст.
</div>`,
        lang: "html",
      },
      {
        h: "title и lang",
        p: "Атрибут `title` показывает всплывающую подсказку при наведении. `lang` на элементе переопределяет язык фрагмента.",
        code: `<abbr title="HyperText Markup Language">HTML</abbr>

<p>
  Цитата на английском:
  <q lang="en">Practice makes perfect.</q>
</p>`,
        lang: "html",
      },
      {
        h: "draggable и tabindex",
        p: "`draggable=\"true\"` включает drag-and-drop. `tabindex` управляет порядком фокуса с клавиатуры: 0 — в общем порядке, -1 — программный фокус.",
        code: `<div draggable="true" class="card">Перетащи меня</div>

<button type="button" tabindex="0">В фокусе по Tab</button>
<button type="button" tabindex="-1">Только программный фокус</button>`,
        lang: "html",
      },
      {
        h: "style и data-*",
        p: "Инлайн-стили через `style` лучше избегать в пользу классов. Префикс `data-` хранит произвольные данные для скриптов — подробнее в отдельной главе.",
        code: `<span class="badge badge--new">Новинка</span>

<!-- Плохо для поддержки: -->
<p style="color: red; font-size: 20px;">Избегай инлайн-стилей</p>`,
        lang: "html",
      },
    ],
    outro:
      "Не злоупотребляй глобальными атрибутами: id должен быть уникальным, а tabindex — осмысленным для клавиатурной навигации.",
  },
  {
    slug: "html-data-attributes",
    title: "data-атрибуты",
    file: "14-data-atributy.md",
    sortOrder: 13,
    intro:
      "Атрибуты `data-*` хранят произвольные данные прямо в разметке. Их читают CSS и JavaScript, не смешивая структуру страницы с логикой в отдельных скриптах.",
    sections: [
      {
        h: "Синтаксис data-*",
        p: "После префикса `data-` имя пишут в kebab-case. Значение всегда строка.",
        code: `<button
  type="button"
  data-product-id="42"
  data-action="add-to-cart"
>
  В корзину
</button>`,
        lang: "html",
      },
      {
        h: "Чтение в JavaScript",
        p: "Свойство `dataset` преобразует `data-product-id` в `productId`.",
        code: `const button = document.querySelector("[data-action='add-to-cart']");

console.log(button.dataset.productId); // "42"
console.log(button.dataset.action);    // "add-to-cart"`,
        lang: "html",
      },
      {
        h: "data-атрибуты в CSS",
        p: "Селекторы по атрибуту позволяют менять стиль без дополнительных классов.",
        code: `<span data-status="success">Оплачено</span>
<span data-status="error">Ошибка</span>

<style>
  [data-status="success"] {
    color: green;
  }

  [data-status="error"] {
    color: crimson;
  }
</style>`,
        lang: "html",
      },
      {
        h: "Когда использовать data-*",
        list: [
          "Параметры для UI-скриптов: id товара, тип модального окна",
          "Состояние компонента до инициализации JS",
          "Метки для тестов: data-testid=\"login-button\"",
        ],
        p: "Не храни в data-* большие объёмы данных и секреты — они видны в DOM.",
      },
      {
        h: "Вложенные имена",
        p: "Стандарт допускает несколько уровней через дефис: `data-user-role` → `dataset.userRole`.",
        code: `<div data-user-id="7" data-user-role="admin"></div>`,
        lang: "html",
      },
    ],
    outro:
      "data-* — мост между HTML и скриптами. Держи имена понятными и не дублируй одни и те же данные в разных атрибутах.",
  },
  {
    slug: "html-accessibility",
    title: "Доступность a11y",
    file: "15-dostupnost-a11y.md",
    sortOrder: 14,
    intro:
      "Доступность (accessibility, сокращённо a11y) — это практика, при которой сайтом могут пользоваться люди с разными возможностями: со скринридером, только с клавиатуры, при низком зрении.",
    sections: [
      {
        h: "Семантика и заголовки",
        p: "Используй один `<h1>` на страницу и не пропускай уровни заголовков без причины. Семантические теги дают контекст assistive technologies.",
        code: `<main>
  <h1>Личный кабинет</h1>
  <section aria-labelledby="orders-title">
    <h2 id="orders-title">Мои заказы</h2>
    <p>Список последних покупок.</p>
  </section>
</main>`,
        lang: "html",
      },
      {
        h: "alt, label и aria-label",
        p: "У изображений — осмысленный alt. У полей формы — связанный `<label>`. Если видимой подписи нет, помогает `aria-label`.",
        code: `<label for="email">Email</label>
<input id="email" type="email" name="email" autocomplete="email" />

<button type="button" aria-label="Закрыть модальное окно">×</button>`,
        lang: "html",
      },
      {
        h: "Фокус и клавиатура",
        p: "Все интерактивные элементы должны быть доступны с Tab. Не убирай outline без замены видимого фокуса.",
        code: `:focus-visible {
  outline: 2px solid #005fcc;
  outline-offset: 2px;
}`,
        lang: "css",
      },
      {
        h: "ARIA-роли и состояния",
        p: "ARIA дополняет HTML, когда семантики не хватает. Не дублируй то, что уже даёт нативный тег.",
        code: `<div role="alert" aria-live="assertive">
  Не удалось сохранить изменения.
</div>

<button aria-expanded="false" aria-controls="menu-list">
  Меню
</button>
<ul id="menu-list" hidden>...</ul>`,
        lang: "html",
      },
      {
        h: "Контраст и размер текста",
        p: "Текст должен читаться на фоне: минимальный контраст для обычного текста — 4.5:1 (WCAG AA). Не полагайся только на цвет для передачи статуса.",
        list: [
          "Добавляй иконку или текст к цветовому индикатору",
          "Проверяй страницу в режиме эмуляции скринридера",
          "Тестируй навигацию только с клавиатуры",
        ],
      },
    ],
    quote:
      "Доступность — не «фича для немногих», а качество интерфейса для всех пользователей.",
    outro:
      "Начни с семантики, alt, label и фокуса — это даёт больший эффект, чем сложные ARIA-деревья.",
  },
  {
    slug: "html5-api-overview",
    title: "HTML5 API обзор",
    file: "16-html5-api-obzor.md",
    sortOrder: 15,
    intro:
      "Помимо новых тегов HTML5 принёс браузерные API: хранение данных, геолокацию, drag-and-drop и многое другое. Ниже — краткий обзор того, что чаще встречается во фронтенде.",
    sections: [
      {
        h: "localStorage и sessionStorage",
        p: "Web Storage сохраняет пары ключ–значение в браузере. `localStorage` живёт до явной очистки, `sessionStorage` — до закрытия вкладки.",
        code: `localStorage.setItem("theme", "dark");
const theme = localStorage.getItem("theme");

sessionStorage.setItem("draft", JSON.stringify({ title: "Черновик" }));`,
        lang: "html",
      },
      {
        h: "Geolocation API",
        p: "Метод `getCurrentPosition` запрашивает координаты пользователя — только после разрешения.",
        code: `navigator.geolocation.getCurrentPosition(
  (position) => {
    console.log(position.coords.latitude, position.coords.longitude);
  },
  (error) => {
    console.error("Геолокация недоступна:", error.message);
  },
);`,
        lang: "html",
      },
      {
        h: "Drag and Drop API",
        p: "События `dragstart`, `dragover`, `drop` работают с атрибутом `draggable` и `dataTransfer`.",
        code: `item.addEventListener("dragstart", (event) => {
  event.dataTransfer.setData("text/plain", item.id);
});

zone.addEventListener("drop", (event) => {
  event.preventDefault();
  const id = event.dataTransfer.getData("text/plain");
  zone.appendChild(document.getElementById(id));
});`,
        lang: "html",
      },
      {
        h: "History API",
        p: "`pushState` меняет URL без перезагрузки — основа SPA-роутинга.",
        code: `history.pushState({ page: "about" }, "", "/about");
window.addEventListener("popstate", (event) => {
  console.log("Назад/вперёд:", event.state);
});`,
        lang: "html",
      },
      {
        h: "Clipboard и Notifications",
        p: "Современные API требуют действия пользователя и часто — secure context (HTTPS).",
        list: [
          "navigator.clipboard.writeText() — копирование в буфер",
          "Notification.requestPermission() — push-уведомления",
          "Перед использованием проверяй поддержку в MDN",
        ],
      },
    ],
    table: {
      headers: ["API", "Типичное применение"],
      rows: [
        ["Web Storage", "Тема, черновики, настройки UI"],
        ["Geolocation", "Карты, доставка, локальный контент"],
        ["History", "Клиентский роутинг"],
        ["Drag and Drop", "Канбан, загрузка файлов"],
        ["Notifications", "Напоминания в PWA"],
      ],
    },
    outro:
      "HTML5 API — надстройка над разметкой. Сначала освой DOM и события, затем подключай хранилище и геолокацию по задаче.",
  },
  {
    slug: "html-canvas",
    title: "Canvas",
    file: "17-canvas.md",
    sortOrder: 16,
    intro:
      "Элемент `<canvas>` — растровая область для рисования через JavaScript: графики, игры, обработка изображений. Разметка задаёт только размеры холста.",
    sections: [
      {
        h: "Создание canvas",
        p: "Укажи `width` и `height` в HTML или через JS. Контекст рисования получают методом `getContext('2d')`.",
        code: `<canvas id="chart" width="400" height="200"></canvas>

<script>
  const canvas = document.getElementById("chart");
  const ctx = canvas.getContext("2d");
</script>`,
        lang: "html",
      },
      {
        h: "Базовые фигуры",
        p: "2D-контекст рисует прямоугольники, линии и дуги. Цвет заливки и обводки задаётся до вызова методов.",
        code: `ctx.fillStyle = "#4a90e2";
ctx.fillRect(20, 20, 120, 60);

ctx.strokeStyle = "#333";
ctx.lineWidth = 2;
ctx.strokeRect(20, 100, 120, 60);`,
        lang: "html",
      },
      {
        h: "Текст и изображения",
        p: "На холст можно выводить текст и вставлять загруженные картинки.",
        code: `ctx.font = "20px sans-serif";
ctx.fillText("Продажи за месяц", 20, 40);

const img = new Image();
img.src = "logo.png";
img.onload = () => ctx.drawImage(img, 200, 20, 80, 80);`,
        lang: "html",
      },
      {
        h: "Анимация через requestAnimationFrame",
        p: "Для плавной анимации перерисовывай кадр в цикле `requestAnimationFrame`.",
        code: `let x = 0;

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillRect(x, 80, 40, 40);
  x = (x + 2) % canvas.width;
  requestAnimationFrame(draw);
}

draw();`,
        lang: "html",
      },
    ],
    quote:
      "Canvas — пиксели. Для векторной графики и иконок чаще удобнее SVG.",
    outro:
      "Для сложных дашбордов рассмотри готовые библиотеки (Chart.js и аналоги), но понимание 2D context остаётся полезным.",
  },
  {
    slug: "html-svg",
    title: "SVG",
    file: "18-svg.md",
    sortOrder: 17,
    intro:
      "SVG (Scalable Vector Graphics) — векторная графика в XML-разметке. Масштабируется без потери качества и доступна для стилизации через CSS.",
    sections: [
      {
        h: "Inline SVG в HTML",
        p: "SVG можно вставить прямо в документ. Атрибут `viewBox` задаёт систему координат.",
        code: `<svg width="120" height="120" viewBox="0 0 120 120" aria-hidden="true">
  <circle cx="60" cy="60" r="50" fill="#6c5ce7" />
</svg>`,
        lang: "html",
      },
      {
        h: "Базовые фигуры",
        p: "Элементы `<rect>`, `<line>`, `<polygon>`, `<path>` описывают геометрию.",
        code: `<svg viewBox="0 0 200 100" width="200" height="100">
  <rect x="10" y="10" width="80" height="40" rx="8" fill="#dfe6e9" />
  <line x1="110" y1="30" x2="190" y2="30" stroke="#2d3436" stroke-width="4" />
  <polygon points="150,60 170,90 130,90" fill="#00b894" />
</svg>`,
        lang: "html",
      },
      {
        h: "Стилизация через CSS",
        p: "Классы и псевдоклассы работают с SVG так же, как с HTML.",
        code: `<style>
  .icon {
    fill: currentColor;
    transition: transform 0.2s ease;
  }

  .icon:hover {
    transform: scale(1.1);
  }
</style>

<svg class="icon" width="24" height="24" viewBox="0 0 24 24">
  <path d="M12 2l3 7h7l-5.5 4.5 2 7L12 17l-6.5 3.5 2-7L2 9h7z" />
</svg>`,
        lang: "html",
      },
      {
        h: "SVG как img и symbol",
        p: "Внешний файл подключают через `<img src=\"icon.svg\">`. Для спрайтов используют `<symbol>` и `<use>`.",
        code: `<svg style="display: none">
  <symbol id="icon-search" viewBox="0 0 24 24">
    <circle cx="11" cy="11" r="7" />
    <line x1="16" y1="16" x2="21" y2="21" />
  </symbol>
</svg>

<svg width="24" height="24"><use href="#icon-search" /></svg>`,
        lang: "html",
      },
      {
        h: "Доступность SVG",
        p: "Декоративную иконку скрывают `aria-hidden=\"true\"`. Информативную сопровождают `<title>` внутри SVG или текстом рядом.",
        code: `<svg role="img" aria-labelledby="search-title">
  <title id="search-title">Поиск</title>
  <!-- path -->
</svg>`,
        lang: "html",
      },
    ],
    outro:
      "SVG идеален для иконок, логотипов и простых иллюстраций. Для фото по-прежнему используй растровые форматы.",
  },
  {
    slug: "html-seo",
    title: "SEO",
    file: "19-seo.md",
    sortOrder: 18,
    intro:
      "SEO (Search Engine Optimization) — набор практик, помогающих поисковикам понять и показать твою страницу. HTML задаёт фундамент: заголовки, метаданные, структура ссылок.",
    sections: [
      {
        h: "Один h1 и иерархия заголовков",
        p: "Заголовок `<h1>` отражает главную тему. Подзаголовки `<h2>`–`<h6>` раскрывают структуру статьи.",
        code: `<main>
  <h1>Гайд по семантической вёрстке</h1>
  <h2>Зачем нужны семантические теги</h2>
  <h2>Примеры разметки</h2>
  <h3>Шапка и подвал</h3>
</main>`,
        lang: "html",
      },
      {
        h: "title и meta description",
        p: "Уникальные title и description на каждой странице улучшают кликабельность в выдаче.",
        code: `<title>Семантическая разметка HTML — курс для начинающих</title>
<meta
  name="description"
  content="Учим header, main, article и другие теги HTML5 на практических примерах."
/>`,
        lang: "html",
      },
      {
        h: "ЧПУ и канонический URL",
        p: "Человекопонятные URL и тег `link rel=\"canonical\"` снижают дублирование контента.",
        code: `<link rel="canonical" href="https://example.com/courses/html/semantic" />`,
        lang: "html",
      },
      {
        h: "Ссылки и alt у изображений",
        p: "Внутренняя перелинковка помогает обходу сайта. Текст alt описывает изображение для поиска по картинкам.",
        code: `<a href="/courses/html/tables">Следующая глава: таблицы</a>

<img src="semantic-structure.png" alt="Схема семантической структуры страницы" />`,
        lang: "html",
      },
      {
        h: "robots и sitemap",
        p: "Файл `robots.txt` и карта сайта `sitemap.xml` подсказывают роботам, что индексировать. Это не HTML-файлы страницы, но тесно связаны с SEO.",
        list: [
          "Не блокируй важные страницы в robots без причины",
          "Добавляй в sitemap только канонические URL",
          "Проверяй мобильную версию и скорость загрузки",
        ],
      },
    ],
    outro:
      "SEO начинается с чистой семантической разметки и уникальных метаданных — без этого сложные стратегии малоэффективны.",
  },
  {
    slug: "html-schema-org",
    title: "Schema.org",
    file: "20-schema-org.md",
    sortOrder: 19,
    intro:
      "Schema.org — словарь структурированных данных. Разметка в формате JSON-LD помогает поисковикам показывать расширенные сниппеты: звёзды, цены, FAQ.",
    sections: [
      {
        h: "JSON-LD в head или body",
        p: "Данные передают скриптом с типом `application/ld+json`. Это не влияет на отображение страницы.",
        code: `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "HTML с нуля",
  "description": "Базовый курс по разметке веб-страниц",
  "provider": {
    "@type": "Organization",
    "name": "Best Mentor"
  }
}
</script>`,
        lang: "html",
      },
      {
        h: "Разметка статьи",
        p: "Тип `Article` описывает публикацию: заголовок, автор, дата.",
        code: `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Семантическая разметка в HTML5",
  "datePublished": "2026-03-01",
  "author": {
    "@type": "Person",
    "name": "Анна Иванова"
  }
}
</script>`,
        lang: "html",
      },
      {
        h: "Product и Offer",
        p: "Для интернет-магазина указывают товар и предложение с ценой и валютой.",
        code: `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Курс HTML",
  "offers": {
    "@type": "Offer",
    "price": "4990",
    "priceCurrency": "RUB",
    "availability": "https://schema.org/InStock"
  }
}
</script>`,
        lang: "html",
      },
      {
        h: "FAQPage",
        p: "Блок вопрос–ответ может попасть в расширенный результат поиска.",
        code: `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Нужен ли DOCTYPE в HTML5?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Да, короткий <!DOCTYPE html> переводит браузер в стандартный режим."
      }
    }
  ]
}
</script>`,
        lang: "html",
      },
      {
        h: "Проверка разметки",
        p: "Перед публикацией прогоняй JSON-LD через валидатор Google Rich Results Test или Schema Markup Validator.",
        list: [
          "Данные в разметке должны совпадать с видимым контентом",
          "Не размечай скрытый или вводящий в заблуждение текст",
          "Один объект — одна сущность на странице, где это уместно",
        ],
      },
    ],
    outro:
      "Schema.org дополняет SEO, но не заменяет качественный контент и нормальную HTML-структуру.",
  },
  {
    slug: "html-validation",
    title: "Валидация HTML",
    file: "21-validatsiya-html.md",
    sortOrder: 20,
    intro:
      "Валидация проверяет разметку на соответствие стандарту HTML. Валидный код реже ломается в разных браузерах и проще поддерживается.",
    sections: [
      {
        h: "Зачем валидировать",
        list: [
          "Найти незакрытые теги и вложенность «не по правилам»",
          "Убрать устаревшие атрибуты и теги",
          "Упростить отладку странных багов вёрстки",
        ],
      },
      {
        h: "W3C Validator",
        p: "Сервис validator.w3.org принимает URL или вставку кода. Он показывает ошибки и предупреждения с номерами строк.",
        code: `<!-- Ошибка: div внутри p недопустим -->
<p>
  Текст
  <div>Блок внутри абзаца</div>
</p>`,
        lang: "html",
      },
      {
        h: "Типичные ошибки новичков",
        p: "Дублирование id, пропущенный alt, неправильный порядок закрытия тегов — частые находки валидатора.",
        code: `<!-- Плохо: два одинаковых id -->
<div id="main"></div>
<div id="main"></div>

<!-- Лучше: class для повторяющихся блоков -->
<div class="card"></div>
<div class="card"></div>`,
        lang: "html",
      },
      {
        h: "Линтеры в редакторе",
        p: "Расширения вроде HTMLHint или встроенная проверка VS Code подсвечивают проблемы до деплоя.",
        code: `{
  "tagname-lowercase": true,
  "attr-value-double-quotes": true,
  "id-unique": true,
  "tag-pair": true
}`,
        lang: "html",
      },
      {
        h: "Валидность и практика",
        p: "Иногда браузер «прощает» ошибки, но полагаться на это не стоит. Старайся писать разметку, которая проходит валидацию без критических ошибок.",
      },
    ],
    quote:
      "Валидатор — не цель, а инструмент: он указывает на места, где стандарт и браузер могут расходиться во мнении.",
    outro:
      "Проверяй HTML после крупных правок и перед релизом — это дешевле, чем искать баг в продакшене.",
  },
  {
    slug: "html-doctype",
    title: "DOCTYPE",
    file: "22-doctype.md",
    sortOrder: 21,
    intro:
      "Объявление DOCTYPE — первая строка HTML-документа. Оно сообщает браузеру, по каким правилам интерпретировать разметку, и включает стандартный режим отрисовки.",
    sections: [
      {
        h: "DOCTYPE в HTML5",
        p: "В HTML5 достаточно короткой формы. Регистр не важен, но принято писать именно так.",
        code: `<!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="UTF-8" />
    <title>Страница с правильным DOCTYPE</title>
  </head>
  <body></body>
</html>`,
        lang: "html",
      },
      {
        h: "Режимы рендеринга браузера",
        p: "Без DOCTYPE или с устаревшим DOCTYPE браузер может включить quirks mode — эмуляцию старых багов IE. В стандартном режиме (standards mode) поведение предсказуемо.",
        list: [
          "Standards mode — современная модель CSS и HTML",
          "Quirks mode — устаревшие расчёты ширины и отступов",
          "Almost standards mode — редкий промежуточный вариант",
        ],
      },
      {
        h: "DOCTYPE не является тегом HTML",
        p: "Это инструкция парсеру, а не элемент DOM. В документе она встречается один раз и только в начале.",
      },
      {
        h: "Сравнение с HTML4 и XHTML",
        p: "Раньше DOCTYPE был длинным и ссылался на DTD. В учебных и новых проектах используй только HTML5.",
        code: `<!-- HTML5 (используй это) -->
<!DOCTYPE html>

<!-- HTML 4.01 Strict (устаревший пример) -->
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN"
  "http://www.w3.org/TR/html4/strict.dtd">`,
        lang: "html",
      },
      {
        h: "Проверка в DevTools",
        p: "В консоли можно выполнить `document.compatMode`: значение `CSS1Compat` означает стандартный режим, `BackCompat` — quirks mode.",
        code: `console.log(document.compatMode); // "CSS1Compat"`,
        lang: "html",
      },
    ],
    table: {
      headers: ["Режим", "compatMode", "Когда возникает"],
      rows: [
        ["Standards", "CSS1Compat", "Корректный <!DOCTYPE html>"],
        ["Quirks", "BackCompat", "Нет DOCTYPE или устаревший"],
      ],
    },
    outro:
      "Всегда начинай файлы с `<!DOCTYPE html>` — это одна строка, которая избавляет от целого класса проблем совместимости.",
  },
];
