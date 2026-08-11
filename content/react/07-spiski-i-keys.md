# Списки и keys

Списки рендерят через `array.map()`. Атрибут **key** помогает React сопоставить элементы между рендерами при добавлении, удалении и сортировке.

## Базовый список

```tsx
const chapters = [
  { id: 1, title: "Введение" },
  { id: 2, title: "JSX" },
];

<ul>
  {chapters.map((chapter) => (
    <li key={chapter.id}>{chapter.title}</li>
  ))}
</ul>
```

## key должен быть стабильным

Используй уникальный id из данных. Индекс массива — только если список статичен и не сортируется.

- Хорошо: `key={chapter.id}`
- Плохо: `key={Math.random()}`
- Осторожно: `key={index}` при DnD reorder

## Список компонентов

```tsx
{sections.map((section) => (
  <SectionItem
    key={section.id}
    title={section.title}
    slug={section.slug}
  />
))}
```

## Fragment в map

Если нужно вернуть несколько соседних узлов, оберни в Fragment с key: `<Fragment key={id}>`.

Формы со вводом текста почти всегда делают **controlled** — значение в state, изменения через onChange.
