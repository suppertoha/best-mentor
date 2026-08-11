# JSX

**JSX** — расширение синтаксиса JavaScript: HTML-подобная разметка внутри кода. На этапе сборки он превращается в вызовы `React.createElement`.

## Правила JSX

Один корневой элемент на return (или `<>...</>` — Fragment). Закрывай все теги. Атрибуты в camelCase: `className`, `onClick`, `htmlFor`.

```tsx
function Card() {
  return (
  <>
    <h2 className="title">Глава</h2>
    <p>Контент в markdown</p>
  </>
  );
}
```

## Выражения в фигурных скобках

В `{}` можно вставлять переменные, вызовы функций, тернарный оператор.

```tsx
const title = "React Router";
const isAdmin = true;

function Badge() {
  return (
    <span className={isAdmin ? "badge admin" : "badge"}>
      {title.toUpperCase()}
    </span>
  );
}
```

## Стили и атрибуты

Инлайн-стили — объект: `style={{ marginTop: 16 }}`. В проектах чаще SCSS-модули: `className={styles.form}`.

```tsx
import styles from "./LoginForm.module.scss";

<button type="submit" className={styles.submit}>
  Войти
</button>
```

## Комментарии

Внутри JSX комментарий: `{/* текст */}`. Обычные `//` перед return не попадут в разметку.

> JSX — это не HTML: `class` становится `className`, а самозакрывающиеся теги обязательны (`<img />`, `<input />`).

Следующая глава — компоненты и props: как передавать данные сверху вниз и собирать UI из маленьких частей.
