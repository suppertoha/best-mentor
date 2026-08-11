# HTML5 API обзор

Помимо новых тегов HTML5 принёс браузерные API: хранение данных, геолокацию, drag-and-drop и многое другое. Ниже — краткий обзор того, что чаще встречается во фронтенде.

## localStorage и sessionStorage

Web Storage сохраняет пары ключ–значение в браузере. `localStorage` живёт до явной очистки, `sessionStorage` — до закрытия вкладки.

```html
localStorage.setItem("theme", "dark");
const theme = localStorage.getItem("theme");

sessionStorage.setItem("draft", JSON.stringify({ title: "Черновик" }));
```

## Geolocation API

Метод `getCurrentPosition` запрашивает координаты пользователя — только после разрешения.

```html
navigator.geolocation.getCurrentPosition(
  (position) => {
    console.log(position.coords.latitude, position.coords.longitude);
  },
  (error) => {
    console.error("Геолокация недоступна:", error.message);
  },
);
```

## Drag and Drop API

События `dragstart`, `dragover`, `drop` работают с атрибутом `draggable` и `dataTransfer`.

```html
item.addEventListener("dragstart", (event) => {
  event.dataTransfer.setData("text/plain", item.id);
});

zone.addEventListener("drop", (event) => {
  event.preventDefault();
  const id = event.dataTransfer.getData("text/plain");
  zone.appendChild(document.getElementById(id));
});
```

## History API

`pushState` меняет URL без перезагрузки — основа SPA-роутинга.

```html
history.pushState({ page: "about" }, "", "/about");
window.addEventListener("popstate", (event) => {
  console.log("Назад/вперёд:", event.state);
});
```

## Clipboard и Notifications

Современные API требуют действия пользователя и часто — secure context (HTTPS).

- navigator.clipboard.writeText() — копирование в буфер
- Notification.requestPermission() — push-уведомления
- Перед использованием проверяй поддержку в MDN

| API | Типичное применение |
| --- | --- |
| Web Storage | Тема, черновики, настройки UI |
| Geolocation | Карты, доставка, локальный контент |
| History | Клиентский роутинг |
| Drag and Drop | Канбан, загрузка файлов |
| Notifications | Напоминания в PWA |

HTML5 API — надстройка над разметкой. Сначала освой DOM и события, затем подключай хранилище и геолокацию по задаче.
