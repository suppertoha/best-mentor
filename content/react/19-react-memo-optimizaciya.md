# React.memo оптимизация

`React.memo` оборачивает компонент и пропускает ререндер, если props **поверхностно** равны предыдущим.

## Базовое использование

```tsx
const SectionItem = memo(function SectionItem({ title, slug }: Props) {
  return (
    <article>
      <h3>{title}</h3>
      <span>{slug}</span>
    </article>
  );
});
```

## Кастомное сравнение

```tsx
export const ChapterRow = memo(
  ChapterRowComponent,
  (prev, next) => prev.id === next.id && prev.title === next.title,
);
```

## Что мешает memo

- Новая функция в props каждый рендер — нужен useCallback
- Новый объект/массив в props — нужен useMemo или стабильная ссылка
- Context выше по дереву меняется — memo не спасёт

## Практический подход

Сначала нормальная структура компонентов. Оптимизируй узкие места: длинные списки, тяжёлые карточки, частые обновления родителя.

Код сплитят через `lazy` и показывают fallback в `Suspense` — следующая глава.
