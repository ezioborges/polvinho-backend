import mongoose from 'mongoose';

const AnswerSchema = new mongoose.Schema({
	quizId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'quizzes',
		required: true,
	},
	studentId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'users',
		required: true,
	},
	answers: [
		{
			questionId: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'questions',
				required: true,
			},
			selectedOptionId: {
				type: String,
				required: true,
			},
			attempt: { type: Number }, // se quiser controlar tentativas
		},
	],
	createdAt: { type: Date, default: Date.now() },
});

const Answer = mongoose.model('responses', AnswerSchema);

export default Answer;
