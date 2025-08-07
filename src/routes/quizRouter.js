import express from 'express';
import { getAllStudentAnswersByQuizIdController } from '../modules/Questions/controller/QuestionController.js';
import {
	createQuizController,
	deleteQuizController,
	getAllQuizzesController,
	getQuizByIdController,
	getQuizzesBySubjectController,
	publishQuizController,
	studentStartQuizController,
	updateQuizController,
} from '../modules/Quizzes/controller/quizzController.js';

const router = express.Router();

router.post('/', async (req, res) => await createQuizController(req, res));

router.get('/', async (req, res) => await getAllQuizzesController(req, res));

router.get(
	'/:subjectId',
	async (req, res) => await getQuizzesBySubjectController(req, res),
);

router.get(
	'/quiz/:quizId',
	async (req, res) => await getQuizByIdController(req, res),
);

router.get(
	'/:quizId/student/:studentId/questions-responses',
	async (req, res) => await getAllStudentAnswersByQuizIdController(req, res),
);

router.put(
	'/:quizId',
	async (req, res) => await updateQuizController(req, res),
);

router.put(
	'/start/:quizId',
	async (req, res) => await publishQuizController(req, res),
);

router.put(
	'/student-start/:quizId',
	async (req, res) => await studentStartQuizController(req, res),
);

router.delete(
	'/:quizId',
	async (req, res) => await deleteQuizController(req, res),
);

export default router;
