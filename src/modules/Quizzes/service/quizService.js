import { formatDate } from '../../../utils/formatDate.js';
import Subject from '../../Disciplines/model/SubjectSchema.js';
import User from '../../User/model/UserSchema.js';
import Quiz from '../model/QuizSchema.js';

export const createQuizService = async req => {
	const {
		professor,
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

	const professorExists = await User.findOne({
		name: professor,
		role: 'professor',
	});

	const subjectExists = await Subject.findOne({ name: subject });

	try {
		const newQuiz = new Quiz({
			...quizData,
			professorId: professorExists ? professorExists._id : null,
			subjectId: subjectExists ? subjectExists._id : null,
			releaseDate: releaseDate ? formatDate(releaseDate) : null,
			submissionDeadline: submissionDeadline
				? formatDate(submissionDeadline)
				: null,
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

		return { status: 201, data: { message: 'Quiz criado com sucesso!' } };
	} catch (error) {
		return {
			status: 500,
			data: { message: `Erro ao criar quiz: ${error.data}` },
		};
	}
};

export const getAllQuizzesService = async () => {
	try {
		const quizzes = await Quiz.find();

		if (!quizzes || quizzes.length === 0) {
			return { status: 404, data: [] };
		}

		return { status: 200, data: quizzes };
	} catch (error) {
		return { status: 500, date: { message: error.message } };
	}
};

export const getQuizByIdService = async req => {
	try {
		const { quizId } = req.params;

		const quizData = await Quiz.findById(quizId);

		return { status: 200, data: { message: quizData } };
	} catch (error) {
		return { status: 500, data: { message: error.message } };
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

		console.log('subjectExists ===> ', subjectExists);

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
