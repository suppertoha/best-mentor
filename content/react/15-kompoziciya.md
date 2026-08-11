# Композиция

Композиция — сборка сложного UI из простых частей. React поощряет «has-a» (содержит), а не «is-a» (наследует).

## children как слот

```tsx
function Modal({ title, children, onClose }: ModalProps) {
  return (
    <div className="overlay">
      <div className="modal">
        <header>
          <h2>{title}</h2>
          <Button variant="ghost" onClick={onClose}>×</Button>
        </header>
        {children}
      </div>
    </div>
  );
}
```

## Несколько слотов через props

```tsx
function Card({ header, footer, children }: CardProps) {
  return (
    <article>
      <header>{header}</header>
      <div>{children}</div>
      <footer>{footer}</footer>
    </article>
  );
}
```

## Композиция layout

`BaseLayout` + `Outlet` — классический паттерн: оболочка статична, содержимое меняется роутером.

## Специализация через обёртку

```tsx
function CreateChapterModal(props: Omit<ModalProps, "title">) {
  return (
    <Modal title="Новая глава" {...props}>
      <CreateChapterForm />
    </Modal>
  );
}
```

> Хороший компонент делает одну вещь и принимает гибкое содержимое через children или render props.

Повторяющуюся логику с хуками выносят в **custom hooks**.
