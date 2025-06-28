import Subject from '../model/SubjectSchema.js';

export const createSubjectService = async (req, res) => {
	try {
		const subjectData = req.body;

		const newSubject = new Subject({
			...subjectData,
			professor: null,
		});

		return {
			status: 200,
			message: 'Disciplina criada com sucesso!',
			subject: newSubject,
		};
	} catch (error) {
		res.status(500).send({
			message: 'Erro ao criar disciplina',
			error: error.message,
		});
	}
};
