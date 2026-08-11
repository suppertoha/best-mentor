# Объекты

Объект хранит данные в виде пар «ключ — значение». API Best Mentor возвращает объекты: раздел, глава, профиль пользователя.

## Литерал объекта

Создаём фигурными скобками. Ключи — строки (или символы), значения — любой тип.

```js
const chapter = {
  id: 1,
  title: "Введение",
  slug: "js-introduction",
  isPublished: true,
};

console.log(chapter.title);
console.log(chapter["slug"]);
```

## Методы объекта

Функция внутри объекта называется методом. В современном синтаксисе пишут сокращённо.

```js
const user = {
  name: "Анна",
  greet() {
    return `Привет, ${this.name}!`;
  },
};

console.log(user.greet());
```

## Изменение и копирование

Объекты передаются по ссылке. Для поверхностной копии — `spread` или `Object.assign`.

```js
const original = { a: 1, nested: { b: 2 } };
const copy = { ...original };

copy.a = 99;
copy.nested.b = 99;

console.log(original.a);        // 1
console.log(original.nested.b); // 99 — вложенность общая!
```

## Object.keys, values, entries

Утилиты для перебора свойств объекта.

```js
const section = { slug: "javascript", title: "JavaScript", sortOrder: 2 };

console.log(Object.keys(section));   // ["slug", "title", "sortOrder"]
console.log(Object.values(section)); // ["javascript", "JavaScript", 2]

for (const [key, value] of Object.entries(section)) {
  console.log(key, value);
}
```

Деструктуризация — удобный способ «распаковать» поля объекта и элементы массива в переменные.
