# Циклы

Циклы перебирают коллекции и повторяют код. В JavaScript есть классические `for`/`while` и современные методы массивов.

## for

Цикл с счётчиком — когда известно количество итераций или нужен индекс.

```js
for (let i = 0; i < 3; i++) {
  console.log("Итерация", i);
}

const chapters = ["HTML", "CSS", "JS"];
for (let i = 0; i < chapters.length; i++) {
  console.log(i, chapters[i]);
}
```

## while и do...while

`while` проверяет условие до входа в тело. `do...while` выполнит тело хотя бы один раз.

```js
let attempts = 0;
while (attempts < 3) {
  console.log("Попытка", attempts);
  attempts++;
}

let input;
do {
  input = prompt("Введите да");
} while (input !== "да");
```

## for...of

Современный способ перебрать элементы массива или строки без ручного индекса.

```js
const tags = ["react", "typescript", "vite"];

for (const tag of tags) {
  console.log(tag.toUpperCase());
}

for (const char of "JS") {
  console.log(char);
}
```

## break и continue

`break` прерывает цикл, `continue` переходит к следующей итерации.

```js
for (let n = 1; n <= 10; n++) {
  if (n === 5) continue;
  if (n === 8) break;
  console.log(n);
}
// 1, 2, 3, 4, 6, 7
```

Для работы со списками данных в JS чаще всего используют массивы — разберём их подробнее в следующей главе.
