import express from 'express';
import './database.js';
import professor from './routes/professorRouter.js';

export const app = express();
export const port = 3333;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/professor', professor);
