import Answer from '../modules/Answer/model/AnswerSchema.js';
import User from '../modules/User/model/UserSchema.js';

export const studentResult = async (quizId, studentId, quiz) => {
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

	// Busca todas as respostas do aluno para esse quiz
	const studentAnswersDocs = await Answer.find({ quizId, studentId });
	console.log('🚀 ~ studentResult ~ studentAnswersDocs:', studentAnswersDocs);

	// Para cada tentativa (documento), calcula o resultado
	const results = studentAnswersDocs.map(answerDoc => {
		const answersArr = answerDoc.answers;
		const studentSelectedOptions = answersArr.map(
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

		return {
			attempt: answersArr[0]?.attempt ?? null, // se você salva o número da tentativa
			correctAnswersCount,
			totalQuestions: correctAnswers.length,
			score: result,
			answers: answersArr,
		};
	});

	return results; // retorna um array de resultados, um para cada tentativa
};
