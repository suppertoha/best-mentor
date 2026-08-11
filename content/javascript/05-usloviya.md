# Условия

Условия позволяют выполнять разный код в зависимости от ситуации: показать кнопку админу, скрыть форму после отправки, обработать ошибку.

## if / else if / else

Классическая ветвление: проверяем условие и выбираем блок кода.

```js
const role = "admin";

if (role === "admin") {
  console.log("Полный доступ");
} else if (role === "user") {
  console.log("Обычный пользователь");
} else {
  console.log("Гость");
}
```

## Тернарный оператор

Короткая запись для простого выбора из двух значений. Часто встречается в JSX React.

```js
const isLoggedIn = true;
const label = isLoggedIn ? "Выйти" : "Войти";

const price = 1200;
const message = price > 1000 ? "Дорого" : "Нормально";
console.log(label, message);
```

## switch

Удобен, когда одна переменная может принимать несколько фиксированных значений.

```js
const status = "published";

switch (status) {
  case "draft":
    console.log("Черновик");
    break;
  case "published":
    console.log("Опубликовано");
    break;
  default:
    console.log("Неизвестный статус");
}
```

## Truthy и falsy

В условиях неявно проверяется «истинность» значения. Falsy: `false`, `0`, `""`, `null`, `undefined`, `NaN`.

```js
const title = "";
if (title) {
  console.log(title);
} else {
  console.log("Заголовок не задан");
}

const items = [];
if (items.length) {
  console.log("Есть элементы");
}
```

> Условие должно быть читаемым: если логика разрастается — вынеси проверку в отдельную функцию с говорящим именем.

Когда нужно повторить действие много раз — используй циклы.
