# localStorage

`localStorage` хранит строки в браузере без срока годности. В Best Mentor там лежит только `accessToken` — пользователь хранится в Redux.

## setItem, getItem, removeItem

```js
localStorage.setItem("theme", "dark");
const theme = localStorage.getItem("theme");
console.log(theme); // "dark"

localStorage.removeItem("theme");
localStorage.clear(); // осторожно — всё
```

## Хранение объектов через JSON

localStorage принимает только строки. Объекты сериализуй через `JSON.stringify`.

```js
const prefs = { lang: "ru", fontSize: 16 };
localStorage.setItem("prefs", JSON.stringify(prefs));

const saved = JSON.parse(localStorage.getItem("prefs") || "{}");
console.log(saved.lang);
```

## Токен авторизации

```js
const TOKEN_KEY = "accessToken";

export function saveToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}
```

## Ограничения и безопасность

- Лимит ~5 МБ на домен
- Доступен только на клиенте — не для секретов на сервере
- XSS может украсть токен из localStorage — важна санитизация HTML
- Для чувствительных сценариев рассматривают httpOnly cookies

## sessionStorage

Аналог localStorage, но данные живут только в рамках вкладки до её закрытия.

```js
sessionStorage.setItem("draft", "# Черновик главы");
console.log(sessionStorage.getItem("draft"));
```

> Не клади в localStorage большие объекты пользователя — держи минимум (токен), остальное подгружай с API.

Поздравляем: базовый JavaScript пройден. Дальше — TypeScript и React в контексте Best Mentor.
