import express from 'express';
import cors from 'cors';

import router from './router';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(router);

const port = process.env.PORT || 3000;

app.listen({port});

console.log(`Server started: http://localhost:${port}`)