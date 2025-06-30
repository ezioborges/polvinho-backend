import { getAllErrors } from '../../../errors/getAllErros.js';
import User from '../model/UserSchema.js';
import {
	createUserService,
	getAllUsersService,
	getUserByIdService,
	updateUserService,
} from '../service/userService.js';

export const createUserController = async (req, res) => {
	const user = await createUserService(req, res);

	return res.status(user.status).send({ message: user.message });
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

export const deleteUser = async (req, res) => {
	try {
		const { id } = req.params;
		const user = req.body;

		await User.findById(id).updateOne({
			...user,
			isDeleted: true,
			updatedAt: Date.now(),
		});

		return res
			.status(200)
			.send({ message: 'Usuário deletado com sucesso!' });
	} catch (error) {
		getAllErrors(res, 404, 'Erro ao deletar usuário', error.message);
	}
};

export const getUserSubjects = async (req, res) => {
	try {
		const { userId } = req.params;
		const user = await User.findById(userId);

		return res.status(200).send({ userSubjects: user });
	} catch (error) {
		getAllErrors(
			res,
			404,
			'Erro ao buscar disciplinas do usuário',
			error.message,
		);
	}
};
