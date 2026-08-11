# Массивы

Массив — упорядоченный список значений. В Best Mentor списки разделов и глав на фронтенде — это массивы объектов.

## Создание и доступ

Индексация с нуля. `length` — количество элементов.

```js
const sections = ["HTML", "CSS", "JavaScript"];

console.log(sections[0]);    // "HTML"
console.log(sections.at(-1)); // "JavaScript" — последний элемент
console.log(sections.length); // 3
```

## Изменение массива

Методы `push`, `pop`, `unshift`, `shift` добавляют и удаляют элементы.

```js
const queue = ["a"];
queue.push("b");      // в конец
queue.unshift("z");   // в начало
console.log(queue);   // ["z", "a", "b"]

const last = queue.pop();
console.log(last, queue); // "b", ["z", "a"]
```

## map, filter, find

Функциональные методы не мутируют исходный массив — возвращают новый результат.

```js
const prices = [100, 250, 80];

const withTax = prices.map((price) => price * 1.2);
const expensive = prices.filter((price) => price >= 100);
const firstBig = prices.find((price) => price >= 200);

console.log(withTax);   // [120, 300, 96]
console.log(expensive); // [100, 250]
console.log(firstBig);  // 250
```

## reduce и spread

`reduce` сводит массив к одному значению. Spread копирует элементы.

```js
const nums = [1, 2, 3, 4];
const sum = nums.reduce((acc, n) => acc + n, 0);

const a = [1, 2];
const b = [...a, 3, 4];
console.log(sum, b); // 10, [1, 2, 3, 4]
```

Объекты описывают сущности с именованными полями — пользователь, глава, раздел курса.
