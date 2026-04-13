import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const PORT = Number(process.env.PORT || 4173);

const MIME_TYPES = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.webp': 'image/webp',
};

function resolveFilePath(urlPath) {
  const pathname = decodeURIComponent((urlPath || '/').split('?')[0]);
  const normalized = pathname === '/' ? '/index.html' : pathname;
  const absolutePath = path.resolve(ROOT_DIR, `.${normalized}`);

  if (!absolutePath.startsWith(ROOT_DIR)) {
    return null;
  }

  return absolutePath;
}

function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return MIME_TYPES[ext] || 'application/octet-stream';
}

const server = createServer(async (req, res) => {
  const requestedPath = resolveFilePath(req.url);
  if (!requestedPath) {
    res.writeHead(403, { 'content-type': 'text/plain; charset=utf-8' });
    res.end('Forbidden');
    return;
  }

  try {
    let filePath = requestedPath;
    const meta = await stat(filePath);
    if (meta.isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    }

    const data = await readFile(filePath);
    res.writeHead(200, {
      'cache-control': 'no-cache',
      'content-type': getMimeType(filePath),
    });
    res.end(data);
  } catch {
    res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
    res.end('Not Found');
  }
});

server.listen(PORT, () => {
  console.log(`CV site server running at http://127.0.0.1:${PORT}`);
});
