# Формы controlled

**Controlled component** — поле, значение которого хранится в React state. Браузер не «владеет» значением — источник правды один.

## Controlled input

```tsx
const [email, setEmail] = useState("");

<input
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>
```

## Checkbox и select

```tsx
const [agree, setAgree] = useState(false);

<input
  type="checkbox"
  checked={agree}
  onChange={(e) => setAgree(e.target.checked)}
/>

<select value={role} onChange={(e) => setRole(e.target.value)}>
  <option value="STUDENT">Студент</option>
  <option value="ADMIN">Админ</option>
</select>
```

## react-hook-form в Best Mentor

Для сложных форм используют библиотеку: меньше ручного state, встроенная валидация через zod.

```tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const { control, handleSubmit } = useForm<LoginFormValues>({
  resolver: zodResolver(loginSchema),
});

<form onSubmit={handleSubmit(onSubmit)}>
  <FormFields fields={fields} control={control} />
  <Button type="submit" isLoading={isLoading}>Войти</Button>
</form>
```

## Controlled vs uncontrolled

Uncontrolled — значение читают через ref (`inputRef.current.value`). Controlled проще валидировать и синхронизировать с UI.

| Подход | Когда |
| --- | --- |
| useState + onChange | Простые поля, обучение |
| react-hook-form | Формы с валидацией, много полей |
| useRef | Фокус, файлы, редкие uncontrolled сценарии |

Побочные эффекты (запросы, подписки, таймеры) выносят в `useEffect`.
