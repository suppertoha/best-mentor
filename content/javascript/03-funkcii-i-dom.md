# Функции и DOM

## Функции

**Функция** — переиспользуемый блок кода.

```js
function greet(name) {
  return `Привет, ${name}!`;
}

console.log(greet("ментор"));
```

Стрелочная функция (часто в React):

```js
const add = (a, b) => a + b;

console.log(add(2, 3)); // 5
```

Асинхронная функция (запросы к API):

```js
async function fetchSections() {
  const response = await fetch("/api/sections");
  const data = await response.json();
  return data;
}
```

В нашем проекте то же самое делает `sectionsService.getAll()` через axios.

## DOM

**DOM** (Document Object Model) — представление HTML как дерева объектов, с которым можно работать из JS.

```html
<button id="save-btn">Сохранить</button>
<p class="status"></p>
```

```js
const button = document.querySelector("#save-btn");
const status = document.querySelector(".status");

button.addEventListener("click", () => {
  status.textContent = "Сохранено!";
});
```

## Частые методы

| Метод | Действие |
| ----- | -------- |
| `document.querySelector(selector)` | Найти первый элемент |
| `document.querySelectorAll(selector)` | Найти все |
| `element.textContent = "..."` | Текст элемента |
| `element.classList.add("active")` | Добавить класс |
| `element.addEventListener("click", fn)` | Обработчик события |

## Пример: переключение темы (упрощённо)

```js
const toggle = document.querySelector("#theme-toggle");
const root = document.documentElement;

toggle.addEventListener("click", () => {
  root.classList.toggle("dark-theme");
});
```

## React vs чистый DOM

В **Best Mentor** мы почти не трогаем DOM напрямую. React сам обновляет интерфейс при изменении state:

```tsx
const [isEditing, setIsEditing] = useState(false);

// JSX — декларативное описание UI
return (
  <button onClick={() => setIsEditing(true)}>Редактировать</button>
);
```

Но понимание DOM важно: под капотом React всё равно меняет реальные элементы страницы.

## Связь с нашим проектом

| Чистый JS | Best Mentor |
| --------- | ----------- |
| `fetch` + token | `axios` + `setupApiAuth` |
| `localStorage.setItem` | `loginWithToken` + Redux |
| `document.querySelector` | React-компоненты |
| `addEventListener` | `onClick`, `onSubmit` в JSX |

## Практика

На странице с кнопкой и параграфом: по клику меняй текст параграфа. Открой DevTools и посмотри, как меняется DOM.
