# Error Boundaries

**Error Boundary** — классовый компонент (или библиотека) с `getDerivedStateFromError` / `componentDidCatch`. Ловит ошибки **в дочерних** компонентах при рендере, не в event handlers и async вне render.

## Минимальный boundary

```tsx
class ErrorBoundary extends React.Component<
  { fallback: React.ReactNode; children: React.ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error(error, info.componentStack);
  }

  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}
```

## Где ставить

Вокруг страницы, тяжёлого виджета или markdown-рендерера — чтобы сбой одной главы не уронил всё приложение.

```tsx
<ErrorBoundary fallback={<p>Не удалось показать главу</p>}>
  <ChapterContent markdown={content} />
</ErrorBoundary>
```

## Что не ловится

- Ошибки в самом boundary
- Асинхронный код в useEffect (нужен try/catch)
- Обработчики событий (try/catch внутри handler)
- SSR на сервере — отдельные паттерны

## Связь с API

Ошибки запросов в Best Mentor показывает interceptor (тост), а не boundary. Boundary — для неожиданных падений UI.

> Error Boundary — последняя линия обороны UI, а не замена нормальной обработке ошибок в async-коде.

Модалки и тултипы часто рендерят через **порталы** — вне основного DOM-дерева.
