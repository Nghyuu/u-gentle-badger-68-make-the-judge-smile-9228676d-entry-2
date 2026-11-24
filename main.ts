import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const dir = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  throw new Error("MAKEFUN_OUTPUT_DIR is not set");
}
const src = join(dir, "entry.txt");
const text = readFileSync(src, "utf8");
const length = [...text].length;
if (length < 1 || length > 200 || text.trim().length === 0) {
  throw new Error(`entry.txt must be 1-200 characters, got ${length}`);
}
mkdirSync(outDir, { recursive: true });
copyFileSync(src, join(outDir, "entry.txt"));
console.log(`Wrote entry.txt (${length} characters) to ${outDir}`);
