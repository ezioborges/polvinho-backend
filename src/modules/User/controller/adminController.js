import {
	createProfessorService,
	createStudentService,
	deleteProfessorService,
	deleteStudentService,
	getAllProfessorsService,
	getAllStudentsService,
	getProfessorByIdService,
	getStudentByIdService,
	updateProfessorService,
	updateStudentService,
} from '../service/adminService.js';

// CRUD ADMIN - PROFESSOR
export const createProfessorController = async (req, res) => {
	const { status, data } = await createProfessorService(req);

	return res.status(status).send(data);
};

export const getAllProfessorsController = async (req, res) => {
	const { status, data } = await getAllProfessorsService(req);

	return res.status(status).send(data);
};

export const getProfessorByIdController = async (req, res) => {
	const { status, data } = await getProfessorByIdService(req);

	return res.status(status).send(data);
};

export const updateProfessorController = async (req, res) => {
	const { status, data } = await updateProfessorService(req);

	return res.status(status).send(data);
};

export const deleteProfessorController = async (req, res) => {
	const { status, data } = await deleteProfessorService(req);

	return res.status(status).send(data);
};

// CRUD ADMIN - STUDENT
export const createStudentController = async (req, res) => {
	const { status, data } = await createStudentService(req);

	return res.status(status).send(data);
};

export const getAllStudentsController = async (req, res) => {
	const { status, data } = await getAllStudentsService(req);

	return res.status(status).send(data);
};

export const getStudentByIdController = async (req, res) => {
	const { status, data } = await getStudentByIdService(req);

	return res.status(status).send(data);
};

export const updateStudentController = async (req, res) => {
	const { status, data } = await updateStudentService(req);

	return res.status(status).send(data);
};

export const deleteStudentController = async (req, res) => {
	const { status, data } = await deleteStudentService(req);

	return res.status(status).send(data);
};
