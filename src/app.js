import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import i18n from 'i18n';
import { join } from 'path';
import router from './routers';

import { InitDB } from './database';
import webhooks from './routers/admin/v1/webhooks';

const app = express();

app.use('/webhooks', webhooks);
app.use(cors());
app.use(morgan('common'));
app.use(express.json({ limit: '10mb' }));

i18n.configure({
  locales: ['en', 'ro'],
  defaultLocale: 'en',
  directory: join(__dirname, 'locales'),
  header: 'accept-language',
});
app.use(i18n.init);

// initialize database
InitDB();

// initialize router
app.use('/', router);

export default app;
