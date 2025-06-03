import { getAllErrors } from '../../../errors/getAllErros.js';
import { compareIds, entityArrayExists } from '../../../validation/index.js';
import User from '../model/UserSchema.js';

export const createUser = async (req, res) => {
	try {
		const newUser = new User(req.body);
		await newUser.save();
		return res.status(201).send({ message: 'Usuário criado com sucesso!' });
	} catch (error) {
		return res
			.status(500)
			.send({ message: 'Erro ao criar usuário', error: error.message });
	}
};

export const getAllUsers = async (_req, res) => {
	try {
		const users = await User.find();

		entityArrayExists(users);

		return res.status(200).send({ users });
	} catch (error) {
		return res.status(404).send({
			message: 'Usuários não encontrados',
			error: error.message,
		});
	}
};

export const getUserById = async (req, res) => {
	try {
		const { id } = req.params;

		const user = await User.findById(id);
		const userId = user._id.toString();

		compareIds(id, userId);

		return res.status(200).send(user);
	} catch (error) {
		res.status(404).send({
			message: 'Usuário não encontrado',
			error: error.message,
		});
	}
};

export const updateUser = async (req, res) => {
	try {
		const { id } = req.params;
		const user = req.body;

		await User.findById(id).updateOne({ ...user, updatedAt: Date.now() });

		return res
			.status(200)
			.send({ message: 'Usuário atualizado com sucesso' });
	} catch (error) {
		return res.status(500).send({
			message: 'Erro ao atualizar cadastro',
			error: error.message,
		});
	}
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
