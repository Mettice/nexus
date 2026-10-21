const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = Number(process.env.PORT) || 4180;
const PUBLIC_ROOT = process.argv.includes('--dist') ? path.join(__dirname, 'dist') : __dirname;
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8'
};

const server = http.createServer((req, res) => {
  let reqPath;
  try { reqPath = decodeURIComponent(req.url.split('?')[0]); } catch { res.writeHead(400); res.end('Bad request'); return; }
  if (!['GET', 'HEAD'].includes(req.method)) { res.writeHead(405, {Allow:'GET, HEAD'}); res.end(); return; }
  if (reqPath === '/') reqPath = '/index.html';
  if (reqPath.endsWith('/')) reqPath += 'index.html';
  const filePath = path.resolve(PUBLIC_ROOT, '.' + reqPath);
  const relative = path.relative(PUBLIC_ROOT, filePath);
  if (relative.startsWith('..') || path.isAbsolute(relative) || !/^(index\.html|robots\.txt|sitemap\.xml|site\.webmanifest|(?:assets|css|js|categories|products|brands)[\\/].+)$/.test(relative)) {
    res.writeHead(404); res.end('404 Not Found'); return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType, 'X-Content-Type-Options': 'nosniff' });
    if (req.method === 'HEAD') { res.end(); return; }
    fs.createReadStream(filePath).pipe(res);
  });
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    const nextPort = PORT + 1;
    console.log(`Port ${PORT} is currently busy, switching to http://127.0.0.1:${nextPort}/...`);
    server.listen(nextPort, '127.0.0.1');
  } else {
    console.error('Server error:', err);
  }
});

server.listen(PORT, '127.0.0.1', () => {
  const address = server.address();
  console.log(`\x1b[32m✔ Server running at http://localhost:${address.port}/\x1b[0m`);
});

