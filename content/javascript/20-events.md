# Events

События — сигналы браузера о действиях пользователя или системы. JavaScript подписывается на них и реагирует.

## addEventListener

```js
const button = document.querySelector("#save");

button.addEventListener("click", (event) => {
  console.log("Клик!", event.target);
});
```

## Объект события

Полезные поля: `target`, `currentTarget`, `preventDefault()`, `stopPropagation()`.

```js
const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
  event.preventDefault(); // не перезагружать страницу
  const data = new FormData(form);
  console.log(Object.fromEntries(data));
});
```

## Делегирование событий

Один обработчик на родителе вместо сотен на дочерних элементах — удобно для списков.

```js
const list = document.querySelector(".chapters-list");

list.addEventListener("click", (event) => {
  const item = event.target.closest("[data-chapter-id]");
  if (!item) return;

  const id = item.dataset.chapterId;
  console.log("Открыть главу", id);
});
```

## События в React

В React обработчики передаются как props: `onClick`, `onChange`. Синтетическое событие оборачивает нативное, но идея та же.

```jsx
function SaveButton({ onSave }) {
  return (
  <button type="button" onClick={() => onSave()}>
    Сохранить
  </button>
  );
}
```

Под капотом браузер обрабатывает события и асинхронные задачи через event loop.
