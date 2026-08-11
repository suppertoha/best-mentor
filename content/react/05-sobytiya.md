# События

В React события именуются в camelCase (`onClick`, `onChange`, `onSubmit`). Обработчик получает **синтетическое событие** — обёртку с кроссбраузерным API.

## onClick и preventDefault

```tsx
function LinkButton() {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("Клик без перехода");
  };

  return <button onClick={handleClick}>Действие</button>;
}
```

## onChange для input

```tsx
function SearchField() {
  const [query, setQuery] = useState("");

  return (
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Поиск главы..."
    />
  );
}
```

## onSubmit формы

Всегда вызывай `e.preventDefault()`, иначе страница перезагрузится. В Best Mentor submit идёт через `handleSubmit` из react-hook-form.

```tsx
const onSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  // отправка
};

<form onSubmit={onSubmit}>...</form>
```

## Передача аргументов

Не вызывай функцию сразу в JSX — оберни в стрелку.

```tsx
// Плохо: handleDelete(id) выполнится при рендере
<button onClick={() => handleDelete(id)}>Удалить</button>
```

На основе событий и state строят **условный рендер** — показ разного UI в зависимости от данных.
