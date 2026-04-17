import assert from 'node:assert/strict';
import path from 'node:path';
import { resolveRequestPath } from '../scripts/dev-server-path.js';

export function runDevServerPathTests() {
  const rootDir = path.resolve('D:/projects/CV');

  const cases = [
    {
      name: 'root path resolves to index.html',
      fn: () => {
        assert.equal(resolveRequestPath(rootDir, '/'), path.resolve(rootDir, './index.html'));
      },
    },
    {
      name: 'in-root static path resolves normally',
      fn: () => {
        assert.equal(
          resolveRequestPath(rootDir, '/styles/site.css'),
          path.resolve(rootDir, './styles/site.css'),
        );
      },
    },
    {
      name: 'path traversal outside root is blocked',
      fn: () => {
        assert.equal(resolveRequestPath(rootDir, '/../secret.txt'), null);
      },
    },
    {
      name: 'sibling directory prefix bypass is blocked on Windows paths',
      fn: () => {
        assert.equal(resolveRequestPath(rootDir, '/../CV2/secret.txt'), null);
      },
    },
    {
      name: 'malformed encoded paths are rejected',
      fn: () => {
        assert.equal(resolveRequestPath(rootDir, '/%E0%A4%A'), null);
      },
    },
  ];

  for (const testCase of cases) {
    testCase.fn();
  }

  return cases.map((testCase) => testCase.name);
}
