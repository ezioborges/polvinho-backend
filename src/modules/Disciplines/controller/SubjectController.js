import { getAllErrors } from '../../../errors/getAllErros.js';
import Subject from '../model/SubjectSchema.js';
import {
	createSubjectService,
	getAllSubjectsService,
	getSubjectByIdService,
	updateSubjectService,
} from '../service/subjectService.js';

export const createSubjectController = async (req, res) => {
	const { status, message } = await createSubjectService(req, res);

	return res.status(status).send({ message });
};

export const getAllSubjectsController = async (_req, res) => {
	const subjects = await getAllSubjectsService();

	return res.status(subjects.status).send(subjects.data);
};

export const getSubjectByIdController = async (req, res) => {
	const { status, data } = await getSubjectByIdService(req);

	res.status(status).send(data);
};

export const updateSubjectController = async (req, res) => {
	const { status, data } = await updateSubjectService(req);

	return res.status(status).send(data);
};

export const deleteSubject = async (req, res) => {
	try {
		const { subjectId } = req.params;

		const disciplines = req.body;

		await Subject.findById(subjectId).updateOne({
			...disciplines,
			isDeleted: true,
			updatedAt: Date.now(),
		});

		return res
			.status(200)
			.send({ message: 'Disciplina deletada com sucesso!' });
	} catch (error) {
		getAllErrors(res, 404, 'Erro ao deletar disciplina', error.message);
	}
};
