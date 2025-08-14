import mongoose from 'mongoose';

const QuizzSchema = new mongoose.Schema({
	professorId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'users',
		default: null,
	},
	subjectId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'subjects',
		default: null,
	},
	questions: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'questions',
			default: [],
		},
	],
	title: { type: String, required: true },
	description: { type: String, required: true },
	isPublished: { type: Boolean, default: false },
	isVisible: { type: Boolean, default: false },
	maxAttempts: { type: Number, default: 1 },
	attemptsRemaining: { type: Number, default: 1 },
	timeMinutes: { type: Number, default: 30 },
	releaseDate: { type: Date, default: null },
	submissionDeadline: { type: Date, default: null },
	createdAt: { type: Date, default: Date.now() },
	updatedAt: { type: Date, default: null },
	deletedAt: { type: Date, default: null },
	isDeleted: { type: Boolean, default: false },
	studentStarted: { type: Boolean, default: false },
});

const Quiz = mongoose.model('quizzes', QuizzSchema);

export default Quiz;
