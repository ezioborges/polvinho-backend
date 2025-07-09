import Subject from '../../Disciplines/model/SubjectSchema.js';
import User from '../model/UserSchema.js';

// CRUD ADMIN - PROFESSOR
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

// CRUD ADMIN - STUDENT
export const createStudentService = async req => {
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

	try {
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
	const { studentId } = req.params;

	const studentExists = await User.findById(studentId);
	try {
		return { status: 200, data: studentExists };
	} catch (error) {
		return { status: 500, data: { message: error.message } };
	}
};
