# Операторы

Операторы позволяют выполнять вычисления, сравнивать значения и комбинировать логические условия. Это базовый инструмент любой программы на JavaScript.

## Арифметические операторы

Стандартные математические действия работают с числами. Оператор `%` возвращает остаток от деления.

```js
const a = 10;
const b = 3;

console.log(a + b);  // 13
console.log(a - b);  // 7
console.log(a * b);  // 30
console.log(a / b);  // 3.333...
console.log(a % b);  // 1
```

## Сравнение: == и ===

`==` приводит типы, `===` сравнивает строго — значение и тип. В современном коде почти всегда используй `===`.

```js
console.log(5 == "5");   // true
console.log(5 === "5");  // false
console.log(null == undefined);  // true
console.log(null === undefined); // false
```

## Логические операторы

`&&` — «и», `||` — «или», `!` — отрицание. Они часто применяются в условиях и при задании значений по умолчанию.

```js
const isAdmin = true;
const isLoggedIn = false;

console.log(isAdmin && isLoggedIn); // false
console.log(isAdmin || isLoggedIn); // true

const username = "";
const displayName = username || "Гость";
console.log(displayName); // "Гость"
```

## Операторы присваивания и инкремент

Сокращённые формы (`+=`, `-=`) удобны при обновлении переменных. `++` увеличивает значение на 1.

```js
let score = 0;
score += 10;
score++;
console.log(score); // 11

let x = 5;
const result = x++ + 2; // сначала x (5), потом инкремент
console.log(result, x); // 7, 6
```

| Оператор | Название | Пример |
| --- | --- | --- |
| + | сложение | 2 + 3 → 5 |
| === | строгое равенство | 5 === 5 → true |
| && | логическое И | true && false → false |
| ?? | nullish coalescing | null ?? 'да' → 'да' |

Дальше применим операторы в условных конструкциях — `if`, `switch` и тернарном операторе.
