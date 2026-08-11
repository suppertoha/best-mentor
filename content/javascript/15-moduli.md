# Модули

ES-модули (`import` / `export`) позволяют делить код на файлы. Vite и React в Best Mentor используют именно этот стандарт.

## export и import

```js
// math.js
export const PI = 3.14;
export function add(a, b) {
  return a + b;
}

// app.js
import { PI, add } from "./math.js";
console.log(PI, add(2, 3));
```

## export default

Один «главный» экспорт на файл — компонент, конфиг, класс.

```js
// Button.js
export default function Button({ children }) {
  return children;
}

// Page.js
import Button from "./Button.js";
```

## Переименование и реэкспорт

```js
import { add as sum } from "./math.js";

export { add } from "./math.js";
export { default as Button } from "./Button.js";
```

## Динамический import

Загрузка модуля по требованию — основа code splitting в React (`React.lazy`).

```js
async function loadChapterPage() {
  const module = await import("./ChapterPage.js");
  return module.default;
}
```

| Синтаксис | Назначение |
| --- | --- |
| export const x | именованный экспорт |
| export default fn | экспорт по умолчанию |
| import { x } from '...' | именованный импорт |
| import fn from '...' | импорт default |

Асинхронный код в JS строится на Promises — обещаниях результата в будущем.
