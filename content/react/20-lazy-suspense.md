# lazy / Suspense

`React.lazy` загружает компонент **динамически** (отдельный chunk). `Suspense` показывает fallback, пока chunk грузится.

## Lazy import

```tsx
const LoginFormLazy = lazy(() =>
  import("./LoginForm").then((m) => ({ default: m.LoginForm })),
);
```

## Suspense boundary

```tsx
function LoginPage() {
  return (
    <Suspense fallback={<Spinner />}>
      <LoginFormLazy />
    </Suspense>
  );
}
```

## Маршруты и код-сплиттинг

React Router может lazy-load страницы — начальный bundle меньше, страница качается по требованию.

## Ошибки загрузки

Lazy сам не ловит сбой сети — комбинируй с Error Boundary или retry в import().

| Инструмент | Роль |
| --- | --- |
| lazy() | Динамический import компонента |
| Suspense | UI ожидания |
| Error Boundary | Падение при render/load |

Error Boundary перехватывает ошибки рендера в поддереве и показывает запасной UI.
