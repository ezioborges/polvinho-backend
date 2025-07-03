import User from '../../User/model/UserSchema.js';
import Subject from '../model/SubjectSchema.js';

export const createSubjectService = async req => {
	try {
		const subjectData = req.body;
		const professorExists = await User.findOne({
			name: subjectData.professor,
			role: 'professor',
		});

		const newSubject = new Subject({
			...subjectData,
			professor: professorExists ? professorExists._id : null,
		});

		if (professorExists) {
			await User.findByIdAndUpdate(
				professorExists._id,
				{
					subject: newSubject._id,
					updatedAt: Date.now(),
				},
				{ new: true, runValidators: true },
			);
		}

		await newSubject.save();

		return {
			status: 200,
			message: 'Disciplina criada com sucesso!',
		};
	} catch (error) {
		return { status: 500, data: { message: error.message } };
	}
};

export const getAllSubjectsService = async () => {
	try {
		const subject = await Subject.find();

		if (!subject || subject.length === 0) {
			return {
				status: 404,
				data: { message: 'Nenhuma disciplina encontrada' },
			};
		}

		return { status: 200, data: subject };
	} catch (error) {
		return { status: 500, mesdayasage: error.message };
	}
};

export const getSubjectByIdService = async req => {
	try {
		const { subjectId } = req.params;

		const subjectById = await Subject.findById(subjectId);

		return { status: 200, data: subjectById };
	} catch (error) {
		return { status: 500, data: error.message };
	}
};

export const updateSubjctService = async req => {
	const { subjectId } = req.params;
	const { name, professor, student } = req.body;

	const professorExists = await User.findOne({
		name: professor,
		role: 'professor',
	});

	if (!professorExists) {
		return { status: 404, data: { message: 'Professor não cadastrado' } };
	}

	const subjectExists = await Subject.findById(subjectId);
	const studentList = subjectExists.students;

	const studentExists = await User.findOne({ name: student, role: 'aluno' });

	if (studentList > 40) {
		return {
			status: 400,
			data: {
				message: 'Disciplina o limite de 40 estudantes cadastrados',
			},
		};
	}

	const studentExistsInSubject = studentList.some(student =>
		student.equals(studentExists._id),
	);

	if (studentExistsInSubject) {
		return {
			status: 400,
			data: { message: 'Estudante já possui cadastro na disciplina' },
		};
	}

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
			professorExists._id,
			{
				subject: subjectId,
				updatedAt: Date.now(),
			},
			{ new: true, runValidators: true },
		);

		await User.findByIdAndUpdate(
			studentExists._id,
			{
				subject: subjectId,
				updatedAt: Date.now(),
			},
			{ new: true, runValidators: true },
		);

		await Subject.findByIdAndUpdate(
			subjectId,
			{
				name: name,
				professor: professorExists._id,
				$push: { students: studentExists._id },
				updatedAt: Date.now(),
			},
			{ new: true, runValidators: true },
		);

		return {
			status: 200,
			data: { message: 'Disciplina atualizada com sucesso!' },
		};
	} catch (error) {
		return { status: 500, data: { message: error.message } };
	}
};

export const deleteSubjectService = async req => {
	try {
		const { subjectId } = req.params;

		await Subject.findByIdAndUpdate(subjectId, {
			isDeleted: true,
			updatedAt: Date.now(),
		});

		return {
			status: 200,
			data: { message: 'Disciplina deletada com sucesso' },
		};
	} catch (error) {
		return { status: 500, data: error.message };
	}
};
