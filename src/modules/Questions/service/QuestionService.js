import Answer from '../../Answer/model/AnswerSchema.js';
import Quiz from '../../Quizzes/model/QuizSchema.js';
import User from '../../User/model/UserSchema.js';
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

export const getAllQuestionsByQuizIdService = async req => {
	try {
		const { quizId } = req.params;

		const quiz = await Quiz.findById(quizId).populate('questions');

		return { status: 200, data: { quiz } };
	} catch (error) {
		return {
			status: 500,
			data: {
				message: 'Não foi possível recuperar as questão do quiz',
				error: error.message,
			},
		};
	}
};

export const studentAnswerService = async req => {
	try {
		const { quizId } = req.params;

		const { questionId, studentId, selectedOption } = req.body;

		const quizExists = await Quiz.findById(quizId).populate('questions');

		if (!quizExists) {
			return {
				status: 404,
				data: {
					message:
						'Quiz não encontrado ou fora do prazo para realização.',
				},
			};
		}

		const questionOfQuiz = quizExists.questions.some(
			question => question._id.toString() === questionId,
		);

		if (!questionOfQuiz || quizExists.questions.length === 0) {
			return {
				status: 404,
				data: {
					message:
						'Perguntão não encontrada ou não faz parte do quiz',
				},
			};
		}

		const questionExists = await Question.findById(questionId);

		if (!questionExists || questionExists.length === 0) {
			return {
				status: 404,
				data: {
					message: 'Pergunta não encontrada ou não faz parte do quiz',
				},
			};
		}

		const studentExists = await User.findById(studentId);

		if (!studentExists) {
			return {
				status: 404,
				data: { message: 'Estudante não encontrado.' },
			};
		}

		const selectedOptionExists = questionExists.options.some(
			option => option._id.toString() === selectedOption,
		);

		const existingAnswer = await Answer.findOne({
			studentId: studentExists._id,
			quizId: quizExists._id,
			questionId: questionExists._id,
		});

		if (existingAnswer) {
			return {
				status: 409,
				data: { message: 'Resposta já registrada para esta pergunta.' },
			};
		}

		const newAnswer = new Answer({
			studentId: studentExists._id,
			quizId: quizExists._id,
			questionId: questionExists._id,
			selectedOption: selectedOptionExists ? selectedOption : null,
		});

		await newAnswer.save();

		return {
			status: 201,
			data: { message: 'Resposta registrada com sucesso' },
		};
	} catch (error) {
		return {
			status: 500,
			data: {
				message: 'Não foi possível registrar a resposta',
				error: error.message,
			},
		};
	}
};
