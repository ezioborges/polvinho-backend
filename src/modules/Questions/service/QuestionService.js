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
		const { quizId, studentId } = req.params;
		const answersArray = req.body; // aqui recebe o array de resposta

		// Validação básica
		if (!answersArray || answersArray.length === 0) {
			return {
				status: 400,
				data: { message: 'Quiz sem respostas salvas' },
			};
		}

		const quiz = await Quiz.findById(quizId);
		if (!quiz || quiz.isDeleted === true) {
			return {
				status: 404,
				data: { message: 'Quiz não encontrado ou deletado.' },
			};
		}

		const student = await User.findById(studentId);
		if (!student || student.isDeleted === true) {
			return {
				status: 404,
				data: { message: 'Estudante não encontrado ou excluído.' },
			};
		}

		// Validação de cada resposta
		const answersToSave = [];
		for (const answer of answersArray) {
			const { questionId, selectedOptionId } = answer;

			const question = await Question.findById(questionId);
			if (!question || question.isDeleted === true) {
				return {
					status: 404,
					data: {
						message: `Pergunta ${questionId} não encontrada ou deletada.`,
					},
				};
			}

			const selectedOptionExists = question.options.some(
				option => option._id.toString() === selectedOptionId,
			);
			if (!selectedOptionExists) {
				return {
					status: 400,
					data: {
						message: `Opção ${selectedOptionId} não está disponível para a pergunta ${questionId}`,
					},
				};
			}

			answersToSave.push({
				questionId,
				selectedOptionId,
			});
		}

		const newAnswers = new Answer({
			quizId,
			studentId,
			answers: answersToSave,
			createdAt: Date.now(),
		});
		await newAnswers.save();

		await Quiz.findByIdAndUpdate(
			quizId,
			{
				studentStarted: false,
				updatedAt: Date.now(),
			},
			{ new: true, runValidators: true },
		);

		return {
			status: 201,
			data: {
				message: 'Respostas registradas com sucesso',
				answers: newAnswers.answers,
			},
		};
	} catch (error) {
		return {
			status: 500,
			data: {
				message: 'Não foi possível registrar as respostas',
				error: error.message,
			},
		};
	}
};

export const getAllStudentAnswersByQuizIdService = async req => {
	try {
		const { quizId, studentId } = req.params;

		const quizExists = await Quiz.findById(quizId);

		if (!quizExists) {
			return { status: 404, data: { message: 'Quiz não encontrado.' } };
		}

		const studentExists = await User.findById(studentId);

		if (!studentExists) {
			return {
				status: 404,
				data: { message: 'Estudante não localizado.' },
			};
		}

		const studentAnswers = await Answer.find();

		return {
			status: 200,
			data: {
				quiz: quizExists.title,
				student: studentExists.name,
				studentAnswers,
				answersAmount: studentAnswers.length,
			},
		};
	} catch (error) {
		return {
			status: 500,
			data: {
				message:
					'Não foi possível encontrar as respostas do estudante.',
				error: error.message,
			},
		};
	}
};
