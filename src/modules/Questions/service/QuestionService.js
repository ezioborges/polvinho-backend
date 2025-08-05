import Quiz from '../../Quizzes/model/QuizSchema.js';
import Question from '../models/QuestionSchemma.js';

export const createQuestionService = async req => {
	try {
		const { quizId } = req.params;

		const { question, options } = req.body;

		const quiz = await Quiz.findById(quizId);

		if (!quiz) {
			return { status: 404, data: { message: 'Quiz não encontrado' } };
		}

		if (!question) {
			return {
				status: 400,
				data: { message: 'Pergunta é obrigatória!' },
			};
		}

		if (!options || options.length < 4) {
			return {
				status: 400,
				data: { message: 'No mínimo quatro opções são obrigatórias!' },
			};
		}

		const correctAnswers = options.filter(
			option => option.isCorrect === true,
		);
		if (correctAnswers.length !== 1) {
			return {
				status: 400,
				data: {
					message:
						'A pergunta deve possuir apenas UMA alternativa correta.',
				},
			};
		}

		const newQuestion = new Question({
			quizId: quizId ? quizId : null,
			question,
			options: options.map(option => ({
				option: option.option,
				isCorrect: option.isCorrect || false,
			})),
		});

		await newQuestion.save();

		if (quizId) {
			await Quiz.findByIdAndUpdate(
				quizId,
				{
					$push: { questions: newQuestion._id },
					updatedAt: Date.now(),
				},
				{ new: true, runValidators: true },
			);
		}

		return {
			status: 201,
			data: {
				message: 'Pergunta criada com sucesso!',
				questionId: newQuestion._id,
			},
		};
	} catch (error) {
		return {
			status: 500,
			data: { message: `Erro ao criar questão ${error.message}` },
		};
	}
};
