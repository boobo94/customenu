import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import router from './routers';

import { InitDB } from './database';
import webhooks from './routers/admin/v1/webhooks';

const app = express();

app.use('/webhooks', webhooks);
app.use(cors());
app.use(morgan('common'));
app.use(express.json({ limit: '10mb' }));

// initialize database
InitDB();

// initialize router
app.use('/', router);

export default app;
