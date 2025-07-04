import mongoose from 'mongoose';

const QuizzSchema = new mongoose.Schema({
	teacherId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'users',
		default: null,
	},
	subjectId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'subjects',
		default: null,
	},
	title: { type: String, required: true },
	isPublished: { type: Boolean, default: false },
	maxAttempts: { type: Number, default: 1 },
	timeMinutes: { type: Number, default: 30 },
	releaseDate: { type: Date, default: null },
	createdAt: { type: Date, default: Date.now() },
	updateAt: { type: Date, dafault: null },
	deletedAt: { type: Date, default: null },
	isDeleted: { type: Boolean, default: false },
});

const Quizz = mongoose.model('quizzes', QuizzSchema);

export default Quizz;
