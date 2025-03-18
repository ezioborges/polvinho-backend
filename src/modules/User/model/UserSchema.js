import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
	name: { type: String, require: true },
	email: { type: String, require: true },
	registration: { type: String, require: true },
	passwordHash: { type: String, require: true },
	role: { type: String, require: true },
	createdAt: { type: Date, default: Date.now() },
	updatedAt: { type: Date, default: null },
	isDeleted: { type: Boolean, require: true },
});

const User = mongoose.model('users', UserSchema);

export default User;
