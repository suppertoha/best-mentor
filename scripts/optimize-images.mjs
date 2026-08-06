import { readdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const imagesDir = path.resolve("src/shared/assets/images");

const optimizePng = async (filePath) => {
  const before = (await sharp(filePath).metadata()).size ?? 0;

  const buffer = await sharp(filePath)
    .png({
      compressionLevel: 9,
      palette: true,
      quality: 80,
      effort: 10,
    })
    .toBuffer();

  await sharp(buffer).toFile(filePath);

  const after = buffer.length;
  const saved = before > 0 ? (((before - after) / before) * 100).toFixed(1) : "0.0";

  console.log(`${path.basename(filePath)}: ${before} -> ${after} bytes (-${saved}%)`);
};

const files = await readdir(imagesDir, { recursive: true });
const pngFiles = files
  .filter((file) => typeof file === "string" && file.endsWith(".png"))
  .map((file) => path.join(imagesDir, file));

if (pngFiles.length === 0) {
  console.log("No PNG files found.");
  process.exit(0);
}

for (const filePath of pngFiles) {
  await optimizePng(filePath);
}
