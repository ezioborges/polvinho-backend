import mongoose from 'mongoose';

const ProfessorSchema = new mongoose.Schema({
	name: { type: String, require: true },
	email: { type: String, require: true },
	registration: { type: String, require: true },
	passwordHash: { type: String, require: true },
	role: { type: String, require: true },
	createdAt: { type: Date, default: Date.now(), require: true },
	updatedAt: { type: Date, default: Date.now() },
	isDeleted: { type: Boolean, require: true },
});

mongoose.model('professors', ProfessorSchema);
