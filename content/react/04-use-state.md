# useState

`useState` хранит локальное состояние компонента. При обновлении state React **перерисовывает** компонент и его потомков.

## Базовый синтаксис

```tsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Нажато: {count}
    </button>
  );
}
```

## Функциональное обновление

Если новое значение зависит от предыдущего, передавай функцию — так безопаснее в асинхронных сценариях.

```tsx
setCount((prev) => prev + 1);
```

## Объекты и массивы

Не мутируй state напрямую. Создавай новый объект или копию массива.

```tsx
const [user, setUser] = useState({ name: "", email: "" });

setUser((prev) => ({ ...prev, email: "admin@fe-academy.local" }));
```

## Несколько state

Можно вызывать `useState` несколько раз. В форме логина Best Mentor отдельно хранят `isLoading` рядом с react-hook-form.

```tsx
const [isLoading, setIsLoading] = useState(false);
```

> State — это снимок UI в конкретный момент. Обновление асинхронно: сразу после setState старое значение ещё видно в текущем рендере.

Чтобы реагировать на клики и ввод, связывают state с **обработчиками событий**.
