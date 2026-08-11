# React Router

**React Router** сопоставляет URL и компоненты. В версии 6+ используют `createBrowserRouter`, layout routes и `Outlet` для вложенных маршрутов.

## Конфигурация роутера (Best Mentor)

```tsx
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/sections" replace />,
  },
  {
    element: <AuthRoute />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
  {
    element: <BaseLayout />,
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          { path: "sections", element: <Sections /> },
          { path: "chapter/:id", element: <Chapter /> },
        ],
      },
    ],
  },
]);
```

## Link и Navigate

```tsx
import { Link, useNavigate } from "react-router-dom";

<Link to="/sections">Разделы</Link>

const navigate = useNavigate();
navigate(ROUTES.sections, { replace: true });
```

## Параметры и Outlet

```tsx
const { id } = useParams();

// Layout route рендерит дочерний маршрут:
function BaseLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
```

## Protected и Auth routes

Guard-компоненты оборачивают `Outlet`: неавторизованный → login, авторизованный на login → redirect home.

| API | Назначение |
| --- | --- |
| useParams | Параметры URL |
| useNavigate | Программный переход |
| useLocation | Текущий path и state |
| Outlet | Место для child route |

Общее состояние для соседних компонентов поднимают к ближайшему общему родителю — **lifting state up**.
