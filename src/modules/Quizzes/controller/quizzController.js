import {
	createQuizService,
	deleteQuizService,
	getAllQuizzesService,
	getQuizByIdService,
	updateQuizService,
} from '../service/quizService.js';

export const createQuizController = async (req, res) => {
	const { status, data } = await createQuizService(req);

	return res.status(status).send(data);
};

export const getAllQuizzesController = async (_req, res) => {
	const { status, data } = await getAllQuizzesService();

	return res.status(status).send(data);
};

export const getQuizByIdController = async (req, res) => {
	const { status, data } = await getQuizByIdService(req);

	return res.status(status).send(data);
};

export const updateQuizController = async (req, res) => {
	const { status, data } = await updateQuizService(req);

	return res.status(status).send(data);
};

export const deleteQuizController = async (req, res) => {
	const { status, data } = await deleteQuizService(req);

	return res.status(status).send(data);
};
