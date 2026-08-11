# Замыкания

Замыкание — когда внутренняя функция «помнит» переменные внешней, даже после того как внешняя завершилась. Это основа приватности и фабрик функций.

## Простой пример

```js
function makeCounter() {
  let count = 0;

  return function () {
    count++;
    return count;
  };
}

const counter = makeCounter();
console.log(counter()); // 1
console.log(counter()); // 2
```

## Приватные данные

Снаружи нет доступа к `count` — только через возвращённую функцию.

```js
function createUser(name) {
  let token = null;

  return {
    getName: () => name,
    login(newToken) {
      token = newToken;
    },
    getToken: () => token,
  };
}

const user = createUser("Анна");
user.login("secret");
console.log(user.getName(), user.getToken());
```

## Замыкание в цикле

Классическая ловушка: `var` в цикле. Решение — `let` или IIFE.

```js
// Плохо с var:
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log("var", i), 0);
}
// 3, 3, 3

// Хорошо с let:
for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log("let", j), 0);
}
// 0, 1, 2
```

## Замыкания в React

Хуки (`useState`, `useEffect`) опираются на замыкания: обработчик «видит» актуальное состояние на момент создания. Отсюда правила зависимостей в `useEffect`.

Тесно связан с замыканиями контекст `this` — разберём его отдельно.
