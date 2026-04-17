import { runContentModelTests } from './content-model.test.js';
import { runDevServerPathTests } from './dev-server-path.test.js';
import { runSiteUtilsTests } from './site-utils.test.js';

const suites = [
  { name: 'content-model', run: runContentModelTests },
  { name: 'dev-server-path', run: runDevServerPathTests },
  { name: 'site-utils', run: runSiteUtilsTests },
];

let total = 0;
let failed = 0;

for (const suite of suites) {
  try {
    const caseNames = suite.run();
    for (const caseName of caseNames) {
      total += 1;
      console.log(`PASS ${suite.name}: ${caseName}`);
    }
  } catch (error) {
    failed += 1;
    console.error(`FAIL ${suite.name}: ${error.message}`);
    console.error(error.stack);
  }
}

if (failed > 0) {
  console.error(`\n${failed} suite(s) failed.`);
  process.exit(1);
}

console.log(`\nAll tests passed (${total} checks).`);
