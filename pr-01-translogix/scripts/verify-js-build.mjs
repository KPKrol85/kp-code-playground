import { readFileSync } from "node:fs";

const outputPath = "js/script.min.js";
const js = readFileSync(outputPath, "utf8");

if (/\bimport\s/.test(js)) {
  throw new Error(`JS build verification failed: ${outputPath} still contains an import statement.`);
}

if (/\bexport\s/.test(js)) {
  throw new Error(`JS build verification failed: ${outputPath} still contains an export statement.`);
}

console.log(`Verified ${outputPath}: no import/export statements remain.`);
