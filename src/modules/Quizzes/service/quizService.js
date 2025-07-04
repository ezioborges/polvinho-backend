import Quiz from '../model/QuizSchema.js';

export const createQuizService = async req => {
	try {
		const { ...quizData } = req.body;

		const newQuiz = new Quiz({
			...quizData,
		});

		await newQuiz.save();

		return { status: 201, data: { message: 'Quiz criado com sucesso!' } };
	} catch (error) {
		return { status: 500, data: { message: error.data } };
	}
};

export const getAllQuizzesService = async () => {
	try {
		const quizzes = await Quiz.find();

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

export const updateQuizService = async req => {
	try {
		const { quizId } = req.params;
		const { ...quizData } = req.body;

		const quizExists = await Quiz.findById(quizId);

		if (!quizExists) {
			return {
				status: 404,
				data: { message: 'Quizz não encontrado' },
			};
		}

		await Quiz.findByIdAndUpdate(
			quizId,
			{ ...quizData, updateAt: Date.now() },
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
