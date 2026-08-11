/** Контент курса JavaScript для генерации markdown-глав. */

export default [
  {
    slug: "js-introduction",
    title: "Введение",
    file: "01-vvedenie.md",
    sortOrder: 0,
    skip: true,
  },
  {
    slug: "js-variables-and-types",
    title: "Переменные и типы",
    file: "02-peremennye-i-tipy.md",
    sortOrder: 1,
    skip: true,
  },
  {
    slug: "js-functions-and-dom",
    title: "Функции и DOM",
    file: "03-funkcii-i-dom.md",
    sortOrder: 2,
    skip: true,
  },
  {
    slug: "js-operators",
    title: "Операторы",
    file: "04-operatory.md",
    sortOrder: 3,
    intro:
      "Операторы позволяют выполнять вычисления, сравнивать значения и комбинировать логические условия. Это базовый инструмент любой программы на JavaScript.",
    sections: [
      {
        h: "Арифметические операторы",
        p: "Стандартные математические действия работают с числами. Оператор `%` возвращает остаток от деления.",
        code: `const a = 10;
const b = 3;

console.log(a + b);  // 13
console.log(a - b);  // 7
console.log(a * b);  // 30
console.log(a / b);  // 3.333...
console.log(a % b);  // 1`,
        lang: "js",
      },
      {
        h: "Сравнение: == и ===",
        p: "`==` приводит типы, `===` сравнивает строго — значение и тип. В современном коде почти всегда используй `===`.",
        code: `console.log(5 == "5");   // true
console.log(5 === "5");  // false
console.log(null == undefined);  // true
console.log(null === undefined); // false`,
        lang: "js",
      },
      {
        h: "Логические операторы",
        p: "`&&` — «и», `||` — «или», `!` — отрицание. Они часто применяются в условиях и при задании значений по умолчанию.",
        code: `const isAdmin = true;
const isLoggedIn = false;

console.log(isAdmin && isLoggedIn); // false
console.log(isAdmin || isLoggedIn); // true

const username = "";
const displayName = username || "Гость";
console.log(displayName); // "Гость"`,
        lang: "js",
      },
      {
        h: "Операторы присваивания и инкремент",
        p: "Сокращённые формы (`+=`, `-=`) удобны при обновлении переменных. `++` увеличивает значение на 1.",
        code: `let score = 0;
score += 10;
score++;
console.log(score); // 11

let x = 5;
const result = x++ + 2; // сначала x (5), потом инкремент
console.log(result, x); // 7, 6`,
        lang: "js",
      },
    ],
    table: {
      headers: ["Оператор", "Название", "Пример"],
      rows: [
        ["+", "сложение", "2 + 3 → 5"],
        ["===", "строгое равенство", "5 === 5 → true"],
        ["&&", "логическое И", "true && false → false"],
        ["??", "nullish coalescing", "null ?? 'да' → 'да'"],
      ],
    },
    outro:
      "Дальше применим операторы в условных конструкциях — `if`, `switch` и тернарном операторе.",
  },
  {
    slug: "js-conditionals",
    title: "Условия",
    file: "05-usloviya.md",
    sortOrder: 4,
    intro:
      "Условия позволяют выполнять разный код в зависимости от ситуации: показать кнопку админу, скрыть форму после отправки, обработать ошибку.",
    sections: [
      {
        h: "if / else if / else",
        p: "Классическая ветвление: проверяем условие и выбираем блок кода.",
        code: `const role = "admin";

if (role === "admin") {
  console.log("Полный доступ");
} else if (role === "user") {
  console.log("Обычный пользователь");
} else {
  console.log("Гость");
}`,
        lang: "js",
      },
      {
        h: "Тернарный оператор",
        p: "Короткая запись для простого выбора из двух значений. Часто встречается в JSX React.",
        code: `const isLoggedIn = true;
const label = isLoggedIn ? "Выйти" : "Войти";

const price = 1200;
const message = price > 1000 ? "Дорого" : "Нормально";
console.log(label, message);`,
        lang: "js",
      },
      {
        h: "switch",
        p: "Удобен, когда одна переменная может принимать несколько фиксированных значений.",
        code: `const status = "published";

switch (status) {
  case "draft":
    console.log("Черновик");
    break;
  case "published":
    console.log("Опубликовано");
    break;
  default:
    console.log("Неизвестный статус");
}`,
        lang: "js",
      },
      {
        h: "Truthy и falsy",
        p: "В условиях неявно проверяется «истинность» значения. Falsy: `false`, `0`, `\"\"`, `null`, `undefined`, `NaN`.",
        code: `const title = "";
if (title) {
  console.log(title);
} else {
  console.log("Заголовок не задан");
}

const items = [];
if (items.length) {
  console.log("Есть элементы");
}`,
        lang: "js",
      },
    ],
    quote:
      "Условие должно быть читаемым: если логика разрастается — вынеси проверку в отдельную функцию с говорящим именем.",
    outro:
      "Когда нужно повторить действие много раз — используй циклы.",
  },
  {
    slug: "js-loops",
    title: "Циклы",
    file: "06-cikly.md",
    sortOrder: 5,
    intro:
      "Циклы перебирают коллекции и повторяют код. В JavaScript есть классические `for`/`while` и современные методы массивов.",
    sections: [
      {
        h: "for",
        p: "Цикл с счётчиком — когда известно количество итераций или нужен индекс.",
        code: `for (let i = 0; i < 3; i++) {
  console.log("Итерация", i);
}

const chapters = ["HTML", "CSS", "JS"];
for (let i = 0; i < chapters.length; i++) {
  console.log(i, chapters[i]);
}`,
        lang: "js",
      },
      {
        h: "while и do...while",
        p: "`while` проверяет условие до входа в тело. `do...while` выполнит тело хотя бы один раз.",
        code: `let attempts = 0;
while (attempts < 3) {
  console.log("Попытка", attempts);
  attempts++;
}

let input;
do {
  input = prompt("Введите да");
} while (input !== "да");`,
        lang: "js",
      },
      {
        h: "for...of",
        p: "Современный способ перебрать элементы массива или строки без ручного индекса.",
        code: `const tags = ["react", "typescript", "vite"];

for (const tag of tags) {
  console.log(tag.toUpperCase());
}

for (const char of "JS") {
  console.log(char);
}`,
        lang: "js",
      },
      {
        h: "break и continue",
        p: "`break` прерывает цикл, `continue` переходит к следующей итерации.",
        code: `for (let n = 1; n <= 10; n++) {
  if (n === 5) continue;
  if (n === 8) break;
  console.log(n);
}
// 1, 2, 3, 4, 6, 7`,
        lang: "js",
      },
    ],
    outro:
      "Для работы со списками данных в JS чаще всего используют массивы — разберём их подробнее в следующей главе.",
  },
  {
    slug: "js-arrays",
    title: "Массивы",
    file: "07-massivy.md",
    sortOrder: 6,
    intro:
      "Массив — упорядоченный список значений. В Best Mentor списки разделов и глав на фронтенде — это массивы объектов.",
    sections: [
      {
        h: "Создание и доступ",
        p: "Индексация с нуля. `length` — количество элементов.",
        code: `const sections = ["HTML", "CSS", "JavaScript"];

console.log(sections[0]);    // "HTML"
console.log(sections.at(-1)); // "JavaScript" — последний элемент
console.log(sections.length); // 3`,
        lang: "js",
      },
      {
        h: "Изменение массива",
        p: "Методы `push`, `pop`, `unshift`, `shift` добавляют и удаляют элементы.",
        code: `const queue = ["a"];
queue.push("b");      // в конец
queue.unshift("z");   // в начало
console.log(queue);   // ["z", "a", "b"]

const last = queue.pop();
console.log(last, queue); // "b", ["z", "a"]`,
        lang: "js",
      },
      {
        h: "map, filter, find",
        p: "Функциональные методы не мутируют исходный массив — возвращают новый результат.",
        code: `const prices = [100, 250, 80];

const withTax = prices.map((price) => price * 1.2);
const expensive = prices.filter((price) => price >= 100);
const firstBig = prices.find((price) => price >= 200);

console.log(withTax);   // [120, 300, 96]
console.log(expensive); // [100, 250]
console.log(firstBig);  // 250`,
        lang: "js",
      },
      {
        h: "reduce и spread",
        p: "`reduce` сводит массив к одному значению. Spread копирует элементы.",
        code: `const nums = [1, 2, 3, 4];
const sum = nums.reduce((acc, n) => acc + n, 0);

const a = [1, 2];
const b = [...a, 3, 4];
console.log(sum, b); // 10, [1, 2, 3, 4]`,
        lang: "js",
      },
    ],
    outro:
      "Объекты описывают сущности с именованными полями — пользователь, глава, раздел курса.",
  },
  {
    slug: "js-objects",
    title: "Объекты",
    file: "08-obekty.md",
    sortOrder: 7,
    intro:
      "Объект хранит данные в виде пар «ключ — значение». API Best Mentor возвращает объекты: раздел, глава, профиль пользователя.",
    sections: [
      {
        h: "Литерал объекта",
        p: "Создаём фигурными скобками. Ключи — строки (или символы), значения — любой тип.",
        code: `const chapter = {
  id: 1,
  title: "Введение",
  slug: "js-introduction",
  isPublished: true,
};

console.log(chapter.title);
console.log(chapter["slug"]);`,
        lang: "js",
      },
      {
        h: "Методы объекта",
        p: "Функция внутри объекта называется методом. В современном синтаксисе пишут сокращённо.",
        code: `const user = {
  name: "Анна",
  greet() {
    return \`Привет, \${this.name}!\`;
  },
};

console.log(user.greet());`,
        lang: "js",
      },
      {
        h: "Изменение и копирование",
        p: "Объекты передаются по ссылке. Для поверхностной копии — `spread` или `Object.assign`.",
        code: `const original = { a: 1, nested: { b: 2 } };
const copy = { ...original };

copy.a = 99;
copy.nested.b = 99;

console.log(original.a);        // 1
console.log(original.nested.b); // 99 — вложенность общая!`,
        lang: "js",
      },
      {
        h: "Object.keys, values, entries",
        p: "Утилиты для перебора свойств объекта.",
        code: `const section = { slug: "javascript", title: "JavaScript", sortOrder: 2 };

console.log(Object.keys(section));   // ["slug", "title", "sortOrder"]
console.log(Object.values(section)); // ["javascript", "JavaScript", 2]

for (const [key, value] of Object.entries(section)) {
  console.log(key, value);
}`,
        lang: "js",
      },
    ],
    outro:
      "Деструктуризация — удобный способ «распаковать» поля объекта и элементы массива в переменные.",
  },
  {
    slug: "js-destructuring",
    title: "Деструктуризация",
    file: "09-destrukturizaciya.md",
    sortOrder: 8,
    intro:
      "Деструктуризация извлекает значения из массивов и объектов в отдельные переменные. В React она повсюду — props, хуки, ответы API.",
    sections: [
      {
        h: "Деструктуризация массива",
        p: "Порядок переменных соответствует порядку элементов. Можно пропускать и задавать значения по умолчанию.",
        code: `const pair = ["react", 18];
const [name, version] = pair;

const [first, , third] = [1, 2, 3];
const [head, ...rest] = [10, 20, 30];

console.log(name, version, third, rest);`,
        lang: "js",
      },
      {
        h: "Деструктуризация объекта",
        p: "Имена переменных совпадают с ключами (или задаются через `:`).",
        code: `const chapter = { id: 5, title: "Массивы", slug: "js-arrays" };
const { title, slug } = chapter;

const { sortOrder = 0 } = { title: "Без порядка" };
console.log(title, slug, sortOrder);`,
        lang: "js",
      },
      {
        h: "В параметрах функции",
        p: "Удобно принимать объект настроек вместо длинного списка аргументов.",
        code: `function createChapter({ title, slug, sortOrder = 0 }) {
  return { title, slug, sortOrder };
}

const ch = createChapter({
  title: "Promises",
  slug: "js-promises",
});
console.log(ch);`,
        lang: "js",
      },
      {
        h: "Вложенная деструктуризация",
        code: `const response = {
  data: {
    user: { email: "admin@example.com", role: "admin" },
  },
};

const {
  data: {
    user: { email },
  },
} = response;

console.log(email);`,
        lang: "js",
      },
    ],
    outro:
      "Вместе с деструктуризацией часто используют операторы spread и rest.",
  },
  {
    slug: "js-spread-rest",
    title: "Spread/rest",
    file: "10-spread-rest.md",
    sortOrder: 9,
    intro:
      "Три точки `...` в JavaScript — два связанных, но разных приёма: spread «разворачивает» коллекцию, rest «собирает» остаток.",
    sections: [
      {
        h: "Spread в массивах",
        p: "Копирование, объединение, добавление элементов без мутации.",
        code: `const base = [1, 2, 3];
const extended = [...base, 4, 5];
const clone = [...base];

clone.push(99);
console.log(base);      // [1, 2, 3]
console.log(extended);  // [1, 2, 3, 4, 5]`,
        lang: "js",
      },
      {
        h: "Spread в объектах",
        p: "Поверхностное слияние объектов. Позже поля перезаписывают ранние.",
        code: `const defaults = { theme: "light", lang: "ru" };
const userPrefs = { theme: "dark" };

const settings = { ...defaults, ...userPrefs };
console.log(settings); // { theme: "dark", lang: "ru" }`,
        lang: "js",
      },
      {
        h: "Rest в параметрах",
        p: "Собирает «лишние» аргументы в массив.",
        code: `function sum(first, ...rest) {
  return rest.reduce((acc, n) => acc + n, first);
}

console.log(sum(1, 2, 3, 4)); // 10`,
        lang: "js",
      },
      {
        h: "Rest при деструктуризации",
        code: `const [head, ...tail] = ["a", "b", "c"];
const { id, ...chapterWithoutId } = { id: 1, title: "DOM", slug: "dom" };

console.log(head, tail);
console.log(chapterWithoutId);`,
        lang: "js",
      },
    ],
    quote:
      "Spread создаёт поверхностную копию — вложенные объекты остаются общими. Для глубокого клонирования нужны отдельные утилиты.",
    outro:
      "Стрелочные функции — ещё один синтаксис объявления функций, популярный в React и современном JS.",
  },
  {
    slug: "js-arrow-functions",
    title: "Стрелочные функции",
    file: "11-strelochnye-funkcii.md",
    sortOrder: 10,
    intro:
      "Стрелочные функции (`=>`) — короткий синтаксис. Они удобны для колбэков в `map`, обработчиков событий и компонентов React.",
    sections: [
      {
        h: "Синтаксис",
        code: `const double = (n) => n * 2;
const greet = (name) => \`Привет, \${name}\`;

const sum = (a, b) => {
  const result = a + b;
  return result;
};

console.log(double(4), greet("ментор"), sum(2, 3));`,
        lang: "js",
      },
      {
        h: "Неявный return",
        p: "Если тело — одно выражение без фигурных скобок, результат возвращается автоматически.",
        code: `const isEven = (n) => n % 2 === 0;
const toUpper = (s) => s.toUpperCase();

console.log(isEven(4), toUpper("js"));`,
        lang: "js",
      },
      {
        h: "Колбэки массивов",
        code: `const chapters = [
  { title: "HTML", sortOrder: 0 },
  { title: "CSS", sortOrder: 1 },
];

const titles = chapters.map((ch) => ch.title);
const sorted = [...chapters].sort((a, b) => a.sortOrder - b.sortOrder);

console.log(titles, sorted);`,
        lang: "js",
      },
      {
        h: "Когда не использовать стрелку",
        p: "Стрелочные функции не имеют своего `this` и не подходят как методы объекта или конструктор. Для конструкторов — `class` или `function`.",
        list: [
          "Колбэки в map/filter — стрелка отлично",
          "Методы объекта с нужным `this` — обычная function",
          "Обработчики, где важен `this` элемента DOM — осторожно",
        ],
      },
    ],
    outro:
      "Стрелки часто создают внутри других функций — это ведёт к замыканиям.",
  },
  {
    slug: "js-closures",
    title: "Замыкания",
    file: "12-zamykanya.md",
    sortOrder: 11,
    intro:
      "Замыкание — когда внутренняя функция «помнит» переменные внешней, даже после того как внешняя завершилась. Это основа приватности и фабрик функций.",
    sections: [
      {
        h: "Простой пример",
        code: `function makeCounter() {
  let count = 0;

  return function () {
    count++;
    return count;
  };
}

const counter = makeCounter();
console.log(counter()); // 1
console.log(counter()); // 2`,
        lang: "js",
      },
      {
        h: "Приватные данные",
        p: "Снаружи нет доступа к `count` — только через возвращённую функцию.",
        code: `function createUser(name) {
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
console.log(user.getName(), user.getToken());`,
        lang: "js",
      },
      {
        h: "Замыкание в цикле",
        p: "Классическая ловушка: `var` в цикле. Решение — `let` или IIFE.",
        code: `// Плохо с var:
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log("var", i), 0);
}
// 3, 3, 3

// Хорошо с let:
for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log("let", j), 0);
}
// 0, 1, 2`,
        lang: "js",
      },
      {
        h: "Замыкания в React",
        p: "Хуки (`useState`, `useEffect`) опираются на замыкания: обработчик «видит» актуальное состояние на момент создания. Отсюда правила зависимостей в `useEffect`.",
      },
    ],
    outro:
      "Тесно связан с замыканиями контекст `this` — разберём его отдельно.",
  },
  {
    slug: "js-this",
    title: "this",
    file: "13-this.md",
    sortOrder: 12,
    intro:
      "`this` — ссылка на контекст вызова функции. Его значение зависит от того, **как** вызвали функцию, а не где она объявлена.",
    sections: [
      {
        h: "this в методе объекта",
        code: `const user = {
  name: "Иван",
  sayHi() {
    console.log(\`Привет, \${this.name}\`);
  },
};

user.sayHi(); // Привет, Иван`,
        lang: "js",
      },
      {
        h: "Потеря контекста",
        p: "Если метод передать как колбэк, `this` может стать `undefined` (в strict mode) или глобальным объектом.",
        code: `const user = {
  name: "Иван",
  sayHi() {
    console.log(this.name);
  },
};

const fn = user.sayHi;
// fn(); // ошибка или пусто

const bound = user.sayHi.bind(user);
bound(); // Иван`,
        lang: "js",
      },
      {
        h: "call, apply, bind",
        code: `function greet(greeting) {
  console.log(\`\${greeting}, \${this.name}\`);
}

const person = { name: "Мария" };

greet.call(person, "Привет");
greet.apply(person, ["Здравствуй"]);

const greetMaria = greet.bind(person);
greetMaria("Хай");`,
        lang: "js",
      },
      {
        h: "Стрелочные функции и this",
        p: "У стрелок нет своего `this` — они берут `this` из окружающей области. В классах React-компонентов это редко нужно благодаря хукам.",
        code: `const obj = {
  value: 42,
  regular() {
    setTimeout(function () {
      // this не obj
      console.log(this);
    }, 0);
  },
  arrow() {
    setTimeout(() => {
      console.log(this.value); // 42
    }, 0);
  },
};`,
        lang: "js",
      },
    ],
    outro:
      "В ES6 появился синтаксис `class` — он строится поверх прототипов, но читается привычнее.",
  },
  {
    slug: "js-es6-classes",
    title: "Классы ES6",
    file: "14-klassy-es6.md",
    sortOrder: 13,
    intro:
      "Классы — синтаксический сахар над прототипным наследованием JavaScript. Удобны для моделей данных и сервисов.",
    sections: [
      {
        h: "Объявление класса",
        code: `class Chapter {
  constructor(title, slug) {
    this.title = title;
    this.slug = slug;
  }

  getLabel() {
    return \`\${this.title} (\${this.slug})\`;
  }
}

const ch = new Chapter("Массивы", "js-arrays");
console.log(ch.getLabel());`,
        lang: "js",
      },
      {
        h: "Геттеры и сеттеры",
        code: `class User {
  #passwordHash = "";

  constructor(email) {
    this.email = email;
  }

  get displayEmail() {
    return this.email.toLowerCase();
  }

  set password(value) {
    this.#passwordHash = \`hash:\${value}\`;
  }
}

const u = new User("Admin@Example.com");
u.password = "123";
console.log(u.displayEmail);`,
        lang: "js",
      },
      {
        h: "Наследование extends",
        code: `class PublishedChapter extends Chapter {
  constructor(title, slug, publishedAt) {
    super(title, slug);
    this.publishedAt = publishedAt;
  }

  isNew() {
    const week = 7 * 24 * 60 * 60 * 1000;
    return Date.now() - this.publishedAt < week;
  }
}`,
        lang: "js",
      },
      {
        h: "Статические методы",
        code: `class IdGenerator {
  static next() {
    return Math.random().toString(36).slice(2, 9);
  }
}

console.log(IdGenerator.next());`,
        lang: "js",
      },
    ],
    outro:
      "Крупные приложения разбивают на модули — отдельные файлы с экспортом и импортом.",
  },
  {
    slug: "js-modules",
    title: "Модули",
    file: "15-moduli.md",
    sortOrder: 14,
    intro:
      "ES-модули (`import` / `export`) позволяют делить код на файлы. Vite и React в Best Mentor используют именно этот стандарт.",
    sections: [
      {
        h: "export и import",
        code: `// math.js
export const PI = 3.14;
export function add(a, b) {
  return a + b;
}

// app.js
import { PI, add } from "./math.js";
console.log(PI, add(2, 3));`,
        lang: "js",
      },
      {
        h: "export default",
        p: "Один «главный» экспорт на файл — компонент, конфиг, класс.",
        code: `// Button.js
export default function Button({ children }) {
  return children;
}

// Page.js
import Button from "./Button.js";`,
        lang: "js",
      },
      {
        h: "Переименование и реэкспорт",
        code: `import { add as sum } from "./math.js";

export { add } from "./math.js";
export { default as Button } from "./Button.js";`,
        lang: "js",
      },
      {
        h: "Динамический import",
        p: "Загрузка модуля по требованию — основа code splitting в React (`React.lazy`).",
        code: `async function loadChapterPage() {
  const module = await import("./ChapterPage.js");
  return module.default;
}`,
        lang: "js",
      },
    ],
    table: {
      headers: ["Синтаксис", "Назначение"],
      rows: [
        ["export const x", "именованный экспорт"],
        ["export default fn", "экспорт по умолчанию"],
        ["import { x } from '...'", "именованный импорт"],
        ["import fn from '...'", "импорт default"],
      ],
    },
    outro:
      "Асинхронный код в JS строится на Promises — обещаниях результата в будущем.",
  },
  {
    slug: "js-promises",
    title: "Promises",
    file: "16-promises.md",
    sortOrder: 15,
    intro:
      "Promise (обещание) представляет результат асинхронной операции: успех (`resolve`) или ошибку (`reject`). Axios и fetch возвращают thenable-объекты.",
    sections: [
      {
        h: "Создание Promise",
        code: `const delay = (ms) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(\`готово через \${ms}мс\`), ms);
  });

delay(300).then((message) => console.log(message));`,
        lang: "js",
      },
      {
        h: "then, catch, finally",
        code: `fetch("/api/sections")
  .then((response) => {
    if (!response.ok) throw new Error("HTTP " + response.status);
    return response.json();
  })
  .then((data) => console.log(data))
  .catch((error) => console.error(error.message))
  .finally(() => console.log("запрос завершён"));`,
        lang: "js",
      },
      {
        h: "Promise.all и Promise.race",
        code: `const p1 = delay(100);
const p2 = delay(200);

Promise.all([p1, p2]).then(([a, b]) => console.log(a, b));
Promise.race([p1, p2]).then((first) => console.log("первый:", first));`,
        lang: "js",
      },
      {
        h: "Цепочки и возврат значений",
        p: "Каждый `then` может вернуть новое значение или Promise — образуется цепочка без «callback hell».",
        code: `delay(50)
  .then(() => "шаг 1")
  .then((msg) => msg + " → шаг 2")
  .then(console.log);`,
        lang: "js",
      },
    ],
    outro:
      "Синтаксис `async/await` делает работу с Promise похожей на обычный последовательный код.",
  },
  {
    slug: "js-async-await",
    title: "async/await",
    file: "17-async-await.md",
    sortOrder: 16,
    intro:
      "`async` помечает функцию как асинхронную, `await` приостанавливает её до завершения Promise. Так написаны сервисы и хуки в Best Mentor.",
    sections: [
      {
        h: "Базовый синтаксис",
        code: `async function loadSections() {
  const response = await fetch("/api/sections");
  const sections = await response.json();
  return sections;
}

loadSections().then(console.log);`,
        lang: "js",
      },
      {
        h: "try/catch с await",
        code: `async function login(email, password) {
  try {
    const response = await fetch("/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Неверный логин или пароль");
    }

    return await response.json();
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}`,
        lang: "js",
      },
      {
        h: "Параллельные запросы",
        p: "Последовательные `await` замедляют код. Независимые задачи запускай параллельно.",
        code: `async function loadDashboard() {
  const [sections, profile] = await Promise.all([
    fetch("/api/sections").then((r) => r.json()),
    fetch("/api/profile").then((r) => r.json()),
  ]);

  return { sections, profile };
}`,
        lang: "js",
      },
      {
        h: "async в колбэках",
        p: "Колбэк может быть `async`, но ошибки нужно ловить внутри или обрабатывать через `.catch()` у возвращённого Promise.",
        code: `button.addEventListener("click", async () => {
  try {
    await saveChapter();
  } catch (e) {
    console.error(e);
  }
});`,
        lang: "js",
      },
    ],
    outro:
      "Самый частый асинхронный API в браузере — `fetch` для HTTP-запросов.",
  },
  {
    slug: "js-fetch-api",
    title: "Fetch API",
    file: "18-fetch-api.md",
    sortOrder: 17,
    intro:
      "`fetch` — встроенный способ делать HTTP-запросы. В Best Mentor поверх него часто стоит axios с interceptors для токена и тостов об ошибках.",
    sections: [
      {
        h: "GET-запрос",
        code: `async function getChapters(sectionId) {
  const response = await fetch(\`/api/sections/\${sectionId}/chapters\`);

  if (!response.ok) {
    throw new Error(\`Ошибка \${response.status}\`);
  }

  return response.json();
}`,
        lang: "js",
      },
      {
        h: "POST с JSON",
        code: `async function createChapter(sectionId, body) {
  const response = await fetch(\`/api/sections/\${sectionId}/chapters\`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: \`Bearer \${token}\`,
    },
    body: JSON.stringify(body),
  });

  return response.json();
}`,
        lang: "js",
      },
      {
        h: "Другие методы и тело",
        p: "PATCH, DELETE — тот же `fetch`, меняются `method` и `body`. Для FormData заголовок Content-Type не задают вручную.",
        code: `await fetch(\`/chapters/\${id}\`, {
  method: "PATCH",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ content: "# Обновлённый markdown" }),
});

await fetch(\`/chapters/\${id}\`, { method: "DELETE" });`,
        lang: "js",
      },
      {
        h: "Отмена запроса (AbortController)",
        code: `const controller = new AbortController();

fetch("/api/sections", { signal: controller.signal })
  .then((r) => r.json())
  .catch((err) => {
    if (err.name === "AbortError") {
      console.log("запрос отменён");
    }
  });

controller.abort();`,
        lang: "js",
      },
    ],
    outro:
      "Любой асинхронный код нужно уметь обрабатывать при ошибках — следующая тема.",
  },
  {
    slug: "js-error-handling",
    title: "Обработка ошибок",
    file: "19-obrabotka-oshibok.md",
    sortOrder: 18,
    intro:
      "Ошибки неизбежны: сеть падает, API возвращает 500, пользователь вводит неверные данные. Важно ловить их и сообщать понятно.",
    sections: [
      {
        h: "try / catch / finally",
        code: `function parseJson(text) {
  try {
    return JSON.parse(text);
  } catch (error) {
    console.error("Невалидный JSON:", error.message);
    return null;
  } finally {
    console.log("parseJson завершён");
  }
}`,
        lang: "js",
      },
      {
        h: "throw — генерация ошибки",
        code: `function requireAuth(token) {
  if (!token) {
    throw new Error("Требуется авторизация");
  }
}

try {
  requireAuth(null);
} catch (e) {
  console.log(e.message);
}`,
        lang: "js",
      },
      {
        h: "Кастомные классы ошибок",
        code: `class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

async function request(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new ApiError("Запрос не удался", response.status);
  }
  return response.json();
}`,
        lang: "js",
      },
      {
        h: "Глобальные обработчики",
        p: "В браузере: `window.onerror` и `unhandledrejection` для необработанных ошибок и отклонённых Promise.",
        code: `window.addEventListener("unhandledrejection", (event) => {
  console.error("Необработанный Promise:", event.reason);
});`,
        lang: "js",
      },
    ],
    quote:
      "В Best Mentor ошибки API показываются тостом в interceptor — не дублируй showErrorToast в каждом catch компонента.",
    outro:
      "Интерактивность в браузере строится на событиях — клики, ввод, отправка форм.",
  },
  {
    slug: "js-events",
    title: "Events",
    file: "20-events.md",
    sortOrder: 19,
    intro:
      "События — сигналы браузера о действиях пользователя или системы. JavaScript подписывается на них и реагирует.",
    sections: [
      {
        h: "addEventListener",
        code: `const button = document.querySelector("#save");

button.addEventListener("click", (event) => {
  console.log("Клик!", event.target);
});`,
        lang: "js",
      },
      {
        h: "Объект события",
        p: "Полезные поля: `target`, `currentTarget`, `preventDefault()`, `stopPropagation()`.",
        code: `const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
  event.preventDefault(); // не перезагружать страницу
  const data = new FormData(form);
  console.log(Object.fromEntries(data));
});`,
        lang: "js",
      },
      {
        h: "Делегирование событий",
        p: "Один обработчик на родителе вместо сотен на дочерних элементах — удобно для списков.",
        code: `const list = document.querySelector(".chapters-list");

list.addEventListener("click", (event) => {
  const item = event.target.closest("[data-chapter-id]");
  if (!item) return;

  const id = item.dataset.chapterId;
  console.log("Открыть главу", id);
});`,
        lang: "js",
      },
      {
        h: "События в React",
        p: "В React обработчики передаются как props: `onClick`, `onChange`. Синтетическое событие оборачивает нативное, но идея та же.",
        code: `function SaveButton({ onSave }) {
  return (
  <button type="button" onClick={() => onSave()}>
    Сохранить
  </button>
  );
}`,
        lang: "jsx",
      },
    ],
    outro:
      "Под капотом браузер обрабатывает события и асинхронные задачи через event loop.",
  },
  {
    slug: "js-event-loop",
    title: "Event loop",
    file: "21-event-loop.md",
    sortOrder: 20,
    intro:
      "JavaScript однопоточен: в один момент выполняется один участок кода. Event loop координирует стек вызовов, очереди задач и микрозадачи.",
    sections: [
      {
        h: "Стек вызовов",
        code: `function a() {
  b();
}
function b() {
  console.log("в стеке");
}
a();`,
        lang: "js",
      },
      {
        h: "Макрозадачи и микрозадачи",
        p: "`setTimeout` — макрозадача. `Promise.then` — микрозадача, выполняется раньше следующей макрозадачи.",
        code: `console.log("1");

setTimeout(() => console.log("2 timeout"), 0);

Promise.resolve().then(() => console.log("3 microtask"));

console.log("4");

// 1, 4, 3 microtask, 2 timeout`,
        lang: "js",
      },
      {
        h: "Блокировка и async",
        p: "Долгие синхронные вычисления блокируют UI. Тяжёлую работу выноси в Web Worker или дроби на части.",
        code: `// Плохо — зависнет интерфейс
// for (let i = 0; i < 1e10; i++) {}

// Хорошо — отдать результат позже
async function heavy() {
  return new Promise((resolve) => {
    setTimeout(() => resolve("готово"), 0);
  });
}`,
        lang: "js",
      },
      {
        h: "requestAnimationFrame",
        p: "Для плавной анимации браузер вызывает колбэк перед отрисовкой кадра — отдельная очередь от `setTimeout`.",
        code: `function animate() {
  // обновить позицию
  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);`,
        lang: "js",
      },
    ],
    table: {
      headers: ["Механизм", "Пример", "Когда выполняется"],
      rows: [
        ["Синхронный код", "console.log", "Сразу"],
        ["Микрозадача", "queueMicrotask, .then", "После текущего стека"],
        ["Макрозадача", "setTimeout, fetch callback", "После микрозадач"],
        ["rAF", "requestAnimationFrame", "Перед paint"],
      ],
    },
    outro:
      "Для сохранения данных между визитами в браузере используют localStorage.",
  },
  {
    slug: "js-local-storage",
    title: "localStorage",
    file: "22-local-storage.md",
    sortOrder: 21,
    intro:
      "`localStorage` хранит строки в браузере без срока годности. В Best Mentor там лежит только `accessToken` — пользователь хранится в Redux.",
    sections: [
      {
        h: "setItem, getItem, removeItem",
        code: `localStorage.setItem("theme", "dark");
const theme = localStorage.getItem("theme");
console.log(theme); // "dark"

localStorage.removeItem("theme");
localStorage.clear(); // осторожно — всё`,
        lang: "js",
      },
      {
        h: "Хранение объектов через JSON",
        p: "localStorage принимает только строки. Объекты сериализуй через `JSON.stringify`.",
        code: `const prefs = { lang: "ru", fontSize: 16 };
localStorage.setItem("prefs", JSON.stringify(prefs));

const saved = JSON.parse(localStorage.getItem("prefs") || "{}");
console.log(saved.lang);`,
        lang: "js",
      },
      {
        h: "Токен авторизации",
        code: `const TOKEN_KEY = "accessToken";

export function saveToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}`,
        lang: "js",
      },
      {
        h: "Ограничения и безопасность",
        list: [
          "Лимит ~5 МБ на домен",
          "Доступен только на клиенте — не для секретов на сервере",
          "XSS может украсть токен из localStorage — важна санитизация HTML",
          "Для чувствительных сценариев рассматривают httpOnly cookies",
        ],
      },
      {
        h: "sessionStorage",
        p: "Аналог localStorage, но данные живут только в рамках вкладки до её закрытия.",
        code: `sessionStorage.setItem("draft", "# Черновик главы");
console.log(sessionStorage.getItem("draft"));`,
        lang: "js",
      },
    ],
    quote:
      "Не клади в localStorage большие объекты пользователя — держи минимум (токен), остальное подгружай с API.",
    outro:
      "Поздравляем: базовый JavaScript пройден. Дальше — TypeScript и React в контексте Best Mentor.",
  },
];
