# Schema.org

Schema.org — словарь структурированных данных. Разметка в формате JSON-LD помогает поисковикам показывать расширенные сниппеты: звёзды, цены, FAQ.

## JSON-LD в head или body

Данные передают скриптом с типом `application/ld+json`. Это не влияет на отображение страницы.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "HTML с нуля",
  "description": "Базовый курс по разметке веб-страниц",
  "provider": {
    "@type": "Organization",
    "name": "Best Mentor"
  }
}
</script>
```

## Разметка статьи

Тип `Article` описывает публикацию: заголовок, автор, дата.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Семантическая разметка в HTML5",
  "datePublished": "2026-03-01",
  "author": {
    "@type": "Person",
    "name": "Анна Иванова"
  }
}
</script>
```

## Product и Offer

Для интернет-магазина указывают товар и предложение с ценой и валютой.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Курс HTML",
  "offers": {
    "@type": "Offer",
    "price": "4990",
    "priceCurrency": "RUB",
    "availability": "https://schema.org/InStock"
  }
}
</script>
```

## FAQPage

Блок вопрос–ответ может попасть в расширенный результат поиска.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Нужен ли DOCTYPE в HTML5?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Да, короткий <!DOCTYPE html> переводит браузер в стандартный режим."
      }
    }
  ]
}
</script>
```

## Проверка разметки

Перед публикацией прогоняй JSON-LD через валидатор Google Rich Results Test или Schema Markup Validator.

- Данные в разметке должны совпадать с видимым контентом
- Не размечай скрытый или вводящий в заблуждение текст
- Один объект — одна сущность на странице, где это уместно

Schema.org дополняет SEO, но не заменяет качественный контент и нормальную HTML-структуру.
