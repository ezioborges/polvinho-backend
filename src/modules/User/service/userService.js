import Subject from '../../Disciplines/model/SubjectSchema.js';
import User from '../model/UserSchema.js';

export const createUserService = async req => {
	try {
		const { subject, ...userData } = req.body;

		if (!subject || subject.length === 0) {
			return {
				status: 400,
				message:
					'Por favor associe o professor a uma matéria existente',
			};
		}

		const subjectExists = await Subject.findOne({ name: subject });

		if (!subjectExists) {
			return { status: 400, message: 'Disciplina não informada' };
		}

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
			subject: subjectExists._id,
		});

		await newProfessor.save();

		return { status: 201, message: 'Professor cadastrado com sucesso!' };
	} catch (error) {
		console.error('Erro no createUserService:', error);
		throw new Error(
			error.message ||
				`Erro inesperado no serviço de criação de professor.`,
		);
	}
};
