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

export const createUserService = async (req, res) => {
	try {
		const reqBody = req.body;
		const newUser = new User(reqBody);
		await newUser.save();
		return res.status(201).send(newUser);
	} catch (error) {
		return res.status(500).send({ message: error.message });
	}
};
