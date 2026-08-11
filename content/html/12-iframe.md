# iframe

Элемент `<iframe>` встраивает другую HTML-страницу внутрь текущей: карту, видео с хостинга, виджет оплаты. Это отдельный контекст просмотра со своими ограничениями безопасности.

## Базовое встраивание

Атрибут `src` указывает URL встраиваемой страницы. Задавай `width`, `height` или стилизуй через CSS.

```html
<iframe
  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
  title="Видеоурок по HTML"
  width="560"
  height="315"
  allowfullscreen
></iframe>
```

## title для доступности

Атрибут `title` обязателен для скринридеров: он описывает содержимое фрейма.

```html
<iframe
  src="/widgets/weather.html"
  title="Прогноз погоды на сегодня"
  width="300"
  height="200"
></iframe>
```

## sandbox и безопасность

Атрибут `sandbox` ограничивает возможности встроенного документа: скрипты, формы, переходы наверх.

```html
<iframe
  src="https://untrusted.example/widget"
  sandbox="allow-scripts allow-same-origin"
  title="Сторонний виджет"
></iframe>
```

## loading="lazy"

Ленивая загрузка откладывает загрузку iframe до приближения к области видимости — полезно ниже первого экрана.

```html
<iframe
  src="/map.html"
  title="Карта офиса"
  loading="lazy"
  width="100%"
  height="400"
></iframe>
```

| Атрибут | Назначение |
| --- | --- |
| src | Адрес встраиваемой страницы |
| title | Описание для assistive technologies |
| sandbox | Ограничения безопасности |
| allowfullscreen | Разрешить полноэкранный режим |
| loading | lazy — отложенная загрузка |

Встраивай только доверенные источники и по возможности используй sandbox — iframe расширяет поверхность атаки.
