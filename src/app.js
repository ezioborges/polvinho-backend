import cors from 'cors';
import express from 'express';
import './database.js';
import login from './routes/loginRouter.js';
import quizzes from './routes/quizRouter.js';
import subjects from './routes/subjectsRouter.js';
import user from './routes/userRouter.js';

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/users', user);
app.use('/login', login);
app.use('/subjects', subjects);
app.use('/quizzes', quizzes);
