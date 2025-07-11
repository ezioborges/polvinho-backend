import Subject from '../../Disciplines/model/SubjectSchema.js';
import User from '../model/UserSchema.js';

// CRUD ADMIN - PROFESSOR
export const createProfessorService = async req => {
	try {
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

		if (!professorData) {
			return {
				status: 404,
				data: { message: 'Professor não encontrado' },
			};
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

		if (!professorExist) {
			// status 404 - not found
			return {
				status: 404,
				data: { message: 'Professor não encontrado!' },
			};
		}

		const subjectExists = await Subject.findOne({ name: subject });

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
	try {
		const { professorId } = req.params;

		const professorExists = await User.findById(professorId);
		const subjectId = professorExists.subject;

		const subjectExists = await Subject.findById(subjectId);

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

// CRUD ADMIN - STUDENT
export const createStudentService = async req => {
	try {
		const { subject, ...studentData } = req.body;
		const subjectExists = await Subject.findOne({ name: subject });

		if (!subjectExists) {
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
			subject: subjectExists._id,
		});

		await newStudent.save();

		await Subject.findByIdAndUpdate(
			subjectExists._id,
			{
				$push: { students: newStudent._id },
				updatedAt: Date.now(),
			},
			{ new: true, runValidators: true },
		);
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

		const subjectExists = await Subject.findOne({ name: subject });

		if (!subjectExists) {
			return {
				status: 404,
				data: { message: 'Disciplina não encontrada' },
			};
		}

		await User.findByIdAndUpdate(
			studentExists._id,
			{
				...studentData,
				$addToSet: { subject: subjectExists._id },
				updatedAt: Date.now(),
			},
			{ new: true, runValidators: true },
		);

		await Subject.findByIdAndUpdate(
			subjectExists._id,
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

		const allSubjects = await Subject.find();

		console.log('🚀 ~ subjecstStudents:', allSubjects);

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
