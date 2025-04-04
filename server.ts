import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import AppServerModule from './src/main.server';
import fs from 'fs';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { log } from 'node:console';
import { REQUEST } from '@nguniversal/express-engine/tokens';

dotenv.config();

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
        providers: [
          { provide: APP_BASE_HREF, useValue: baseUrl },
          { provide: REQUEST, useValue: req },
        ],
      });

      return res.status(200).send(html);
    } catch (err) {
      // Forza il fallback al client-side rendering anche in caso di errore
      const html = fs.readFileSync(indexHtml).toString();
      // res.status(404).send(html); // così Angular sul client può fare il routing
      return res.status(404).redirect('404');
    }
  });

  //  Servizio e api per inviare email
  server.use(bodyParser.json());

  server.post('/api/:lang/contact', async (req, res) => {
    const { lang } = req.params; // "it" o "en"
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        error:
          lang === 'it'
            ? 'Tutti i campi sono obbligatori'
            : 'All fields are required',
      });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env['EMAIL_USER'],
        pass: process.env['EMAIL_PASS'],
      },
    });

    try {
      // Email a me
      await transporter.sendMail({
        from: `"${name}" <${email}>`,
        to: process.env['EMAIL_USER'],
        subject: `Nuovo messaggio dal portfolio da ${name}`,
        text: `Messaggio da ${name} (${email}):\n\n${message}`,
      });

      // Risposta automatica all’utente
      const replyText =
        lang === 'it'
          ? `Ciao ${name},\n\nGrazie per il tuo messaggio! Ti risponderò al più presto.\n\nMarco`
          : `Hi ${name},\n\nThank you for your message! I’ll get back to you soon.\n\nMarco`;

      await transporter.sendMail({
        from: `"Marco Cipolletta" <${process.env['EMAIL_USER']}>`,
        to: email,
        subject: lang === 'it' ? 'Conferma ricezione' : 'Message received',
        text: replyText,
      });

      return res.status(200).json({ success: true });
    } catch (error) {
      return res.status(500).json({
        error:
          lang === 'it'
            ? 'Errore durante l’invio dell’email'
            : 'Error sending email',
      });
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
