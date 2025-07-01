import Subject from '../../Disciplines/model/SubjectSchema.js';
import User from '../model/UserSchema.js';

export const createUserService = async req => {
	try {
		const { subject, ...userData } = req.body;

		const subjectExists = await Subject.findOne({ name: subject });

		const existingUser = await User.findOne({
			$or: [
				{ email: userData.email },
				{ registration: userData.registration },
			],
		});

		if (existingUser) {
			let message = '';
			if (existingUser.email === userData.email) {
				message = 'Já existe um usuário com este e-mail cadastrado.';
			} else {
				message = 'Já existe um usuário com esta matrícula cadastrada.';
			}
			return { status: 400, message };
		}

		const newProfessor = new User({
			...userData,
			subject: subjectExists ? subjectExists._id : null,
		});

		await newProfessor.save();

		return { status: 201, message: 'Usuário cadastrado com sucesso!' };
	} catch (error) {
		console.error('Erro no createUserService:', error);
		throw new Error(
			error.message ||
				`Erro inesperado no serviço de criação de professor.`,
		);
	}
};

export const getAllUsersService = async () => {
	try {
		const users = await User.find();

		if (!users || users.length === 0) {
			return { status: 400, message: 'Nenhum usuário encontrado.' };
		}

		return { status: 200, data: users };
	} catch (error) {
		return { status: 404, message: error.message };
	}
};

export const getUserByIdService = async req => {
	try {
		const { id } = req.params;
		const userById = await User.findById(id);

		return { status: 200, data: userById };
	} catch (error) {
		return { status: 404, message: error.message };
	}
};

export const updateUserService = async req => {
	try {
		const { id } = req.params;
		const { subject, ...userData } = req.body;

		const updateData = { ...userData, updatedAt: Date.now() };

		const subjectExists = await Subject.findOne({ name: subject });

		if (!subjectExists) {
			const [name] = subject;
			return {
				status: 400,
				data: {
					message: `Disciplina "${name}", não cadastrada `,
				},
			};
		}

		updateData.subject = subjectExists._id;

		await Subject.findByIdAndUpdate(
			subjectExists.id,
			{
				professor: id,
				updatedAt: Date.now(),
			},
			{ new: true },
		);

		const userUpdated = await User.findByIdAndUpdate(id, updateData, {
			new: true,
			runValidators: true,
		}).populate('subject');

		return { status: 200, data: userUpdated };
	} catch (error) {
		return { status: 500, message: error.message };
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

		return { status: 200, data: { message: 'User deleted' } };
	} catch (error) {
		return { status: 404, data: { message: error.message } };
	}
};
