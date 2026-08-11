# Компоненты и props

Компонент получает **props** (properties) от родителя. Props **только для чтения** — менять их внутри дочернего компонента нельзя.

## Объявление props

Деструктуризация в параметрах — самый читаемый вариант.

```tsx
type SectionItemProps = {
  title: string;
  slug: string;
  chapterCount: number;
};

function SectionItem({ title, slug, chapterCount }: SectionItemProps) {
  return (
    <article>
      <h3>{title}</h3>
      <p>Slug: {slug}</p>
      <span>{chapterCount} глав</span>
    </article>
  );
}
```

## children

Вложенное содержимое между тегами попадает в `props.children`. Так устроены layout и обёртки.

```tsx
function BaseLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="layout">
      <Header />
      {children}
    </div>
  );
}
```

## Значения по умолчанию

Можно задать default в деструктуризации или через defaultProps (реже в TS).

```tsx
function Button({
  variant = "primary",
  children,
}: {
  variant?: "primary" | "secondary";
  children: React.ReactNode;
}) {
  return <button className={variant}>{children}</button>;
}
```

## Композиция вместо наследования

В React не наследуют компоненты — собирают их вместе и передают данные через props.

| Правило | Почему |
| --- | --- |
| Props immutable | Предсказуемый поток данных сверху вниз |
| Один компонент — одна задача | Проще тестировать и переиспользовать |
| Типизировать props | Ошибки ловятся на этапе компиляции |

Когда данные должны меняться внутри компонента, нужен **state** — хук `useState`.
