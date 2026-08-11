# Redux

**Redux** хранит состояние приложения в одном store. **Redux Toolkit** (`createSlice`, `configureStore`) убирает бойлерплейт классического Redux.

## Slice (userSlice)

```ts
const userSlice = createSlice({
  name: "user",
  initialState: { token: undefined as string | null | undefined, user: null },
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setUser: (state, action: PayloadAction<AuthUser>) => {
      state.user = action.payload;
    },
    clearToken: (state) => {
      state.token = null;
      state.user = null;
    },
  },
});
```

## Store и типизированные хуки

```ts
export const store = configureStore({
  reducer: { user: userReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

## Использование в компоненте

```tsx
const token = useAppSelector((state) => state.user.token);
const dispatch = useAppDispatch();

dispatch(setToken(accessToken));
```

## Когда Redux, когда local state

Redux — auth, данные, нужные многим страницам. `useState` — UI модалки, локальный ввод, табы.

> В Best Mentor токен в localStorage, user — только в Redux. Не дублируй user в LS.

Чтобы уменьшить лишние ререндеры, применяют `React.memo` и осознанную оптимизацию.
