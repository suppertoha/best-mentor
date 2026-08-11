# Поднятие состояния

Если два компонента должны делить одни данные, state хранят в **родителе** и передают вниз через props + колбэки для обновления.

## Схема

Родитель: `const [value, setValue] = useState()`. Детям: `value` и `onChange={setValue}` или обёртка.

```tsx
function FilterPanel() {
  const [query, setQuery] = useState("");

  return (
    <>
      <SearchInput value={query} onChange={setQuery} />
      <ChapterList filter={query} />
    </>
  );
}
```

## Однонаправленный поток

Данные вниз (props), события вверх (callbacks). Так проще отлаживать, чем при мутациях в разных местах.

## Когда поднимать слишком высоко

Если props проходят через 5+ уровней без использования — пора Context или глобальный store (Redux).

## Контролируемый список

```tsx
function SectionsPage() {
  const [sections, setSections] = useState<Section[]>([]);

  const handleReorder = (next: Section[]) => {
    setSections(next);
    sectionsService.reorder(next);
  };

  return <SectionsList items={sections} onReorder={handleReorder} />;
}
```

Вместо наследования UI собирают через **композицию** — children, render props, slots.
