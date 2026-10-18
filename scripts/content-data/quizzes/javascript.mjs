import { q, quiz } from "./helpers.mjs";

export default {
  "js-introduction": quiz([
    q(
      "Где по умолчанию выполняется JavaScript в браузере?",
      "На стороне клиента в браузере",
      ["Только на сервере", "В базе данных", "В CSS-файле"],
    ),
    q(
      "Как подключить внешний JS-файл?",
      "<script src=\"app.js\"></script>",
      ["<link href=\"app.js\">", "<js src=\"app.js\">", "<import src=\"app.js\">"],
    ),
  ]),
  "js-variables-and-types": quiz([
    q(
      "Чем let отличается от const?",
      "const нельзя переназначить, let можно",
      ["const только для чисел", "let только в функциях", "ничем"],
    ),
    q(
      "К какому типу относится typeof null в JavaScript?",
      "\"object\"",
      ["\"null\"", "\"undefined\"", "\"number\""],
    ),
  ]),
  "js-functions-and-dom": quiz([
    q(
      "Что такое DOM?",
      "Объектное представление HTML-документа в браузере",
      ["База данных", "Серверный фреймворк", "Файловая система"],
    ),
    q(
      "Как получить элемент по id?",
      "document.getElementById('id')",
      ["document.query('#id')", "window.getId('id')", "html.find('#id')"],
    ),
  ]),
  "js-operators": quiz([
    q(
      "Что вернёт typeof 42?",
      "\"number\"",
      ["\"integer\"", "\"float\"", "\"NaN\""],
    ),
    q(
      "Чем === отличается от ==?",
      "=== сравнивает без приведения типов",
      ["== строже", "=== всегда false для строк", "ничем"],
    ),
  ]),
  "js-conditionals": quiz([
    q(
      "Какой оператор проверяет несколько вариантов значения?",
      "switch",
      ["for", "map", "reduce"],
    ),
    q(
      "Какое значение считается falsy?",
      "0",
      ["[]", "{}", "\"0\""],
    ),
  ]),
  "js-loops": quiz([
    q(
      "Какой цикл перебирает элементы массива?",
      "for...of",
      ["for...in для массива как лучшая практика", "while только для объектов", "switch"],
    ),
    q(
      "Что делает break внутри цикла?",
      "Прерывает выполнение цикла",
      ["Пропускает одну итерацию", "Создаёт новый массив", "Возвращает значение функции"],
    ),
  ]),
  "js-arrays": quiz([
    q(
      "Что возвращает arr.map(fn)?",
      "Новый массив с преобразованными элементами",
      ["Исходный массив изменённый", "Число", "Boolean"],
    ),
    q(
      "Что делает arr.filter(fn)?",
      "Возвращает новый массив только с элементами, прошедшими проверку",
      ["Сортирует массив", "Суммирует элементы", "Удаляет дубликаты автоматически"],
    ),
  ]),
  "js-objects": quiz([
    q(
      "Как получить значение свойства obj.name эквивалентно?",
      "obj['name']",
      ["obj(name)", "obj->name", "get obj.name"],
    ),
    q(
      "Что такое метод объекта?",
      "Функция, хранящаяся в свойстве объекта",
      ["Отдельный класс CSS", "Тип массива", "HTTP-заголовок"],
    ),
  ]),
  "js-destructuring": quiz([
    q(
      "Что делает const { a, b } = obj?",
      "Извлекает свойства a и b из объекта",
      ["Создаёт копию массива", "Удаляет свойства", "Сортирует ключи"],
    ),
  ]),
  "js-spread-rest": quiz([
    q(
      "Для чего используют ...arr в массиве?",
      "Распаковать элементы другого массива",
      ["Слить объекты без копирования всегда", "Объявить rest-only параметр", "Импортировать модуль"],
    ),
    q(
      "Что делает rest в параметрах function fn(...args)?",
      "Собирает оставшиеся аргументы в массив",
      ["Копирует первый аргумент", "Удаляет последний аргумент", "Превращает массив в объект"],
    ),
  ]),
  "js-arrow-functions": quiz([
    q(
      "Чем стрелочная функция отличается по this?",
      "Не имеет своего this, берёт из внешнего лексического окружения",
      ["Всегда this = window", "this всегда undefined", "this можно менять call/apply только в class"],
    ),
  ]),
  "js-closures": quiz([
    q(
      "Что такое замыкание?",
      "Функция, которая помнит переменные из внешней области видимости",
      ["Глобальная переменная window", "Метод массива map", "Событие click"],
    ),
  ]),
  "js-this": quiz([
    q(
      "Каким будет this в обычном методе obj.method()?",
      "Сам объект obj",
      ["Всегда window", "Всегда undefined", "Первый аргумент функции"],
    ),
  ]),
  "js-es6-classes": quiz([
    q(
      "Что вызывает constructor в классе?",
      "Создание нового экземпляра через new",
      ["Наследование без new", "Импорт модуля", "Экспорт default"],
    ),
    q(
      "Какое ключевое слово наследует класс?",
      "extends",
      ["inherits", "superclass", "prototype"],
    ),
  ]),
  "js-modules": quiz([
    q(
      "Как экспортировать значение по умолчанию?",
      "export default value",
      ["export main value", "module.exports only в браузере без bundler", "import default value"],
    ),
    q(
      "Как импортировать именованный экспорт?",
      "import { foo } from './module.js'",
      ["import foo from { foo }", "require foo", "include foo"],
    ),
  ]),
  "js-promises": quiz([
    q(
      "В каком состоянии Promise после успешного resolve?",
      "fulfilled",
      ["pending forever", "rejected", "cancelled"],
    ),
    q(
      "Что делает .then()?",
      "Обрабатывает успешный результат Promise",
      ["Создаёт новый Promise rejected", "Отменяет fetch", "Синхронно блокирует поток"],
    ),
  ]),
  "js-async-await": quiz([
    q(
      "Где можно использовать await?",
      "Внутри async-функции",
      ["В обычной функции без async", "В CSS", "В HTML-атрибуте"],
    ),
    q(
      "Что вернёт async function, если нет return?",
      "Promise, который резолвится в undefined",
      ["Синхронный undefined без Promise", "Ошибку всегда", "null"],
    ),
  ]),
  "js-fetch-api": quiz([
    q(
      "Что возвращает fetch(url)?",
      "Promise с Response",
      ["Готовый JSON", "XMLHttpRequest", "Строку HTML"],
    ),
    q(
      "Как получить JSON из response?",
      "await response.json()",
      ["response.text() только для JSON", "JSON.parse(response)", "response.data"],
    ),
  ]),
  "js-error-handling": quiz([
    q(
      "Как поймать ошибку в async/await?",
      "try / catch",
      ["if / else", "switch", "finally без try"],
    ),
  ]),
  "js-events": quiz([
    q(
      "Как подписаться на клик по кнопке?",
      "button.addEventListener('click', handler)",
      ["button.onclick = only deprecated always", "button.click(handler)", "listen(button, 'click')"],
    ),
    q(
      "Что делает event.preventDefault()?",
      "Отменяет стандартное поведение браузера",
      ["Удаляет обработчик", "Останавливает всплытие только", "Создаёт новое событие"],
    ),
  ]),
  "js-event-loop": quiz([
    q(
      "Куда попадают колбэки setTimeout?",
      "В очередь задач после текущего стека",
      ["Выполняются синхронно сразу", "В microtask queue всегда", "В CSS engine"],
    ),
    q(
      "Что выполняется раньше: microtask или macrotask?",
      "Microtask (например then) раньше следующей macrotask",
      ["Macrotask всегда раньше", "Одновременно", "Зависит только от setTimeout 0"],
    ),
  ]),
  "js-local-storage": quiz([
    q(
      "Чем localStorage отличается от sessionStorage?",
      "localStorage сохраняется после закрытия вкладки",
      ["sessionStorage больше по объёму", "localStorage только для чисел", "ничем"],
    ),
    q(
      "Как сохранить строку в localStorage?",
      "localStorage.setItem('key', 'value')",
      ["localStorage.key = value only object", "storage.save()", "document.store()"],
    ),
  ]),
};
