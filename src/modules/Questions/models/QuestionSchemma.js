import mongoose from 'mongoose';

const QuestionSchemma = new mongoose.Schema({
	quizId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'quizzes',
		default: null,
	},
	question: { type: String, required: true },
	options: [
		{
			option: { type: String, required: true },
			isCorrect: { type: Boolean, default: false },
		},
	],
	createdAt: { type: Date, default: Date.now() },
	updatedAt: { type: Date, default: null },
	isDeleted: { type: Boolean, default: false },
});

const Question = mongoose.model('questions', QuestionSchemma);

export default Question;
