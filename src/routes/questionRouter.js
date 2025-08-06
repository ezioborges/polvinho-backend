import express from 'express';
import {
	createQuestionController,
	getAllQuestionsByQuizIdController,
	studentAnswerController,
} from '../modules/Questions/controller/QuestionController.js';

const router = express.Router();

router.post(
	'/:quizId/create',
	async (req, res) => await createQuestionController(req, res),
);

router.get('/:quizId/questions', async (req, res) => {
	await getAllQuestionsByQuizIdController(req, res);
});

router.post(
	'/:quizId/student-responses',
	async (req, res) => await studentAnswerController(req, res),
);

export default router;
