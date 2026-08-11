#!/usr/bin/env node
/**
 * Создаёт раздел на API, если его ещё нет.
 *
 *   node scripts/ensure-section.mjs react
 */

import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");

const SECTION_META = {
  react: {
    title: "React",
    slug: "react",
    description:
      "Библиотека для построения пользовательских интерфейсов: компоненты, хуки, роутинг и state",
    sortOrder: 3,
  },
};

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

const sectionSlug = process.argv[2];

if (!sectionSlug || !SECTION_META[sectionSlug]) {
  console.error(
    `Использование: node scripts/ensure-section.mjs <slug>\nДоступно: ${Object.keys(SECTION_META).join(", ")}`,
  );
  process.exit(1);
}

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

const meta = SECTION_META[sectionSlug];

console.log("Логин...");
const { accessToken } = await request("POST", "/auth/login", {
  body: { email: ADMIN_EMAIL, password: ADMIN_PASSWORD },
});

const sections = await request("GET", "/sections", { token: accessToken });
const existing = sections.find((item) => item.slug === meta.slug);

if (existing) {
  console.log(`Раздел уже есть: ${existing.title} (id=${existing.id})`);
  process.exit(0);
}

const created = await request("POST", "/sections", {
  token: accessToken,
  body: meta,
});

console.log(`+ Создан раздел: ${created.title} (id=${created.id}, slug=${created.slug})`);
