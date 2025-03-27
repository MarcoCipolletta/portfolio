import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import AppServerModule from './src/main.server';
import fs from 'fs';

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(
    serverDistFolder,
    './dist/portfolio/browser'
  );
  const indexHtml = join(browserDistFolder, 'index.html'); // NON nella root

  const commonEngine = new CommonEngine();

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get(
    '**',
    express.static(browserDistFolder, {
      maxAge: '1y',
      index: 'index.html',
    })
  );

  server.get('/debug-files', (req, res) => {
    const files = fs.readdirSync(browserDistFolder);
    res.send(files);
  });

  // All regular routes use the Angular engine
  server.get('*', async (req, res) => {
    const { originalUrl, baseUrl } = req;

    try {
      const html = await commonEngine.render({
        bootstrap: AppServerModule,
        documentFilePath: indexHtml,
        url: originalUrl,
        publicPath: browserDistFolder,
        providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
      });

      res.status(200).send(html);
    } catch (err) {
      // Forza il fallback al client-side rendering anche in caso di errore
      const html = fs.readFileSync(indexHtml).toString();
      // res.status(404).send(html); // status 200, così Angular sul client può fare il routing
      res.status(404).redirect('404');
    }
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();
