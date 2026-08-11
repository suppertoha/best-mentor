# useRef

`useRef` хранит **мутабельное** значение между рендерами. Изменение `.current` **не вызывает** повторный рендер.

## Ссылка на DOM

```tsx
const inputRef = useRef<HTMLInputElement>(null);

useEffect(() => {
  inputRef.current?.focus();
}, []);

return <input ref={inputRef} />;
```

## Хранение предыдущего значения

```tsx
const prevId = useRef<number | null>(null);

useEffect(() => {
  prevId.current = chapterId;
}, [chapterId]);
```

## Таймеры и id подписок

Удобно класть id интервала или AbortController в ref, чтобы очистить в cleanup.

## ref vs state

Если изменение должно обновить UI — state. Если нужно «запомнить» что-то между рендерами без paint — ref.

| Хук | Перерисовка при изменении |
| --- | --- |
| useState | Да |
| useRef | Нет |
| useReducer | Да |

Для дорогих вычислений и стабильных колбэков — `useMemo` и `useCallback`.
