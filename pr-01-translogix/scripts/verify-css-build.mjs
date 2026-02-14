import { readFileSync } from "node:fs";

const outputPath = "css/style.min.css";
const css = readFileSync(outputPath, "utf8");

if (css.includes("@import")) {
  throw new Error(`CSS build verification failed: ${outputPath} still contains @import.`);
}

if (css.includes("sourceMappingURL")) {
  throw new Error(`CSS build verification failed: ${outputPath} contains a sourcemap reference.`);
}

console.log(`Verified ${outputPath}: no @import and no sourcemap references.`);
