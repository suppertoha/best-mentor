#!/usr/bin/env node
/**
 * Записывает content/<section>/quizzes.json из scripts/content-data/quizzes/*.mjs
 *
 *   npm run quizzes:build
 */

import { writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import htmlQuizzes from "./content-data/quizzes/html.mjs";
import cssQuizzes from "./content-data/quizzes/css.mjs";
import javascriptQuizzes from "./content-data/quizzes/javascript.mjs";
import reactQuizzes from "./content-data/quizzes/react.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");

const sections = {
  html: htmlQuizzes,
  css: cssQuizzes,
  javascript: javascriptQuizzes,
  react: reactQuizzes,
};

for (const [sectionSlug, quizzes] of Object.entries(sections)) {
  const filePath = path.join(projectRoot, "content", sectionSlug, "quizzes.json");
  await writeFile(filePath, `${JSON.stringify(quizzes, null, 2)}\n`, "utf8");
  console.log(`✓ content/${sectionSlug}/quizzes.json (${Object.keys(quizzes).length} глав)`);
}

console.log("\nГотово.");
