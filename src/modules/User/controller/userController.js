import {
	createProfessorService,
	createUserService,
	deleteUserService,
	getAllUsersService,
	getUserByIdService,
	updateUserService,
} from '../service/userService.js';

export const createUserController = async (req, res) => {
	const { status, data } = await createUserService(req, res);

	return res.status(status).send(data);
};

export const createProfessorController = async (req, res) => {
	const { status, data } = await createProfessorService(req);

	return res.status(status).send(data);
};

export const getAllUsersController = async (_req, res) => {
	const users = await getAllUsersService();

	return res.status(users.status).send({ usersList: users.data });
};

export const getUserByIdController = async (req, res) => {
	const { status, data } = await getUserByIdService(req);

	return res.status(status).send(data);
};

export const updateUserController = async (req, res) => {
	const service = await updateUserService(req);

	return res.status(service.status).send(service.data);
};

export const deleteUserController = async (req, res) => {
	const service = await deleteUserService(req);

	return res.status(service.status).send(service.data);
};
