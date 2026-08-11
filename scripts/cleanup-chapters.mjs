#!/usr/bin/env node
/**
 * Удаляет главы, которых нет в content/<section>/chapters.json,
 * и синхронизирует title/sortOrder у оставшихся.
 *
 *   node scripts/cleanup-chapters.mjs
 *   node scripts/cleanup-chapters.mjs css
 */

import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const contentRoot = path.join(projectRoot, "content");

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
    // optional
  }
};

await loadEnvFile(path.join(projectRoot, ".env"));
await loadEnvFile(path.join(projectRoot, ".env.local"));

const API_URL =
  process.env.SEED_API_URL ||
  process.env.VITE_API_URL ||
  "https://fe-academy-api-devkos.amvera.io";

const ADMIN_EMAIL = process.env.SEED_ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.SEED_ADMIN_PASSWORD;

if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
  console.error("Добавь SEED_ADMIN_EMAIL и SEED_ADMIN_PASSWORD в .env");
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

const findManifestChapter = (manifest, chapter) => {
  const bySlug = manifest.find((item) => item.slug === chapter.slug);
  if (bySlug) return bySlug;

  return manifest.find(
    (item) => normalizeTitle(item.title) === normalizeTitle(chapter.title),
  );
};

const targetSections = process.argv[2]
  ? [process.argv[2]]
  : (await readdir(contentRoot, { withFileTypes: true }))
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name);

console.log("Логин...");
const { accessToken } = await request("POST", "/auth/login", {
  body: { email: ADMIN_EMAIL, password: ADMIN_PASSWORD },
});

const sections = await request("GET", "/sections", { token: accessToken });

for (const sectionSlug of targetSections) {
  const manifestPath = path.join(contentRoot, sectionSlug, "chapters.json");

  let manifest;

  try {
    manifest = JSON.parse(await readFile(manifestPath, "utf8"));
  } catch {
    console.warn(`Пропуск: нет ${manifestPath}`);
    continue;
  }

  const section = sections.find((item) => item.slug === sectionSlug);

  if (!section) {
    console.warn(`Раздел "${sectionSlug}" не найден на API`);
    continue;
  }

  console.log(`\n=== ${section.title} (${sectionSlug}) ===`);

  const allowedIds = new Set();

  for (const chapter of section.chapters ?? []) {
    const config = findManifestChapter(manifest, chapter);

    if (!config) {
      console.log(`✕ Удаляю лишнюю главу: ${chapter.title} (${chapter.slug}, id=${chapter.id})`);
      await request("DELETE", `/chapters/${chapter.id}`, { token: accessToken });
      continue;
    }

    allowedIds.add(chapter.id);

    const needsTitleFix = chapter.title !== config.title;
    const needsOrderFix = chapter.sortOrder !== config.sortOrder;

    if (needsTitleFix || needsOrderFix) {
      console.log(`↻ Исправляю метаданные: ${chapter.title} → ${config.title}`);
      await request("PATCH", `/chapters/${chapter.id}`, {
        token: accessToken,
        body: {
          title: config.title,
          sortOrder: config.sortOrder,
        },
      });
    }
  }

  const freshSection = (await request("GET", "/sections", { token: accessToken })).find(
    (item) => item.id === section.id,
  );

  const existingSlugs = new Set((freshSection?.chapters ?? []).map((ch) => ch.slug));

  for (const config of manifest) {
    if (existingSlugs.has(config.slug)) continue;

    const byTitle = freshSection?.chapters?.find(
      (ch) => normalizeTitle(ch.title) === normalizeTitle(config.title),
    );

    if (!byTitle || byTitle.slug === config.slug) continue;

    console.log(`↻ Синхронизирую slug: ${byTitle.slug || "(пусто)"} → ${config.slug}`);
    await request("PATCH", `/chapters/${byTitle.id}`, {
      token: accessToken,
      body: { slug: config.slug },
    });
  }
}

const allowedSectionSlugs = new Set(targetSections);
const freshSections = await request("GET", "/sections", { token: accessToken });

for (const section of freshSections) {
  if (allowedSectionSlugs.has(section.slug)) continue;

  console.log(`\n✕ Удаляю лишний раздел: ${section.title} (${section.slug}, id=${section.id})`);
  await request("DELETE", `/sections/${section.id}`, { token: accessToken });
}

console.log("\nГотово. Запусти npm run seed:html && npm run seed:css && npm run seed:javascript для контента.");
