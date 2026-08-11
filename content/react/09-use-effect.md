# useEffect

`useEffect` запускает код **после** рендера: загрузка данных, подписки, синхронизация с внешним миром. Не используй его для вычисления того, что можно посчитать прямо в render.

## Базовый эффект

```tsx
useEffect(() => {
  document.title = `Глава: ${chapterTitle}`;
}, [chapterTitle]);
```

## Массив зависимостей

Пустой `[]` — один раз при монтировании. Без массива — после каждого рендера (редко нужно). С зависимостями — при их изменении.

- `[]` — mount (restore сессии)
- `[id]` — при смене id
- `[a, b]` — при изменении a или b

## Cleanup

Функция, возвращаемая из эффекта, вызывается перед следующим запуском и при размонтировании.

```tsx
useEffect(() => {
  const timer = setInterval(() => tick(), 1000);
  return () => clearInterval(timer);
}, []);
```

## Загрузка при старте (Best Mentor)

В `useAuthSession` при монтировании читают токен из localStorage и запрашивают профиль.

```tsx
useEffect(() => {
  const savedToken = localStorage.getItem(TOKEN_STORAGE_KEY);

  if (!savedToken) {
    dispatch(clearToken());
    return;
  }

  profileService
    .getProfile(savedToken, undefined, { skipErrorToast: true })
    .then((user) => {
      dispatch(setToken(savedToken));
      dispatch(setUser(user));
    })
    .catch(() => dispatch(clearToken()));
}, []);
```

> Если эффект только дублирует render-логику — убери его. Effect для синхронизации с системой вне React.

Когда нужна ссылка на DOM-узел или мутабельное значение без перерисовки — `useRef`.
