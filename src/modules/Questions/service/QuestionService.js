import Quiz from '../../Quizzes/model/QuizSchema.js';
import Question from '../models/QuestionSchemma.js';

export const createQuestionService = async req => {
	try {
		const { quizId } = req.params;
		const question = req.body;

		const quizExists = await Quiz.findOne({
			_id: quizId,
			isDeleted: false,
		});

		if (!quizExists) {
			return {
				status: 404,
				data: { message: 'Quiz não encontrado ou excluido' },
			};
		}

		const newQuestion = new Question({
			...question,
			quizId: quizId,
		});

		await newQuestion.save();

		await Quiz.findByIdAndUpdate(
			quizExists._id,
			{ $push: { questions: newQuestion._id }, updatedAt: Date.now() },
			{ new: true, runValidators: true },
		).populate('questions');

		await Question.findById(newQuestion._id).populate('quizId');

		return {
			status: 201,
			data: newQuestion,
		};
	} catch (error) {
		return {
			status: 500,
			data: { message: `Erro ao criar questão ${error.message}` },
		};
	}
};
