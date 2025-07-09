import {
	createProfessorService,
	createStudentService,
	deleteProfessorService,
	getAllProfessorsService,
	getProfessorByIdService,
	updateProfessorService,
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
