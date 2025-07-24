import mongoose from 'mongoose';

const QuestionSchemma = new mongoose.Schema({
	quizId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'quizzes',
		default: null,
	},
	question: { type: String, required: true },
	firstOption: { type: String, required: true },
	secondOption: { type: String, required: true },
	thirdOption: { type: String, required: true },
	correctOption: { type: String, required: true },
	createsAt: { type: Date, default: Date.now() },
	updatedAt: { type: Date, default: null },
	isDeleted: { type: Boolean, default: false },
});

const Question = mongoose.model('questions', QuestionSchemma);

export default Question;
