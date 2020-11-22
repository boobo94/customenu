import express from 'express';
import cors from 'cors';
import router from './routers';

import { InitDB } from './database';

const app = express();

app.use(cors());

app.use(express.json({ limit: '10mb' }));

// initialize database
InitDB();

// initialize router
app.use('/', router);

export default app;
