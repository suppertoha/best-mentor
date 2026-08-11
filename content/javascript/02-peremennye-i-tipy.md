# Переменные и типы

## Объявление переменных

```js
const PI = 3.14;       // константа, не переприсваивается
let count = 0;         // можно менять
count = count + 1;

// var — старый стиль, в новом коде не используй
```

**Правило:** по умолчанию `const`, `let` — только если значение будет меняться.

## Примитивные типы

```js
const title = "Best Mentor";  // string
const year = 2026;            // number
const isAdmin = true;         // boolean
let empty;                    // undefined
const nothing = null;         // null
```

Проверка типа:

```js
console.log(typeof title);    // "string"
console.log(typeof isAdmin);  // "boolean"
```

## Строки

```js
const greeting = "Привет";
const name = "Анна";
const message = `${greeting}, ${name}!`; // шаблонная строка

console.log(message); // "Привет, Анна!"
```

## Массивы

```js
const sections = ["HTML", "CSS", "JavaScript"];

console.log(sections[0]);  // "HTML"
console.log(sections.length); // 3

sections.push("TypeScript");
```

## Объекты

```js
const user = {
  id: 1,
  email: "student@example.com",
  role: "STUDENT",
};

console.log(user.email);
console.log(user["role"]);
```

В Best Mentor объект пользователя в Redux похож по идее: `id`, `email`, `role`, `firstName`…

## Сравнение

```js
console.log(5 == "5");   // true  — нестрогое (избегай)
console.log(5 === "5");  // false — строгое (используй)
console.log(null === undefined); // false
```

## Условия

```js
const role = "ADMIN";

if (role === "ADMIN") {
  console.log("Показать кнопки редактирования");
} else {
  console.log("Только просмотр");
}
```

## Циклы

```js
const chapters = ["Введение", "Теги", "Формы"];

for (const chapter of chapters) {
  console.log(chapter);
}

chapters.forEach((chapter) => {
  console.log(chapter);
});
```

## Практика

Создай объект `chapter` с полями `title`, `slug`, `content` и выведи заголовок в консоль.
