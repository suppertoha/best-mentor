# HTML chapter content

Markdown-файлы для раздела **HTML**. Заливаются скриптом или вручную через редактор.

## Slug глав

| Файл | Глава | Slug |
|------|-------|------|
| `01-vvedenie.md` | Введение | `html-introduction` |
| `02-tegi-i-struktura.md` | Теги и структура | `html-tags-and-structure` |
| `03-formy.md` | Формы | `html-forms` |

Скрипт также ищет главу **по названию**, если slug в API другой (например уже есть `html-forms`).

## Заливка одной командой

В `.env`:

```env
SEED_ADMIN_EMAIL=admin@fe-academy.local
SEED_ADMIN_PASSWORD=твой_пароль
```

```bash
npm run seed:html
# или
npm run seed -- html
```

## Ручная вставка

Скопируй `.md` в редактор главы → Сохранить.

Копии для Obsidian: `Notebook/Assets/best-mentor/content/html/`
