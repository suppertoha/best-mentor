# Цвета и градиенты

В CSS цвет задаётся ключевыми словами, hex, rgb/rgba, hsl/hsla и современным синтаксисом с альфа-каналом. Градиенты — через `linear-gradient` и `radial-gradient`.

## Форматы цвета

```css
:root {
  --text: #1a1a2e;
  --muted: rgb(100 116 139);
  --accent: hsl(245 58% 51%);
  --overlay: rgb(0 0 0 / 0.45);
}
```

## HSL для дизайна

HSL удобен для вариаций: меняешь lightness — получаешь оттенки одного цвета без калькулятора.

```css
.btn-primary {
  background: hsl(245 58% 51%);
}

.btn-primary:hover {
  background: hsl(245 58% 45%);
}
```

## Линейные градиенты

```css
.banner {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.striped {
  background: repeating-linear-gradient(
    45deg,
    #f8fafc,
    #f8fafc 10px,
    #e2e8f0 10px,
    #e2e8f0 20px
  );
}
```

## Радиальные и conic

```css
.spotlight {
  background: radial-gradient(circle at top, #fff 0%, #e2e8f0 70%);
}

.pie-chart {
  background: conic-gradient(#4f46e5 0 40%, #e2e8f0 40% 100%);
}
```

> Для текста на фоне проверяй контраст (WCAG): не полагайся только на «красивый» градиент.

Цвет текста и шрифты — в главе о типографике.
