# Context API

Context передаёт значение **вглубь дерева** без явного prop drilling. Подходит для темы, локали, редко меняющихся настроек.

## Создание и Provider

```tsx
const ThemeContext = createContext<"light" | "dark">("light");

function App() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  return (
    <ThemeContext.Provider value={theme}>
      <Toolbar />
    </ThemeContext.Provider>
  );
}
```

## useContext

```tsx
function Toolbar() {
  const theme = useContext(ThemeContext);
  return <div className={theme}>...</div>;
}
```

## Context vs Redux

В Best Mentor глобальный **auth state** — в Redux (`userSlice`), а не в Context: предсказуемые обновления, DevTools, middleware.

## Разделение контекстов

Один огромный context на всё приложение вызывает лишние ререндеры. Дроби по зонам ответственности.

Для навигации между страницами в SPA — **React Router**.
