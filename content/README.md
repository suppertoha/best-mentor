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

Требуется `.env`: `SEED_ADMIN_EMAIL`, `SEED_ADMIN_PASSWORD`.

## Новый раздел

1. Создай `content/<slug>/chapters.json` + `.md` файлы
2. Убедись, что раздел есть на бэке
3. `npm run seed -- <slug>`
