# Fetch API

`fetch` — встроенный способ делать HTTP-запросы. В Best Mentor поверх него часто стоит axios с interceptors для токена и тостов об ошибках.

## GET-запрос

```js
async function getChapters(sectionId) {
  const response = await fetch(`/api/sections/${sectionId}/chapters`);

  if (!response.ok) {
    throw new Error(`Ошибка ${response.status}`);
  }

  return response.json();
}
```

## POST с JSON

```js
async function createChapter(sectionId, body) {
  const response = await fetch(`/api/sections/${sectionId}/chapters`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  return response.json();
}
```

## Другие методы и тело

PATCH, DELETE — тот же `fetch`, меняются `method` и `body`. Для FormData заголовок Content-Type не задают вручную.

```js
await fetch(`/chapters/${id}`, {
  method: "PATCH",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ content: "# Обновлённый markdown" }),
});

await fetch(`/chapters/${id}`, { method: "DELETE" });
```

## Отмена запроса (AbortController)

```js
const controller = new AbortController();

fetch("/api/sections", { signal: controller.signal })
  .then((r) => r.json())
  .catch((err) => {
    if (err.name === "AbortError") {
      console.log("запрос отменён");
    }
  });

controller.abort();
```

Любой асинхронный код нужно уметь обрабатывать при ошибках — следующая тема.
