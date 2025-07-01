import Subject from '../modules/Disciplines/model/SubjectSchema.js';
import User from '../modules/User/model/UserSchema.js';

export const insertStudentValidate = async (subjectId, reqBody) => {
	const subjectExists = await Subject.findById(subjectId);
	const studentsArrayExists = await User.find({ role: 'aluno' });

	const { students } = reqBody;

	const [name] = students;

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

	return { status: 200, data: studentExists };
};
