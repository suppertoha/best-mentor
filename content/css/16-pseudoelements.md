# Псевдоэлементы

Псевдоэлементы — виртуальные узлы, которые CSS может стилизовать. Чаще всего ::before и ::after для декора и иконок.

## ::before и ::after

Требуют свойство content (даже пустая строка). По умолчанию display: inline — для размеров часто нужен display: block или inline-block.

```css
.quote::before {
  content: "«";
  font-size: 2rem;
  color: #94a3b8;
}

.link--external::after {
  content: " ↗";
  font-size: 0.85em;
}
```

## Декоративные элементы

```css
.divider {
  display: flex;
  align-items: center;
  gap: 12px;
}

.divider::before,
.divider::after {
  content: "";
  flex: 1;
  height: 1px;
  background: #e2e8f0;
}
```

## ::placeholder и ::selection

```css
input::placeholder {
  color: #94a3b8;
}

::selection {
  background: #c7d2fe;
  color: #1e1b4b;
}
```

## Ограничения

- Псевдоэлементы не в DOM — не кликабельны
- Не вставляй важный контент только через ::before — доступность
- Один ::before и один ::after на элемент

Когда правила конфликтуют, побеждает специфичность и каскад.
