import Subject from '../../Disciplines/model/SubjectSchema.js';
import User from '../model/UserSchema.js';

export const createProfessorService = async req => {
	const reqBody = req.body;

	const subjectExists = await Subject.findOne({ name: reqBody.subject });

	if (!subjectExists) {
		return {
			status: 400,
			data: { message: 'Disciplina não consta no cadastro!' },
		};
	}
	const newProfessor = new User({
		...reqBody,
		subject: subjectExists ? subjectExists._id : [],
	});

	if (subjectExists) {
		await Subject.findByIdAndUpdate(
			subjectExists._id,
			{
				professor: newProfessor._id,
				updatedAt: Date.now(),
			},
			{ new: true, runValidators: true },
		);
	}

	try {
		await newProfessor.save();
		return {
			status: 201,
			data: { message: 'Professor criado com sucesso!' },
		};
	} catch (error) {
		return { status: 500, data: { message: error.message } };
	}
};

export const getAllProfessorsService = async () => {
	try {
		const professors = await User.find({ role: 'professor' });

		return { status: 200, data: professors };
	} catch (error) {
		return { status: 500, data: { message: error.message } };
	}
};

export const getProfessorByIdService = async req => {
	const { professorId } = req.params;
	try {
		const professorData = await User.findById(professorId);

		return { status: 200, data: professorData };
	} catch (error) {
		return { status: 500, data: { message: error.message } };
	}
};

export const updateProfessorService = async req => {
	const { professorId } = req.params;
	const { subject, ...reqBody } = req.body;

	const professorExist = await User.findById(professorId);

	if (!professorExist) {
		return { status: 404, data: { message: 'Professor não encontrado!' } };
	}

	const subjectExists = await Subject.findOne({ name: subject });

	try {
		await User.findByIdAndUpdate(
			subjectExists.professor,
			{
				subject: [],
				updatedAt: Date.now(),
			},
			{ new: true, runValidators: true },
		);

		await User.findByIdAndUpdate(
			professorExist._id,
			{
				...reqBody,
				subject: subjectExists._id,
				updatedAt: Date.now(),
			},
			{ new: true, runValidators: true },
		);

		await Subject.findByIdAndUpdate(
			subjectExists._id,
			{
				professor: professorExist._id,
				updatedAt: Date.now(),
			},
			{ new: true, runValidators: true },
		);

		return {
			status: 200,
			data: { message: 'Professor Atualizado com sucesso' },
		};
	} catch (error) {
		return { status: 500, data: { message: error.message } };
	}
};

export const deleteProfessorService = async req => {
	const { professorId } = req.params;

	const professorExists = await User.findById(professorId);
	const subjectId = professorExists.subject;

	const subjectExists = await Subject.findById(subjectId);

	try {
		if (
			professorExists.subject.length > 0 &&
			professorExists._id.toString() ===
				subjectExists.professor.toString()
		) {
			await Subject.findByIdAndUpdate(
				subjectExists._id,
				{
					updatedAt: Date.now(),
					professor: null,
				},
				{ new: true, runValidators: true },
			);
		}

		await User.findByIdAndUpdate(
			professorExists._id,
			{
				isDeleted: true,
				subject: [],
				updatedAt: Date.now(),
			},
			{ new: true, runValidators: true },
		);
		return {
			status: 200,
			data: { message: 'Professor deletado com sucesso!' },
		};
	} catch (error) {
		return { status: 500, data: { message: error.message } };
	}
};

export const createUserService = async req => {
	try {
		const { subject, ...userData } = req.body;

		const subjectExists = await Subject.findOne({ name: subject });

		const userExists = await User.findOne({
			$or: [
				{ email: userData.email },
				{ registration: userData.registration },
			],
		});

		if (userExists) {
			let message = '';
			if (userExists.email === userData.email) {
				message = 'Já existe um usuário com este e-mail cadastrado.';
			} else {
				message = 'Já existe um usuário com esta matrícula cadastrada.';
			}
			return { status: 400, message };
		}

		const newProfessor = new User({
			...userData,
			subject: subjectExists ? subjectExists._id : [],
		});

		await newProfessor.save();

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
