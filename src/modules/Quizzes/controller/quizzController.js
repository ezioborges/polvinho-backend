import {
	createQuizService,
	deleteQuizService,
	getAllQuizzesService,
	getQuizByIdService,
	getQuizzesBySubjectService,
	publishQuizService,
	quizStudentResultService,
	studentStartQuizService,
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

export const getQuizzesBySubjectController = async (req, res) => {
	const { status, data } = await getQuizzesBySubjectService(req);

	return res.status(status).send(data);
};

export const updateQuizController = async (req, res) => {
	const { status, data } = await updateQuizService(req);

	return res.status(status).send(data);
};

export const publishQuizController = async (req, res) => {
	const { status, data } = await publishQuizService(req);

	return res.status(status).send(data);
};

export const studentStartQuizController = async (req, res) => {
	const { status, data } = await studentStartQuizService(req);

	return res.status(status).send(data);
};

export const deleteQuizController = async (req, res) => {
	const { status, data } = await deleteQuizService(req);

	return res.status(status).send(data);
};

export const quizStudentResultController = async (req, res) => {
	const { status, data } = await quizStudentResultService(req);

	return res.status(status).send(data);
};
