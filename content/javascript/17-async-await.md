# async/await

`async` помечает функцию как асинхронную, `await` приостанавливает её до завершения Promise. Так написаны сервисы и хуки в Best Mentor.

## Базовый синтаксис

```js
async function loadSections() {
  const response = await fetch("/api/sections");
  const sections = await response.json();
  return sections;
}

loadSections().then(console.log);
```

## try/catch с await

```js
async function login(email, password) {
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
}
```

## Параллельные запросы

Последовательные `await` замедляют код. Независимые задачи запускай параллельно.

```js
async function loadDashboard() {
  const [sections, profile] = await Promise.all([
    fetch("/api/sections").then((r) => r.json()),
    fetch("/api/profile").then((r) => r.json()),
  ]);

  return { sections, profile };
}
```

## async в колбэках

Колбэк может быть `async`, но ошибки нужно ловить внутри или обрабатывать через `.catch()` у возвращённого Promise.

```js
button.addEventListener("click", async () => {
  try {
    await saveChapter();
  } catch (e) {
    console.error(e);
  }
});
```

Самый частый асинхронный API в браузере — `fetch` для HTTP-запросов.
