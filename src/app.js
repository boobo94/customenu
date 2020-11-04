import express from 'express';
import cors from 'cors';
import router from './routers';

import { InitDB } from './database';

const app = express();

app.use(cors());

app.use(express.json());

// initialize database
InitDB();

// initialize router
app.use('/', router);

export default app;
