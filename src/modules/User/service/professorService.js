import Subject from '../../Disciplines/model/SubjectSchema.js';
import User from '../model/UserSchema.js';

export const CreateProfessorService = async (req, res) => {
	try {
		const { subject, ...userData } = req.body;

		console.log('subject service ===> ', subject);

		if (!subject || subject.length === 0) {
			throw new Error(
				'Por favor associe o professor a uma matéria existente',
			);
		}

		const subjectExists = await Subject.findOne({ name: subject });

		if (!subjectExists) {
			throw new Error(
				`Disciplina "${subject}" não cadastrada, ou nome incorreto!`,
			);
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
			res.status(400).send({ message });
		}

		const newProfessor = new User({
			...userData,
			role: 'professor',
			subject: subjectExists._id,
		});

		await newProfessor.save();

		return res
			.status(201)
			.send({ message: 'Professor cadastrado com sucesso!' });
	} catch (error) {
		console.error('Erro no CreateProfessorService:', error);
		throw new Error(
			error.message ||
				`Erro inesperado no serviço de criação de professor.`,
		);
	}
};
