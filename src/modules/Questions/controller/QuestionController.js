import {
	createQuestionService,
	getAllQuestionsByQuizIdService,
	studentAnswerService,
} from '../service/QuestionService.js';

export const createQuestionController = async (req, res) => {
	const { status, data } = await createQuestionService(req);

	return res.status(status).send(data);
};

export const getAllQuestionsByQuizIdController = async (req, res) => {
	const { status, data } = await getAllQuestionsByQuizIdService(req);

	return res.status(status).send(data);
};

export const studentAnswerController = async (req, res) => {
	const { status, data } = await studentAnswerService(req);

	return res.status(status).send(data);
};
