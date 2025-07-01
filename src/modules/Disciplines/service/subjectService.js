import User from '../../User/model/UserSchema.js';
import Subject from '../model/SubjectSchema.js';

export const createSubjectService = async req => {
	try {
		const subjectData = req.body;

		const newSubject = new Subject({
			...subjectData,
			professor: null,
		});

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

export const updateSubjectService = async req => {
	try {
		const { subjectId } = req.params;
		const { professor, ...subjectData } = req.body;

		const subjectExists = await Subject.findById(subjectId);

		if (!subjectExists) {
			return {
				status: 404,
				data: { message: 'Disciplina não cadastrada!' },
			};
		}

		const professorExists = await User.findOne({ name: professor });

		if (!professorExists) {
			return {
				status: 200,
				data: { message: `Professor "${professor}", não cadastrado` },
			};
		}

		const updatedSubject = await Subject.findByIdAndUpdate(
			subjectId,
			{
				...subjectData,
				professor: professorExists._id,
				updatedAt: Date.now(),
			},
			{ new: true, runValidators: true },
		);

		return { status: 200, data: updatedSubject };
	} catch (error) {
		return { status: 500, data: error.message };
	}
};

export const deleteSubjectService = async req => {
	try {
		const { subjectId } = req.params;

		await Subject.findByIdAndUpdate(subjectId, {
			isDeleted: true,
			updatedAt: Date.now(),
		});

		return { status: 200, data: { message: 'Subject deleted' } };
	} catch (error) {
		return { status: 500, data: error.message };
	}
};

export const insertStudentToSubjectService = async req => {
	try {
		const { subjectId } = req.params;
		const { students } = req.body;
		const [name] = students;

		const subjectExists = await Subject.findById(subjectId);
		const studentsArrayExists = await User.find({ role: 'aluno' });

		if (studentsArrayExists.length >= 40) {
			return {
				status: 400,
				data: {
					message:
						'A disciplina atingiu o limite permitido de 40 alunos.',
				},
			};
		}

		const studentExists = await User.findOne({ name: students });

		console.log('students ===> ', students);

		if (!studentExists) {
			return {
				status: 400,
				data: {
					message: `Não temos estudante com o nome "${name}", no nosso registro`,
				},
			};
		}

		const studentExistsInSubject = subjectExists.students.some(student =>
			student.equals(studentExists._id),
		);

		if (studentExistsInSubject) {
			return {
				status: 400,
				data: {
					message: `estudante "${name}" já cadastrado na disciplina`,
				},
			};
		}

		const updateSubject = await Subject.findByIdAndUpdate(
			subjectId,
			{
				$push: { students: studentExists._id },
				updatedAt: Date.now(),
			},
			{ new: true, runValidators: true },
		).populate('students');

		return { status: 200, data: updateSubject };
	} catch (error) {
		return { status: 500, data: error.essage };
	}
};
