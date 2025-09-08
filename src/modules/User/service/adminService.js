import { subjectExistsValidator } from '../../../validators/subjectValidation.js';
import {
	userExisitsValidator,
	UsersArrayValidator,
} from '../../../validators/usersValidator.js';
import Subject from '../../Disciplines/model/SubjectSchema.js';
import User from '../model/UserSchema.js';

export const getAllUsersService = async () => {
	try {
		const users = await User.find();

		return { status: 200, data: users };
	} catch (error) {
		return { status: 500, data: { message: error.message } };
	}
};

// CRUD ADMIN - PROFESSOR
export const createProfessorService = async req => {
	try {
		const reqBody = req.body;

		const subjectData = await Subject.findOne({ name: reqBody.subject });

		// verifica se a disciplina existe
		// o professor só pode ser cadastrada a uma disciplina existente
		if (!subjectData) {
			return {
				status: 404,
				data: { message: 'Disciplina não consta no cadastro!' },
			};
		}

		const newProfessor = new User({
			...reqBody,
			subject: subjectData ? subjectData._id : [],
			passwordHash: 'User123@',
		});

		// caso a disciplina exista, atualiza o campo de professor com o id.
		if (subjectData) {
			await Subject.findByIdAndUpdate(
				subjectData._id,
				{
					professor: newProfessor._id,
					updatedAt: Date.now(),
				},
				{ new: true, runValidators: true },
			);
		}

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

		//verifica se o array de professores não está vazio
		const validation = UsersArrayValidator(professors, 'professor');
		if (validation) {
			return validation;
		}

		return { status: 200, data: professors };
	} catch (error) {
		return { status: 500, data: { message: error.message } };
	}
};

export const getProfessorByIdService = async req => {
	const { professorId } = req.params;
	try {
		const professorData = await User.findById(professorId);

		const validation = userExisitsValidator(professorData, 'professor');
		if (validation) {
			return validation;
		}

		return { status: 200, data: professorData };
	} catch (error) {
		return { status: 500, data: { message: error.message } };
	}
};

export const updateProfessorService = async req => {
	try {
		const { professorId } = req.params;
		const { subject, ...reqBody } = req.body;

		const professorExist = await User.findById(professorId);

		const validatProfessor = userExisitsValidator(
			professorExist,
			'professor',
		);
		if (validatProfessor) {
			return validatProfessor;
		}

		const subjectData = await Subject.findOne({ name: subject });

		const validatSubject = subjectExistsValidator(subjectData);

		if (validatSubject) {
			return validatSubject;
		}

		// remove a disciplina do professor anterior
		// aqui usei $pull por que ele retira apenas o id da disciplina anterior
		await User.findByIdAndUpdate(
			subjectData.professor,
			{
				$pull: { subject: subjectData._id },
				updatedAt: Date.now(),
			},
			{ new: true, runValidators: true },
		);

		// atualiza o professor atual
		// Aqui usei o $addToSet, por que ele não adiciona ids duplicados
		await User.findByIdAndUpdate(
			professorExist._id,
			{
				...reqBody,
				$addToSet: { subject: subjectData._id },
				updatedAt: Date.now(),
			},
			{ new: true, runValidators: true },
		);

		//atualiza a disciplina para receber o id do professor
		await Subject.findByIdAndUpdate(
			subjectData._id,
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
	try {
		const { professorId } = req.params;

		const professorExists = await User.findById(professorId);
		const subjectId = professorExists.subject;

		const subjectData = await Subject.findById(subjectId);

		if (
			professorExists.subject.length > 0 &&
			professorExists._id.toString() === subjectData.professor.toString()
		) {
			await Subject.findByIdAndUpdate(
				subjectData._id,
				{
					updatedAt: Date.now(),
					professor: null,
				},
				{ new: true, runValidators: true },
			);
		}

		//TODO: QUANDO O PROFESSOR FOR DELETADO TAMBÉM DELETAR OS IDS DE QUIZZES, TORNANDO UM ARRAY VAZIO.
		await User.findByIdAndUpdate(
			professorExists._id,
			{
				isDeleted: true,
				subject: [],
				quizzes: [],
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

// CRUD ADMIN - STUDENT
export const createStudentService = async req => {
	try {
		const { subject, ...studentData } = req.body;
		const subjectData = await Subject.findOne({ name: subject });

		if (!subjectData) {
			return {
				status: 400,
				data: {
					message:
						'Estudantes devem ser cadastrados em disciplinas existentes!',
				},
			};
		}

		const newStudent = new User({
			...studentData,
			subject: subjectData ? subjectData._id : [],
			passwordHash: 'User123@',
		});

		await Subject.findByIdAndUpdate(
			subjectData._id,
			{
				$push: { students: newStudent._id },
				updatedAt: Date.now(),
			},
			{ new: true, runValidators: true },
		);
		await newStudent.save();
		return {
			status: 201,
			data: { message: 'Estudante criado com sucesso!' },
		};
	} catch (error) {
		return { status: 500, data: { message: error.message } };
	}
};

export const getAllStudentsService = async () => {
	try {
		const students = await User.find({ role: 'aluno' });

		return { status: 200, data: students };
	} catch (error) {
		return { status: 500, data: { message: error.message } };
	}
};

export const getStudentByIdService = async req => {
	try {
		const { studentId } = req.params;

		const studentExists = await User.findById(studentId);
		return { status: 200, data: studentExists };
	} catch (error) {
		return { status: 500, data: { message: error.message } };
	}
};

export const updateStudentService = async req => {
	try {
		const { studentId } = req.params;
		const { subject, ...studentData } = req.body;

		const studentExists = await User.findById(studentId);

		if (!studentExists) {
			return {
				status: 404,
				data: { message: 'Estudante não encontrado' },
			};
		}

		const subjectData = await Subject.findOne({ name: subject });

		if (!subjectData) {
			return {
				status: 404,
				data: { message: 'Disciplina não encontrada' },
			};
		}

		// adiciona a disciplina no campo subjects
		await User.findByIdAndUpdate(
			studentExists._id,
			{
				...studentData,
				$addToSet: { subject: subjectData._id }, // semelhante ao $push, mas evita dados duplicados.
				updatedAt: Date.now(),
			},
			{ new: true, runValidators: true },
		);

		// adiciona o estudante no array das disciplinas
		await Subject.findByIdAndUpdate(
			subjectData._id,
			{
				$addToSet: { students: studentExists._id },
				updatedAt: Date.now(),
			},
			{ new: true, runValidators: true },
		);
		return {
			status: 200,
			data: { message: 'Estudante atualizado com sucesso' },
		};
	} catch (error) {
		return { status: 500, data: { message: error.message } };
	}
};

export const deleteStudentService = async req => {
	try {
		const { studentId } = req.params;

		const studentExists = await User.findById(studentId);

		if (!studentExists) {
			return {
				status: 404,
				data: { message: 'Não foipossivel encontrar estudante' },
			};
		}

		await Subject.updateMany(
			{ students: studentId },
			{
				$pull: { students: studentId },
				updatedAt: Date.now(),
			},
			{ new: true, runValidators: true },
		);

		await User.findByIdAndUpdate(
			studentExists._id,
			{
				isDeleted: true,
				subject: [],
				updatedAt: Date.now(),
			},
			{ new: true, runValidators: true },
		);
		return {
			status: 200,
			data: { message: 'Estudante deletado com sucesso' },
		};
	} catch (error) {
		return { status: 500, data: { message: error.message } };
	}
};

export const getSubjectsByStudentService = async req => {
	try {
		const { studentId } = req.params;

		const student = await User.findById(studentId).populate('subject');

		return {
			status: 200,
			data: student.subject,
		};
	} catch (error) {
		return {
			status: 500,
			data: {
				message: `Erro na busca de disciplinas do aluno: ${error.message}`,
			},
		};
	}
};
