import mongoose from 'mongoose';

const SubjectSchema = new mongoose.Schema({
	name: { type: String, required: true },
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: null },
	isDeleted: { type: Boolean, default: false },
	professor: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'users',
		required: true,
	},
});

const Subject = mongoose.model('subjects', SubjectSchema);

export default Subject;
