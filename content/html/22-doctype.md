# DOCTYPE

Объявление DOCTYPE — первая строка HTML-документа. Оно сообщает браузеру, по каким правилам интерпретировать разметку, и включает стандартный режим отрисовки.

## DOCTYPE в HTML5

В HTML5 достаточно короткой формы. Регистр не важен, но принято писать именно так.

```html
<!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="UTF-8" />
    <title>Страница с правильным DOCTYPE</title>
  </head>
  <body></body>
</html>
```

## Режимы рендеринга браузера

Без DOCTYPE или с устаревшим DOCTYPE браузер может включить quirks mode — эмуляцию старых багов IE. В стандартном режиме (standards mode) поведение предсказуемо.

- Standards mode — современная модель CSS и HTML
- Quirks mode — устаревшие расчёты ширины и отступов
- Almost standards mode — редкий промежуточный вариант

## DOCTYPE не является тегом HTML

Это инструкция парсеру, а не элемент DOM. В документе она встречается один раз и только в начале.

## Сравнение с HTML4 и XHTML

Раньше DOCTYPE был длинным и ссылался на DTD. В учебных и новых проектах используй только HTML5.

```html
<!-- HTML5 (используй это) -->
<!DOCTYPE html>

<!-- HTML 4.01 Strict (устаревший пример) -->
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN"
  "http://www.w3.org/TR/html4/strict.dtd">
```

## Проверка в DevTools

В консоли можно выполнить `document.compatMode`: значение `CSS1Compat` означает стандартный режим, `BackCompat` — quirks mode.

```html
console.log(document.compatMode); // "CSS1Compat"
```

| Режим | compatMode | Когда возникает |
| --- | --- | --- |
| Standards | CSS1Compat | Корректный <!DOCTYPE html> |
| Quirks | BackCompat | Нет DOCTYPE или устаревший |

Всегда начинай файлы с `<!DOCTYPE html>` — это одна строка, которая избавляет от целого класса проблем совместимости.
