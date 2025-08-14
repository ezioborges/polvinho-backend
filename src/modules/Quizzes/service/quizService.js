import { formatDate } from '../../../utils/formatDate.js';
import Answer from '../../Answer/model/AnswerSchema.js';
import Subject from '../../Disciplines/model/SubjectSchema.js';
import User from '../../User/model/UserSchema.js';
import Quiz from '../model/QuizSchema.js';

export const createQuizService = async req => {
	const {
		subject,
		releaseDate,
		submissionDeadline,
		description,
		...quizData
	} = req.body;

	if (!description) {
		return {
			status: 400,
			data: { message: 'Por favor, forneça uma descrição para o quiz' },
		};
	}

	const subjectExists = await Subject.findOne({ name: subject });

	const formatedDate = formatDate(submissionDeadline);

	try {
		const newQuiz = new Quiz({
			...quizData,
			professorId: subjectExists.professor,
			subjectId: subjectExists ? subjectExists._id : null,
			releaseDate: releaseDate ? releaseDate : null,
			submissionDeadline: formatedDate ? formatedDate : null,
			description,
		});
		await newQuiz.save();

		await Subject.findByIdAndUpdate(
			subjectExists._id,
			{
				$push: { quizzes: newQuiz._id },
				updatedAt: Date.now(),
			},
			{ new: true, runValidators: true },
		);

		return { status: 201, data: { quizId: newQuiz._id } };
	} catch (error) {
		return {
			status: 500,
			data: { message: `Erro ao criar quiz: ${error.data}` },
		};
	}
};

export const getAllQuizzesService = async () => {
	try {
		const quizzes = await Quiz.find()
			.populate('professorId')
			.populate('subjectId')
			.populate('questions');

		if (!quizzes || quizzes.length === 0) {
			return { status: 404, data: [] };
		}

		return { status: 200, data: quizzes };
	} catch (error) {
		return { status: 500, date: { message: error.message } };
	}
};

export const getQuizByIdService = async req => {
	const { quizId } = req.params;

	try {
		const quiz = await Quiz.findById(quizId)
			.populate('professorId')
			.populate('subjectId')
			.populate('questions');

		return { status: 200, data: quiz };
	} catch (error) {
		return {
			status: 500,
			data: { message: `Erro ao buscar quiz pelo ID ${error}` },
		};
	}
};

export const getQuizzesBySubjectService = async req => {
	const { subjectId } = req.params;

	const subject = await Subject.findById(subjectId).populate('quizzes');
	try {
		return { status: 200, data: subject };
	} catch (error) {
		return {
			status: 500,
			data: {
				message: `Error ao trazer os quizzes da subject${error.message}`,
			},
		};
	}
};

export const updateQuizService = async req => {
	try {
		const { quizId } = req.params;
		const { professor, subject, ...quizData } = req.body;

		const quizExists = await Quiz.findById(quizId);

		if (!quizExists) {
			return {
				status: 404,
				data: { message: 'Quizz não encontrado' },
			};
		}

		const professorExists = await User.findOne({ name: professor });

		const subjectExists = await Subject.findOne({ name: subject });

		// atualiza o quizz
		await Quiz.findByIdAndUpdate(
			quizId,
			{
				...quizData,
				professorId: professorExists ? professorExists._id : null,
				subjectId: subjectExists ? subjectExists._id : null,
				updateAt: Date.now(),
			},
			{ new: true, runValidators: true },
		);

		// atualiza o professor no cadastro da disciplina
		await User.findByIdAndUpdate(
			professorExists._id,
			{ $push: { quizzes: quizId }, updatedAt: Date.now() },
			{ new: true, runValidators: true },
		);

		// retira o quizz do professor que estava cadastrado na disciplina
		await User.findByIdAndUpdate(
			quizExists.professorId,
			{ $pull: { quizzes: quizId }, updatedAt: Date.now() },
			{ new: true, runValidators: true },
		);

		// atualiza a disciplina com o id do quizz
		await Subject.findByIdAndUpdate(
			subjectExists._id,
			{ $push: { quizzes: quizId }, updatedAt: Date.now() },
			{ new: true, runValidators: true },
		);

		return {
			status: 200,
			data: { message: 'Quiz atualizado com sucesso!' },
		};
	} catch (error) {
		return { status: 500, data: { message: error.message } };
	}
};

export const publishQuizService = async req => {
	try {
		const { quizId } = req.params;

		const quizExists = await Quiz.findById(quizId);

		if (!quizExists || quizExists.isDeleted === true) {
			return {
				status: 404,
				data: { message: 'Quiz não existe ou já foi deletado!' },
			};
		}

		await Quiz.findByIdAndUpdate(
			quizExists._id,
			{ isPublished: true, updatedAt: Date.now() },
			{ new: true, runValidators: true },
		);

		return { status: 200, data: { message: 'Quiz iniciado com sucesso!' } };
	} catch (error) {
		return {
			status: 500,
			data: {
				message: `Não foi possível iniciar o quiz: ${error.message}`,
			},
		};
	}
};

export const studentStartQuizService = async req => {
	try {
		const { quizId } = req.params;

		const quiz = await Quiz.findById(quizId);

		if (!quiz || quiz.isDeleted === true) {
			return {
				status: 404,
				data: { message: 'Quiz deletado ou não existe!' },
			};
		}

		if (quiz.attemptsRemaining <= 0) {
			return {
				status: 400,
				data: {
					message:
						'Você não tem mais tentativas restantes para este quiz.',
				},
			};
		}

		if (quiz.studentStarted === true) {
			return {
				status: 400,
				data: { message: 'O quiz está em andamento' },
			};
		}

		const newAttemptsValue = quiz.attemptsRemaining - 1;

		const updatedQuiz = await Quiz.findByIdAndUpdate(
			quizId,
			{
				$set: {
					studentStarted: newAttemptsValue <= 0,
					updatedAt: Date.now(),
				},
				$inc: { attemptsRemaining: -1 },
			},
			{ new: true, runValidators: true },
		);

		return {
			status: 200,
			data: {
				message:
					newAttemptsValue <= 0
						? 'Quiz finalizado - sem mais tentativas'
						: 'Quiz iniciado com sucesso!',
				quiz: updatedQuiz,
				attemptsRemaining: updatedQuiz.attemptsRemaining,
			},
		};
	} catch (error) {
		return {
			status: 500,
			data: {
				message: `Erro ao iniciar o quiz para o aluno: ${error.message}`,
			},
		};
	}
};

export const deleteQuizService = async req => {
	try {
		const { quizId } = req.params;

		const quizExists = await Quiz.findById(quizId);

		if (!quizExists || quizExists.isDeleted === true) {
			return {
				status: 404,
				data: { message: 'Quiz não existe ou já foi deletado!' },
			};
		}

		await Quiz.findByIdAndUpdate(
			quizId,
			{
				isDeleted: true,
				deletedAt: Date.now(),
				updateAt: Date.now(),
			},
			{ new: true, runValidators: true },
		);

		return { status: 200, data: { message: 'Quiz deletado!' } };
	} catch (error) {
		return { status: 500, data: { message: error.message } };
	}
};

export const quizStudentResultService = async req => {
	try {
		const { quizId, studentId } = req.params;

		const quiz = await Quiz.findById(quizId).populate('questions');

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
				data: { message: 'Aluno não encontrado ou deletado.' },
			};
		}

		const correctAnswers = quiz.questions.map(question =>
			question.options.find(option => option.isCorrect),
		);

		const studentAnswers = await Answer.find({ quizId, studentId });

		const studentSelectedOptions = studentAnswers.map(
			answer => answer.selectedOptionId,
		);

		let correctAnswersCount = 0;
		correctAnswers.forEach(answer => {
			if (studentSelectedOptions.includes(answer._id.toString())) {
				correctAnswersCount++;
			}
		});

		const result = (
			(correctAnswersCount / correctAnswers.length) *
			10
		).toFixed();

		return { status: 200, data: { result } };
	} catch (error) {
		return {
			status: 500,
			data: {
				message: 'Não foi possível retornar nota do aluno.',
				error: error.message,
			},
		};
	}
};
