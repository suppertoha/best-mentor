#!/usr/bin/env node
/**
 * Генерирует content/<section>/chapters.json и .md из scripts/content-data/*.mjs
 *
 *   node scripts/generate-content.mjs
 *   node scripts/generate-content.mjs react
 */

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import htmlChapters from "./content-data/html.mjs";
import cssChapters from "./content-data/css.mjs";
import javascriptChapters from "./content-data/javascript.mjs";
import reactChapters from "./content-data/react.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const contentRoot = path.join(projectRoot, "content");

const SECTIONS = {
  html: htmlChapters,
  css: cssChapters,
  javascript: javascriptChapters,
  react: reactChapters,
};

const renderSection = (section) => {
  let md = `## ${section.h}\n\n`;

  if (section.p) {
    md += `${section.p}\n\n`;
  }

  if (section.list?.length) {
    md += `${section.list.map((item) => `- ${item}`).join("\n")}\n\n`;
  }

  if (section.code) {
    md += `\`\`\`${section.lang || "html"}\n${section.code}\n\`\`\`\n\n`;
  }

  return md;
};

const renderChapter = (chapter) => {
  let md = `# ${chapter.title}\n\n${chapter.intro}\n\n`;

  for (const section of chapter.sections ?? []) {
    md += renderSection(section);
  }

  if (chapter.table) {
    const { headers, rows } = chapter.table;
    md += `| ${headers.join(" | ")} |\n`;
    md += `| ${headers.map(() => "---").join(" | ")} |\n`;
    for (const row of rows) {
      md += `| ${row.join(" | ")} |\n`;
    }
    md += "\n";
  }

  if (chapter.quote) {
    md += `> ${chapter.quote}\n\n`;
  }

  if (chapter.outro) {
    md += chapter.outro.endsWith("\n") ? chapter.outro : `${chapter.outro}\n`;
  }

  return md;
};

const targetSections = process.argv[2]
  ? [process.argv[2]]
  : Object.keys(SECTIONS);

for (const sectionSlug of targetSections) {
  const chapters = SECTIONS[sectionSlug];

  if (!chapters) {
    console.error(`Неизвестный раздел: ${sectionSlug}`);
    process.exit(1);
  }

  const sectionDir = path.join(contentRoot, sectionSlug);
  await mkdir(sectionDir, { recursive: true });

  const manifest = chapters.map(({ slug, title, file, sortOrder }) => ({
    slug,
    title,
    file,
    sortOrder,
  }));

  await writeFile(
    path.join(sectionDir, "chapters.json"),
    `${JSON.stringify(manifest, null, 2)}\n`,
    "utf8",
  );

  let generated = 0;
  let skipped = 0;

  for (const chapter of chapters) {
    if (chapter.skip) {
      skipped += 1;
      continue;
    }

    const filePath = path.join(sectionDir, chapter.file);
    await writeFile(filePath, renderChapter(chapter), "utf8");
    generated += 1;
  }

  console.log(
    `${sectionSlug}: chapters.json (${manifest.length}), сгенерировано ${generated}, пропущено ${skipped}`,
  );
}

console.log("\nГотово. Запусти npm run seed:all для заливки на API.");
