# Event loop

JavaScript однопоточен: в один момент выполняется один участок кода. Event loop координирует стек вызовов, очереди задач и микрозадачи.

## Стек вызовов

```js
function a() {
  b();
}
function b() {
  console.log("в стеке");
}
a();
```

## Макрозадачи и микрозадачи

`setTimeout` — макрозадача. `Promise.then` — микрозадача, выполняется раньше следующей макрозадачи.

```js
console.log("1");

setTimeout(() => console.log("2 timeout"), 0);

Promise.resolve().then(() => console.log("3 microtask"));

console.log("4");

// 1, 4, 3 microtask, 2 timeout
```

## Блокировка и async

Долгие синхронные вычисления блокируют UI. Тяжёлую работу выноси в Web Worker или дроби на части.

```js
// Плохо — зависнет интерфейс
// for (let i = 0; i < 1e10; i++) {}

// Хорошо — отдать результат позже
async function heavy() {
  return new Promise((resolve) => {
    setTimeout(() => resolve("готово"), 0);
  });
}
```

## requestAnimationFrame

Для плавной анимации браузер вызывает колбэк перед отрисовкой кадра — отдельная очередь от `setTimeout`.

```js
function animate() {
  // обновить позицию
  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);
```

| Механизм | Пример | Когда выполняется |
| --- | --- | --- |
| Синхронный код | console.log | Сразу |
| Микрозадача | queueMicrotask, .then | После текущего стека |
| Макрозадача | setTimeout, fetch callback | После микрозадач |
| rAF | requestAnimationFrame | Перед paint |

Для сохранения данных между визитами в браузере используют localStorage.
