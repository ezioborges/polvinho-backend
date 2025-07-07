import Subject from '../../Disciplines/model/SubjectSchema.js';
import User from '../model/UserSchema.js';

export const createUserService = async req => {
	try {
		const userData = req.body;

		const newUSer = new User({
			...userData,
		});

		await newUSer.save();

		return {
			status: 201,
			data: { message: 'Usuário cadastrado com sucesso!' },
		};
	} catch (error) {
		return { status: 500, data: { message: error.message } };
	}
};

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

export const getUserByIdService = async req => {
	try {
		const { id } = req.params;
		const userData = await User.findById(id);

		if (!userData) {
			return { status: 404, data: { message: 'Pessoa não encontrada' } };
		}

		return { status: 200, data: userData };
	} catch (error) {
		return { status: 404, message: error.message };
	}
};

export const updateUserService = async req => {
	try {
		const { id } = req.params;
		const { subject, ...userData } = req.body;

		const userExists = await User.findById(id);

		if (!userExists) {
			return {
				status: 404,
				data: { message: 'Pessoa com cadastro inexistente' },
			};
		}

		const subjectExists = await Subject.findOne({ name: subject });

		await User.findByIdAndUpdate(
			userExists._id,
			{
				...userData,
				subject: subjectExists ? subjectExists._id : [],
				updatedAt: Date.now(),
			},
			{ new: true, runValidators: true },
		);

		return {
			status: 200,
			data: { message: 'Pessoa atualizada com sucesso!' },
		};
	} catch (error) {
		return {
			status: 500,
			data: { message: `Dados estão duplicados: ${error.message}` },
		};
	}
};

export const deleteUserService = async req => {
	try {
		const { id } = req.params;

		await User.findByIdAndUpdate(
			id,
			{
				isDeleted: true,
				updatedAt: Date.now(),
			},
			{ new: true },
		);

		return {
			status: 200,
			data: { message: 'Pessoa excluida com sucesso!' },
		};
	} catch (error) {
		return { status: 404, data: { message: error.message } };
	}
};
