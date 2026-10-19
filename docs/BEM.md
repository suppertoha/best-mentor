# BEM в best-mentor

Стили компонентов — **CSS Modules** + дисциплина **BEM** в структуре компонента и разметке.

## Именование в коде

- **Блок:** `kebab-case`, совпадает с смыслом компонента (`section-item`, `login-form`, `button`). В SCSS — класс `.header`, `.button`.
- **Элемент:** короткое имя в том же `*.module.scss` (`.dropdown`, `.logo`), в TSX — `b.el('dropdown')`.
- **Модификатор:** отдельный локальный класс (`.primary`, `.tab--active`, `.field--error`) или `b.mod('primary')`.

Уникальность в проде даёт не длинный BEM в HTML, а **scoped name** из Vite (см. ниже).

## Имена в DOM (DevTools)

Шаблон: **`{ИмяФайла}_{local}__{hash}`** — например `Header_dropdown__wUf1y`, `SectionItem_title__a1b2c`.

Настройка: `css.modules.generateScopedName` в `vite.config.ts` (имя файла без `.module.scss` + локальный класс + короткий hash). Это удобно для отладки; в JSX по-прежнему только `bem()` / `styles`, не строки из DOM.

## React

```tsx
import clsx from "clsx";
import { bem } from "@/shared/lib/bem";
import styles from "./Button.module.scss";

const b = bem(styles, "button");

<button
  className={clsx(
    b.block(),
    b.mod("primary"),
    size === "sm" && b.mod("sm"),
    className,
  )}
/>;
```

`bem`: `block()` → `styles[block]`, `el('logo')` → `styles.logo`, `mod('primary')` → `styles.primary`.

## SCSS

- Один **блок** в файле; элементы — **плоские** классы рядом (`.inner`, `.dropdown`), без `block__element` в селекторах.
- **Не** вкладывать `&__dropdown` внутрь `.header`, если нужен local `dropdown` (иначе в modules будет `header__dropdown`).
- Составные стили: `.sm.primary` при двух модификаторах на одном узле.
- Псевдоклассы (`&:hover`) и `@media` — на том же элементе.
- Токены — `@use "inject" as *`.

Эталон: `src/widgets/header/ui/Header.module.scss` + `Header.tsx`.

## FSD

Один React-компонент → один основной блок в его `*.module.scss`. Вложенные UI-папки (`ChapterTitleCell`) — свой блок и свой модуль (или общий модуль с согласованными short local, как `SectionItem`).

## Антипаттерны

- `.root`, `.inner` без связи с блоком в TSX (`b.el('inner')` при классе `.inner` — ок).
- Глубокая вложенность `.header .dropdown` вместо отдельных локальных классов.
- Глобальные BEM-классы в JSX (кроме reset); layout — `b.el('container')` в `BaseLayout.module.scss`.
