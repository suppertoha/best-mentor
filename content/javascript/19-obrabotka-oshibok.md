# Обработка ошибок

Ошибки неизбежны: сеть падает, API возвращает 500, пользователь вводит неверные данные. Важно ловить их и сообщать понятно.

## try / catch / finally

```js
function parseJson(text) {
  try {
    return JSON.parse(text);
  } catch (error) {
    console.error("Невалидный JSON:", error.message);
    return null;
  } finally {
    console.log("parseJson завершён");
  }
}
```

## throw — генерация ошибки

```js
function requireAuth(token) {
  if (!token) {
    throw new Error("Требуется авторизация");
  }
}

try {
  requireAuth(null);
} catch (e) {
  console.log(e.message);
}
```

## Кастомные классы ошибок

```js
class ApiError extends Error {
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
}
```

## Глобальные обработчики

В браузере: `window.onerror` и `unhandledrejection` для необработанных ошибок и отклонённых Promise.

```js
window.addEventListener("unhandledrejection", (event) => {
  console.error("Необработанный Promise:", event.reason);
});
```

> В Best Mentor ошибки API показываются тостом в interceptor — не дублируй showErrorToast в каждом catch компонента.

Интерактивность в браузере строится на событиях — клики, ввод, отправка форм.
