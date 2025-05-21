import cors from 'cors';
import express from 'express';
import './database.js';
import user from './routes/userRouter.js';

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/users', user);
