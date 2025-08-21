import cors from 'cors';
import express from 'express';
import './database.js';
import login from './routes/loginRouter.js';
import professor from './routes/professorRouter.js';
import questions from './routes/questionRouter.js';
import quizzes from './routes/quizRouter.js';
import student from './routes/studentRouter.js';
import subjects from './routes/subjectsRouter.js';
import users from './routes/userRouter.js';

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/login', login);
app.use('/subjects', subjects);
app.use('/quizzes', quizzes);
app.use('/professors', professor);
app.use('/students', student);
app.use('/users', users);
app.use('/questions', questions);
