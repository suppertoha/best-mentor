# data-атрибуты

Атрибуты `data-*` хранят произвольные данные прямо в разметке. Их читают CSS и JavaScript, не смешивая структуру страницы с логикой в отдельных скриптах.

## Синтаксис data-*

После префикса `data-` имя пишут в kebab-case. Значение всегда строка.

```html
<button
  type="button"
  data-product-id="42"
  data-action="add-to-cart"
>
  В корзину
</button>
```

## Чтение в JavaScript

Свойство `dataset` преобразует `data-product-id` в `productId`.

```html
const button = document.querySelector("[data-action='add-to-cart']");

console.log(button.dataset.productId); // "42"
console.log(button.dataset.action);    // "add-to-cart"
```

## data-атрибуты в CSS

Селекторы по атрибуту позволяют менять стиль без дополнительных классов.

```html
<span data-status="success">Оплачено</span>
<span data-status="error">Ошибка</span>

<style>
  [data-status="success"] {
    color: green;
  }

  [data-status="error"] {
    color: crimson;
  }
</style>
```

## Когда использовать data-*

Не храни в data-* большие объёмы данных и секреты — они видны в DOM.

- Параметры для UI-скриптов: id товара, тип модального окна
- Состояние компонента до инициализации JS
- Метки для тестов: data-testid="login-button"

## Вложенные имена

Стандарт допускает несколько уровней через дефис: `data-user-role` → `dataset.userRole`.

```html
<div data-user-id="7" data-user-role="admin"></div>
```

data-* — мост между HTML и скриптами. Держи имена понятными и не дублируй одни и те же данные в разных атрибутах.
