# Условный рендер

React позволяет рендерить разметку по условию: оператор `&&`, тернарный `? :`, ранний `return` или переменная с JSX.

## && — показать, если true

```tsx
{isAdmin && <button>Добавить раздел</button>}
```

## Тернарный оператор

```tsx
{token ? <Sections /> : <Login />}
```

## Ранний return

Удобно для загрузки и guard-компонентов, как `ProtectedRoute`.

```tsx
function ProtectedRoute() {
  const token = useAppSelector((s) => s.user.token);

  if (token === undefined) {
    return <Spinner />;
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
```

## Переменная с JSX

```tsx
let content;

if (error) {
  content = <ErrorMessage />;
} else if (isLoading) {
  content = <Spinner />;
} else {
  content = <ChapterContent />;
}

return <div>{content}</div>;
```

> Не вкладывай слишком много тернарников в JSX — вынеси логику в переменную или отдельный компонент.

Для коллекций данных используют `.map()` и обязательный атрибут **key**.
