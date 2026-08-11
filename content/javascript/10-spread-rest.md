# Spread/rest

Три точки `...` в JavaScript — два связанных, но разных приёма: spread «разворачивает» коллекцию, rest «собирает» остаток.

## Spread в массивах

Копирование, объединение, добавление элементов без мутации.

```js
const base = [1, 2, 3];
const extended = [...base, 4, 5];
const clone = [...base];

clone.push(99);
console.log(base);      // [1, 2, 3]
console.log(extended);  // [1, 2, 3, 4, 5]
```

## Spread в объектах

Поверхностное слияние объектов. Позже поля перезаписывают ранние.

```js
const defaults = { theme: "light", lang: "ru" };
const userPrefs = { theme: "dark" };

const settings = { ...defaults, ...userPrefs };
console.log(settings); // { theme: "dark", lang: "ru" }
```

## Rest в параметрах

Собирает «лишние» аргументы в массив.

```js
function sum(first, ...rest) {
  return rest.reduce((acc, n) => acc + n, first);
}

console.log(sum(1, 2, 3, 4)); // 10
```

## Rest при деструктуризации

```js
const [head, ...tail] = ["a", "b", "c"];
const { id, ...chapterWithoutId } = { id: 1, title: "DOM", slug: "dom" };

console.log(head, tail);
console.log(chapterWithoutId);
```

> Spread создаёт поверхностную копию — вложенные объекты остаются общими. Для глубокого клонирования нужны отдельные утилиты.

Стрелочные функции — ещё один синтаксис объявления функций, популярный в React и современном JS.
