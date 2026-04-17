import path from 'node:path';

export function resolveRequestPath(rootDir, urlPath) {
  const normalizedRootDir = path.resolve(rootDir);

  let pathname = '/';
  try {
    pathname = decodeURIComponent((urlPath || '/').split('?')[0]);
  } catch {
    return null;
  }

  const normalizedPath = pathname === '/' ? '/index.html' : pathname;
  const absolutePath = path.resolve(normalizedRootDir, `.${normalizedPath}`);
  const relativePath = path.relative(normalizedRootDir, absolutePath);
  const isOutsideRoot = relativePath.startsWith('..') || path.isAbsolute(relativePath);

  if (isOutsideRoot) {
    return null;
  }

  return absolutePath;
}
