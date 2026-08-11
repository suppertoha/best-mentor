# Custom hooks

Custom hook — функция с префиксом `use`, внутри которой вызываются другие хуки. Это способ переиспользовать **логику**, не копируя JSX.

## Правила хуков

- Вызывать только на верхнем уровне (не в if/for)
- Только из React-функций или других хуков
- Имя начинается с `use`

## useAuthSession

В Best Mentor логика восстановления сессии вынесена в хук и helper `loginWithToken`.

```tsx
export const useAuthSession = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const savedToken = localStorage.getItem(TOKEN_STORAGE_KEY);
    if (!savedToken) {
      dispatch(clearToken());
      return;
    }
    // загрузка профиля...
  }, [dispatch]);
};
```

## Хук для fetch

```tsx
function useChapter(id: number) {
  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);

    chaptersService.getById(id).then((data) => {
      if (!cancelled) setChapter(data);
    }).finally(() => {
      if (!cancelled) setIsLoading(false);
    });

    return () => { cancelled = true; };
  }, [id]);

  return { chapter, isLoading };
}
```

## Возвращаемое значение

Можно вернуть массив, объект или tuple — как у `useState`. Объект читается при нескольких полях.

С TypeScript типизируют props, state, события и ответы API — глава **React + TypeScript**.
