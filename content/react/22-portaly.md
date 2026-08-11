# Порталы

**Portal** (`createPortal`) рендерит дочерний UI в другой узел DOM — обычно `document.body`, сохраняя контекст React-дерева.

## Базовый портал

```tsx
import { createPortal } from "react-dom";

function Modal({ children, onClose }: ModalProps) {
  return createPortal(
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.body,
  );
}
```

## Зачем порталы

- Модалки поверх всего (z-index, overflow родителя)
- Тултипы и dropdown без обрезки
- Сохранение props/context от родителя React

## Доступность

Закрытие по Escape, фокус внутри модалки, `aria-modal` и `role="dialog"` — не забывай при использовании портала.

## Портал в shared UI

В Best Mentor модалки — переиспользуемый компонент в `shared/ui`. Портал внутри kit избавляет от дублирования разметки на страницах.

```tsx
// Упрощённо: Modal рендерит children в body
export function Modal({ open, title, children, onClose }: ModalProps) {
  if (!open) return null;

  return createPortal(
    <div className={styles.overlay}>
      <div className={styles.dialog} role="dialog" aria-modal="true">
        <h2>{title}</h2>
        {children}
        <Button variant="ghost" onClick={onClose}>Закрыть</Button>
      </div>
    </div>,
    document.body,
  );
}
```

| Паттерн | Где в проекте |
| --- | --- |
| Portal | Modal, overlay |
| Error Boundary | Страница / тяжёлый блок |
| lazy + Suspense | Редкие страницы и формы |
| Redux | Auth, глобальные данные |

> Портал меняет место в DOM, но не место в React-дереве — события всплывают по React-иерархии, как обычно.

Ты прошёл базовый курс React: от JSX и state до роутинга, Redux и продвинутых приёмов. Практикуй на реальном проекте — лучший способ закрепить материал.
