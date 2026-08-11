# React + TypeScript

TypeScript добавляет статическую типизацию: меньше ошибок в props, событиях и данных с API. В Best Mentor весь UI на `.tsx`.

## Типы props

```tsx
type ButtonProps = {
  variant?: "primary" | "secondary";
  isLoading?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
};

export const Button = ({ variant = "primary", ...props }: ButtonProps) => {
  // ...
};
```

## События

```tsx
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setEmail(e.target.value);
};

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
};
```

## Generic компоненты

```tsx
type FormFieldConfig<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  kind: "input" | "textarea";
};
```

## Типы из API

DTO лежат в `shared/api/dto/`, сущности — в `entities/`. Не дублируй одни и те же поля в десяти местах.

```ts
export interface AuthUser {
  id: number;
  email: string;
  role: "STUDENT" | "ADMIN";
}
```

| Тип | Пример |
| --- | --- |
| React.ReactNode | children, любой renderable контент |
| React.FC | Редко — явные props предпочтительнее |
| ComponentProps<typeof Button> | Унаследовать props кнопки |

Глобальное состояние приложения в Best Mentor — **Redux Toolkit**.
