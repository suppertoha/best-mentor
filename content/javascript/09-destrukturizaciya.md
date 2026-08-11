# Деструктуризация

Деструктуризация извлекает значения из массивов и объектов в отдельные переменные. В React она повсюду — props, хуки, ответы API.

## Деструктуризация массива

Порядок переменных соответствует порядку элементов. Можно пропускать и задавать значения по умолчанию.

```js
const pair = ["react", 18];
const [name, version] = pair;

const [first, , third] = [1, 2, 3];
const [head, ...rest] = [10, 20, 30];

console.log(name, version, third, rest);
```

## Деструктуризация объекта

Имена переменных совпадают с ключами (или задаются через `:`).

```js
const chapter = { id: 5, title: "Массивы", slug: "js-arrays" };
const { title, slug } = chapter;

const { sortOrder = 0 } = { title: "Без порядка" };
console.log(title, slug, sortOrder);
```

## В параметрах функции

Удобно принимать объект настроек вместо длинного списка аргументов.

```js
function createChapter({ title, slug, sortOrder = 0 }) {
  return { title, slug, sortOrder };
}

const ch = createChapter({
  title: "Promises",
  slug: "js-promises",
});
console.log(ch);
```

## Вложенная деструктуризация

```js
const response = {
  data: {
    user: { email: "admin@example.com", role: "admin" },
  },
};

const {
  data: {
    user: { email },
  },
} = response;

console.log(email);
```

Вместе с деструктуризацией часто используют операторы spread и rest.
