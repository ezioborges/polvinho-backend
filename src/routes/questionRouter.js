import express from 'express';
import { createQuestionController } from '../modules/Questions/controller/QuestionController.js';

const router = express.Router();

router.post(
	'/:quizId/create',
	async (req, res) => await createQuestionController(req, res),
);

export default router;
