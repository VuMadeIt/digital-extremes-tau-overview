/**
 * Lightweight Blade/PHP view runner for local preview when full Laravel isn't available.
 * Renders the same resources/views/*.blade.php templates used by OverviewController.
 */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { spawn } from 'node:child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const publicDir = path.join(root, 'public');
const phpBin = path.join(root, 'tools', 'php', 'php.exe');
const port = Number(process.env.PORT || 8080);

const mime = {
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.ico': 'image/x-icon',
};

function send(res, status, body, type = 'text/html; charset=utf-8') {
  res.writeHead(status, { 'Content-Type': type });
  res.end(body);
}

function serveStatic(req, res, urlPath) {
  const safe = path.normalize(urlPath).replace(/^(\.\.[/\\])+/, '');
  const filePath = path.join(publicDir, safe);
  if (!filePath.startsWith(publicDir) || !fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    return false;
  }
  const ext = path.extname(filePath).toLowerCase();
  res.writeHead(200, { 'Content-Type': mime[ext] || 'application/octet-stream' });
  fs.createReadStream(filePath).pipe(res);
  return true;
}

function runPhp(res) {
  const child = spawn(phpBin, [path.join(publicDir, 'index.php')], {
    cwd: publicDir,
    env: {
      ...process.env,
      REQUEST_METHOD: 'GET',
      REQUEST_URI: '/',
      SCRIPT_FILENAME: path.join(publicDir, 'index.php'),
    },
  });

  let stdout = '';
  let stderr = '';
  child.stdout.on('data', (d) => { stdout += d; });
  child.stderr.on('data', (d) => { stderr += d; });
  child.on('close', (code) => {
    if (code !== 0) {
      send(res, 500, `<pre>PHP error (${code})\n${stderr || stdout}</pre>`);
      return;
    }
    send(res, 200, stdout);
  });
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url || '/', `http://${req.headers.host}`);
  if (url.pathname !== '/' && serveStatic(req, res, url.pathname)) return;

  if (!fs.existsSync(phpBin)) {
    send(
      res,
      503,
      `<h1>PHP runtime missing</h1>
       <p>Place portable PHP at <code>tools/php/php.exe</code> or approve the PHP download, then restart.</p>
       <p>Assets and Blade templates are already in place. Try <code>npm run serve</code> after PHP is available.</p>`
    );
    return;
  }

  if (url.pathname === '/' || url.pathname === '/overview') {
    runPhp(res);
    return;
  }

  send(res, 404, 'Not Found');
});

server.listen(port, () => {
  console.log(`Overview prototype → http://localhost:${port}/`);
  console.log(fs.existsSync(phpBin) ? `Using ${phpBin}` : 'Waiting for tools/php/php.exe');
});
