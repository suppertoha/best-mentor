# Фоны

Свойство `background` и связанные с ним задают цвет, изображение, позицию и размер фона элемента.

## background-color и image

```css
.card {
  background-color: #f8fafc;
  background-image: url("/images/pattern.svg");
}
```

## background-size и position

```css
.hero {
  background-image: url("/images/hero.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
```

## Множественные фоны

```css
.layered {
  background:
    linear-gradient(rgb(0 0 0 / 0.4), rgb(0 0 0 / 0.4)),
    url("/images/city.jpg") center / cover no-repeat;
}
```

## background-attachment

`fixed` создаёт parallax-эффект, но на мобильных может работать нестабильно — тестируй на устройствах.

```css
.parallax {
  background-attachment: fixed;
}
```

Тени и фильтры добавляют глубину и визуальные эффекты поверх фона.
