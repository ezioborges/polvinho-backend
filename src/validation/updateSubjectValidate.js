import Subject from '../modules/Disciplines/model/SubjectSchema.js';
import User from '../modules/User/model/UserSchema.js';

export const updateSubjectValidate = async (
	subjectId,
	name,
	professorId,
	students,
) => {
	const subjectExists = await Subject.findById(subjectId);
	if (subjectExists.name !== name) {
		const subjectNameUpdated = await Subject.findByIdAndUpdate(
			subjectExists._id,
			{
				name: name,
				updatedAt: Date.now(),
			},
			{ new: true, runValidators: true },
		);
		return { status: 200, data: { subjectNameUpdated } };
	}

	if (!subjectExists.professor.equals(professorId)) {
		const subjectProfessorUpdate = await Subject.findByIdAndUpdate(
			subjectExists._id,
			{
				professor: professorId,
				updatedAt: Date.now(),
			},
			{ new: true, runValidators: true },
		);

		await User.findByIdAndUpdate(
			subjectExists.professor,
			{
				subject: [],
				updatedAt: Date.now(),
			},
			{ new: true, runValidators: true },
		);

		await User.findByIdAndUpdate(
			professorId,
			{ subject: subjectId, updatedAt: Date.now() },
			{ new: true, runValidators: true },
		);

		return { status: 200, data: { subjectProfessorUpdate } };
	}

	if (students && students.length > 0) {
		const studentExists = await User.findOne({ _id: students });
		const studentsArrayExists = await User.find({ role: 'aluno' });
		const subjectExists = await Subject.findById(subjectId);

		if (studentsArrayExists.length >= 40) {
			return {
				status: 400,
				data: {
					message:
						'A disciplina atingiu o limite permitido de 40 alunos.',
				},
			};
		}

		if (!studentExists) {
			return { status: 400, data: { message: `Estudante sem cadastro` } };
		}

		const studentExistsInSubject = subjectExists.students.some(student =>
			student.equals(studentExists._id),
		);

		if (studentExistsInSubject) {
			return {
				status: 400,
				data: {
					message: `estudante já com cadastro na disciplina`,
				},
			};
		}

		const updateStudentSubjectArray = await Subject.findByIdAndUpdate(
			subjectId,
			{
				$push: { students: studentExists._id },
				updatedAt: Date.now(),
			},
			{ new: true, runValidators: true },
		).populate('students');

		await User.findByIdAndUpdate(
			studentExists._id,
			{ subject: subjectId, updatedAt: Date.now() },
			{ new: true, runValidators: true },
		);

		return { status: 200, data: { updateStudentSubjectArray } };
	}

	return { status: 200, data: { subjectExists } };
};
