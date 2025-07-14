import User from '../model/UserSchema.js';

export const getAllUsersService = async () => {
	try {
		const users = await User.find();

		if (!users || users.length === 0) {
			return { status: 404, data: [] };
		}

		return { status: 200, data: users };
	} catch (error) {
		return { status: 404, message: error.message };
	}
};
