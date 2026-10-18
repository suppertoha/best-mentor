#!/usr/bin/env node
/**
 * Заливает тесты к главам через PUT /chapters/:chapterId/quiz
 *
 * Использование:
 *   npm run seed:quizzes:html
 *   npm run seed:quizzes:all
 *
 * Данные: content/<section>/quizzes.json (см. npm run quizzes:build)
 *
 * Переменные (.env):
 *   SEED_API_URL, SEED_ADMIN_EMAIL, SEED_ADMIN_PASSWORD
 */

import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");

const loadEnvFile = async (filePath) => {
  try {
    const text = await readFile(filePath, "utf8");

    for (const line of text.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;

      const eq = trimmed.indexOf("=");
      if (eq === -1) continue;

      const key = trimmed.slice(0, eq).trim();
      let value = trimmed.slice(eq + 1).trim();

      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }

      if (!(key in process.env)) {
        process.env[key] = value;
      }
    }
  } catch {
    // .env optional
  }
};

await loadEnvFile(path.join(projectRoot, ".env"));
await loadEnvFile(path.join(projectRoot, ".env.local"));

const sectionSlug = process.argv[2] || process.env.SEED_SECTION_SLUG || "html";
const contentDir = path.join(projectRoot, "content", sectionSlug);

const API_URL =
  process.env.SEED_API_URL ||
  process.env.VITE_API_URL ||
  "https://fe-academy-api-devkos.amvera.io";

const ADMIN_EMAIL = process.env.SEED_ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.SEED_ADMIN_PASSWORD;

if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
  console.error(
    "Добавь в .env:\n  SEED_ADMIN_EMAIL=...\n  SEED_ADMIN_PASSWORD=...",
  );
  process.exit(1);
}

const request = async (method, endpoint, { token, body } = {}) => {
  const headers = { Accept: "application/json" };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  if (body !== undefined) {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  const text = await response.text();
  let data = null;

  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }
  }

  if (!response.ok) {
    const message =
      typeof data === "object" && data?.message
        ? data.message
        : `HTTP ${response.status}`;
    throw new Error(`${method} ${endpoint}: ${message}`);
  }

  return data;
};

const normalizeTitle = (value) => value.trim().toLowerCase();

const findChapter = (section, { slug, title }) => {
  const bySlug = section.chapters?.find((chapter) => chapter.slug === slug);
  if (bySlug) return bySlug;

  const normalizedTitle = normalizeTitle(title);
  return section.chapters?.find(
    (chapter) => normalizeTitle(chapter.title) === normalizedTitle,
  );
};

let manifest;
let quizzes;

try {
  manifest = JSON.parse(
    await readFile(path.join(contentDir, "chapters.json"), "utf8"),
  );
} catch {
  console.error(`Не найден content/${sectionSlug}/chapters.json`);
  process.exit(1);
}

try {
  quizzes = JSON.parse(
    await readFile(path.join(contentDir, "quizzes.json"), "utf8"),
  );
} catch {
  console.error(
    `Не найден content/${sectionSlug}/quizzes.json — запусти npm run quizzes:build`,
  );
  process.exit(1);
}

console.log(`API: ${API_URL}`);
console.log(`Раздел (slug): ${sectionSlug}`);
console.log("Логин...");

const { accessToken } = await request("POST", "/auth/login", {
  body: { email: ADMIN_EMAIL, password: ADMIN_PASSWORD },
});

console.log("Загрузка разделов...");

const sections = await request("GET", "/sections", { token: accessToken });
const section = sections.find((item) => item.slug === sectionSlug);

if (!section) {
  console.error(`Раздел "${sectionSlug}" не найден. Доступные slug:`);
  sections.forEach((item) => console.error(`  - ${item.slug} (${item.title})`));
  process.exit(1);
}

const sectionDetail = await request("GET", `/sections/${sectionSlug}`, {
  token: accessToken,
});

console.log(`Раздел: ${section.title} (id=${section.id})`);

let uploaded = 0;
let skipped = 0;

for (const chapterConfig of manifest) {
  const quiz = quizzes[chapterConfig.slug];

  if (!quiz?.questions?.length) {
    console.warn(`⚠ Нет теста для ${chapterConfig.slug}, пропуск`);
    skipped += 1;
    continue;
  }

  const chapter = findChapter(sectionDetail, chapterConfig);

  if (!chapter) {
    console.warn(
      `⚠ Глава не найдена на API: ${chapterConfig.title} (${chapterConfig.slug})`,
    );
    skipped += 1;
    continue;
  }

  await request("PUT", `/chapters/${chapter.id}/quiz`, {
    token: accessToken,
    body: { questions: quiz.questions },
  });

  const questionCount = quiz.questions.length;
  console.log(
    `✓ Тест: ${chapter.title} (${questionCount} вопр.)`,
  );
  uploaded += 1;
}

console.log(`\nГотово: ${uploaded} тестов залито, ${skipped} пропущено.`);
