import express from 'express';
import {
	createQuizController,
	deleteQuizController,
	getAllQuizzesController,
	getQuizByIdController,
	updateQuizController,
} from '../modules/Quizzes/controller/quizzController.js';

const router = express.Router();

router.post('/', async (req, res) => await createQuizController(req, res));

router.get('/', async (req, res) => await getAllQuizzesController(req, res));

router.get(
	'/:quizId',
	async (req, res) => await getQuizByIdController(req, res),
);

router.put(
	'/:quizId',
	async (req, res) => await updateQuizController(req, res),
);

router.delete(
	'/:quizId',
	async (req, res) => await deleteQuizController(req, res),
);

export default router;
