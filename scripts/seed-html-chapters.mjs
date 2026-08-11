#!/usr/bin/env node
/**
 * @deprecated Используй: node scripts/seed-chapters.mjs html
 */
import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const child = spawn(process.execPath, [path.join(__dirname, "seed-chapters.mjs"), "html"], {
  stdio: "inherit",
});

child.on("exit", (code) => process.exit(code ?? 1));
