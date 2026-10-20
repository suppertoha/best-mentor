# BEM в best-mentor

Стили компонентов — **CSS Modules** + **BEM** в SCSS и в `bem()` из React.

## Именование

- **Блок:** `kebab-case`, совпадает с аргументом `bem(styles, 'chapter-nav')` и корневым классом `.chapter-nav`.
- **Элемент:** `block__element` — в SCSS `&__row`, в TSX `b.el('row')`.
- **Модификатор блока:** `block--modifier` — в SCSS `&--primary` внутри `.button`, в TSX `b.mod('primary')`.
- **Элемент + модификатор в одном ключе:** `block__link-next` — SCSS `&__link-next`, TSX `b.el('link-next')`.

В DOM после сборки: **`{Файл}_{короткий local}__{hash}`** (`generateScopedName` в `vite.config.ts` убирает дубль имени блока в local). Примеры: `Header_header__…` (корень блока), `Header_inner__…`, `ChapterNav_row__…`, `Button_primary__…`.

## React

```tsx
import clsx from 'clsx';
import { bem } from '@/shared/lib/bem';
import styles from './ChapterNav.module.scss';

const b = bem(styles, 'chapter-nav');

<nav className={b.block()}>
  <div className={b.el('row')}>…</div>
</nav>;
```

`bem`: `block()` → `styles[block]`, `el('row')` → `styles['chapter-nav__row']`, `mod('primary')` → `styles['button--primary']`.

## SCSS (эталон)

Файл [`ChapterNav.module.scss`](../src/pages/chapter/ui/ChapterNav/ChapterNav.module.scss):

- Один корневой **блок** `.chapter-nav { }`.
- Элементы только через **`&__…`** внутри блока.
- Модификаторы блока — **`&--…`** внутри блока (см. `Button.module.scss`).
- **`@include media($sm)`** — внутри того же `&__…`, где меняются свойства, а не общий блок в конце файла с перечислением классов.
- Псевдоклассы (`&:hover`) — рядом с media внутри элемента.
- Токены — `@use "inject" as *`.

```scss
.chapter-nav {
  border-top: 1px solid $border-light;

  &__row {
    display: grid;

    @include media($sm) {
      grid-template-columns: 1fr;
    }
  }
}
```

## FSD

Один React-компонент → один блок в его `*.module.scss`. Общий модуль (`SectionItem`) — один блок `section-item` для всех связанных TSX.

## Антипаттерны

- Плоские корневые `.row`, `.title` рядом с `.block` без `&__`.
- `@include media { .row { } .link { } }` в конце файла.
- `.block .child` вместо `&__child`.
- Строки scoped-классов из DevTools в JSX.
