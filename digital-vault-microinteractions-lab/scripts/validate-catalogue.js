'use strict';

// Runs the catalogue's browser validation against the same source data without
// starting the application or requiring third-party packages.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const mainPath = path.resolve(__dirname, '../assets/js/main.js');
const source = fs.readFileSync(mainPath, 'utf8');
const context = vm.createContext({
  console,
  document: { addEventListener() {} }
});

try {
  vm.runInContext(`${source}\n;globalThis.__catalogue = { interactions, normalizeInteractionSnippets, validateInteractions };`, context, { filename: mainPath });
  const catalogue = context.__catalogue;
  catalogue.normalizeInteractionSnippets(catalogue.interactions);
  const warnings = catalogue.validateInteractions(catalogue.interactions);

  if (warnings.length > 0) {
    console.error(`Catalogue validation failed with ${warnings.length} warning(s).`);
    process.exitCode = 1;
  } else {
    console.log(`Catalogue validation passed for ${catalogue.interactions.length} interactions.`);
  }
} catch (error) {
  console.error('Catalogue validation could not run:', error.message);
  process.exitCode = 1;
}
