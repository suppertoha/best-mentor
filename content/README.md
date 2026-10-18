# Контент глав для seed

Каждый раздел — отдельная папка:

```
content/
  html/         — 22 главы
  css/          — 22 главы
  javascript/   — 22 главы
  react/        — 22 главы
```

## Генерация контента

```bash
npm run generate:content
```

## Заливка

```bash
npm run seed:html
npm run seed:css
npm run seed:javascript
npm run seed:react
npm run seed:all
```

## Тесты к главам

```bash
npm run quizzes:build      # content/<section>/quizzes.json из scripts/content-data/quizzes/
npm run seed:quizzes:all   # залить тесты на API для всех разделов
```

Требуется `.env`: `SEED_ADMIN_EMAIL`, `SEED_ADMIN_PASSWORD`.

## Новый раздел

1. Создай `content/<slug>/chapters.json` + `.md` файлы
2. Убедись, что раздел есть на бэке
3. `npm run seed -- <slug>`
