import { createQuestionService } from '../service/QuestionService.js';

export const createQuestionController = async (req, res) => {
	const { status, data } = await createQuestionService(req);

	return res.status(status).send(data);
};
