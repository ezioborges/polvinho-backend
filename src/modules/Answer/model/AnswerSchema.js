import mongoose from 'mongoose';

const AnswerSchema = new mongoose.Schema({
	answers: [
		{
			attempt: { type: Number, required: true },
			studentId: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'users',
				required: true,
			},
			quizId: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'quizzes',
				required: true,
			},
			questionId: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'questions',
				required: true,
			},
			selectedOptionId: {
				type: String,
				required: true,
			},
		},
	],
	createdAt: { type: Date, default: Date.now() },
});

const Answer = mongoose.model('responses', AnswerSchema);

export default Answer;
