# Promises

Promise (обещание) представляет результат асинхронной операции: успех (`resolve`) или ошибку (`reject`). Axios и fetch возвращают thenable-объекты.

## Создание Promise

```js
const delay = (ms) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(`готово через ${ms}мс`), ms);
  });

delay(300).then((message) => console.log(message));
```

## then, catch, finally

```js
fetch("/api/sections")
  .then((response) => {
    if (!response.ok) throw new Error("HTTP " + response.status);
    return response.json();
  })
  .then((data) => console.log(data))
  .catch((error) => console.error(error.message))
  .finally(() => console.log("запрос завершён"));
```

## Promise.all и Promise.race

```js
const p1 = delay(100);
const p2 = delay(200);

Promise.all([p1, p2]).then(([a, b]) => console.log(a, b));
Promise.race([p1, p2]).then((first) => console.log("первый:", first));
```

## Цепочки и возврат значений

Каждый `then` может вернуть новое значение или Promise — образуется цепочка без «callback hell».

```js
delay(50)
  .then(() => "шаг 1")
  .then((msg) => msg + " → шаг 2")
  .then(console.log);
```

Синтаксис `async/await` делает работу с Promise похожей на обычный последовательный код.
