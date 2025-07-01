import {
	createSubjectService,
	deleteSubjectService,
	getAllSubjectsService,
	getSubjectByIdService,
	insertProfessorInSubjectService,
	insertStudentToSubjectService,
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

export const insertProfessorInSubjectController = async (req, res) => {
	const { status, data } = await insertProfessorInSubjectService(req);

	return res.status(status).send(data);
};

export const deleteSubjectController = async (req, res) => {
	const { status, data } = await deleteSubjectService(req);

	return res.status(status).send(data);
};

export const insertStudentToSubjectController = async (req, res) => {
	const { status, data } = await insertStudentToSubjectService(req);

	return res.status(status).send(data);
};
