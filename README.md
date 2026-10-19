# Best Mentor

Учебная платформа: разделы и главы с markdown-контентом, квизы, прогресс и админ-панель.

## Стек

- **Frontend:** React 19, TypeScript, Vite, Redux Toolkit, TanStack Query, React Router, SCSS
- **Backend:** [fe-academy](https://github.com/dev-kos/fe-academy) — NestJS, Prisma, PostgreSQL, JWT

## Локальный запуск

### API и база

1. PostgreSQL (локально или Docker).
2. В `fe-academy`: скопировать `.env.example` → `.env`, поднять `npm run start:dev` (порт **3000**).
3. Миграции и сид выполняются при старте (`start:prod` / скрипты проекта).

### Фронт

```bash
cd best-mentor
cp .env.example .env   # VITE_API_URL для прода; локально достаточно proxy в vite.config
npm install
npm run dev            # http://localhost:5173
```

В dev запросы идут на `/api` → proxy на `localhost:3000`.

### Контент (опционально)

```bash
npm run seed:all
npm run seed:quizzes:all
```

Нужны `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` в `.env` (см. `.env.example`).

## Деплой

| Часть | Куда |
|--------|------|
| Фронт | [Vercel](https://vercel.com) — репозиторий `best-mentor`, build `npm run build`, output `dist` |
| API | Render / Railway и т.п. — репозиторий `fe-academy` |
| БД | Neon / Supabase (Postgres) |

**Vercel:** переменная `VITE_API_URL` = публичный URL API (без `/api`).

**API:** в `.env` задать `CORS_ORIGIN` — URL фронта через запятую, например  
`https://your-app.vercel.app,http://localhost:5173`.

В репозитории есть `vercel.json` для SPA-роутинга.

## Демо

<!-- Добавь ссылку после выкладки -->
<!-- Live: https://... -->

## Лицензия

Учебный проект.
