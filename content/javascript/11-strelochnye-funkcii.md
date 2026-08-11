# Стрелочные функции

Стрелочные функции (`=>`) — короткий синтаксис. Они удобны для колбэков в `map`, обработчиков событий и компонентов React.

## Синтаксис

```js
const double = (n) => n * 2;
const greet = (name) => `Привет, ${name}`;

const sum = (a, b) => {
  const result = a + b;
  return result;
};

console.log(double(4), greet("ментор"), sum(2, 3));
```

## Неявный return

Если тело — одно выражение без фигурных скобок, результат возвращается автоматически.

```js
const isEven = (n) => n % 2 === 0;
const toUpper = (s) => s.toUpperCase();

console.log(isEven(4), toUpper("js"));
```

## Колбэки массивов

```js
const chapters = [
  { title: "HTML", sortOrder: 0 },
  { title: "CSS", sortOrder: 1 },
];

const titles = chapters.map((ch) => ch.title);
const sorted = [...chapters].sort((a, b) => a.sortOrder - b.sortOrder);

console.log(titles, sorted);
```

## Когда не использовать стрелку

Стрелочные функции не имеют своего `this` и не подходят как методы объекта или конструктор. Для конструкторов — `class` или `function`.

- Колбэки в map/filter — стрелка отлично
- Методы объекта с нужным `this` — обычная function
- Обработчики, где важен `this` элемента DOM — осторожно

Стрелки часто создают внутри других функций — это ведёт к замыканиям.
