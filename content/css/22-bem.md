# BEM

BEM (Block, Element, Modifier) — методология именования CSS-классов. Она делает стили предсказуемыми и снижает конфликты специфичности.

## Block, Element, Modifier

- Block — независимый компонент: `.card`
- Element — часть блока: `.card__title`
- Modifier — вариант: `.card--featured`

```css
.card { }
.card__title { }
.card__body { }
.card--featured {
  border-color: #4f46e5;
}
```

## HTML пример

```html
<article class="card card--featured">
  <h2 class="card__title">Глава CSS</h2>
  <p class="card__body">Короткое описание.</p>
  <a class="card__link" href="#">Читать</a>
</article>
```

## Правила BEM

- Не вкладывай селекторы глубоко: `.card .title` → `.card__title`
- Modifier не используйся сам по себе — вместе с block
- Не делай element-of-element: `.card__body__text` — лучше новый block или flat element

## BEM и компоненты в React

В best-mentor компоненты живут в своих папках (FSD). BEM-классы в scss module или глобальном css согласованы с именем компонента: `LoginForm`, `card__title`.

```css
/* Button.module.scss (CSS Modules) — короткие local-имена */
.button { }
.loader { }
.primary { }
.sm { }
```

В DOM после сборки Vite подставляет читаемый scope: `Button_primary__a1b2c` (файл + local + hash).

```tsx
import { bem } from "@/shared/lib/bem";
const b = bem(styles, "button");
<button className={clsx(b.block(), b.mod("primary"))} />
```

Подробнее в репозитории: `docs/BEM.md`.

## Когда не нужен чистый BEM

Утилиты (Tailwind), CSS modules с хешами, styled-components — альтернативы. BEM полезен в классической вёрстке и дизайн-системах с глобальным CSS.

> Имена классов должны отвечать на вопрос «что это?», а не «как выглядит?» — не `.red-text`, а `.error-message`.

С BEM, Flexbox, Grid и адаптивом ты закрываешь базовый стек CSS для вёрстки учебного проекта и реальных интерфейсов.
