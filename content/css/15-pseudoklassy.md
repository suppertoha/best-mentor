# Псевдоклассы

Псевдоклассы выбирают элементы по состоянию, позиции в дереве или структуре — без дополнительных классов в HTML.

## Интерактивные состояния

```css
a:hover {
  text-decoration: underline;
}

input:focus-visible {
  outline: 2px solid #4f46e5;
  outline-offset: 2px;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
```

## Структурные псевдоклассы

```css
li:first-child {
  font-weight: 600;
}

tr:nth-child(even) {
  background: #f8fafc;
}

p:not(.muted) {
  color: #1e293b;
}
```

## :is() и :where()

Современные селекторы группируют правила. `:where()` имеет нулевую специфичность — удобно для базовых стилей.

```css
:is(h1, h2, h3) {
  line-height: 1.25;
}

:where(ul, ol) {
  margin: 0;
  padding-left: 1.25rem;
}
```

## Формы

```css
input:required:invalid {
  border-color: #dc2626;
}

input:valid {
  border-color: #16a34a;
}
```

Псевдоэлементы (::before, ::after) создают декоративные части без разметки.
