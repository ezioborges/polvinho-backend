import express from 'express';
import mongoose from 'mongoose';
import '../modules/User/model/UserSchema.js';

const User = mongoose.model('users');

const router = express.Router();

router.post('/', (req, res) => {
	const newUser = {
		name: req.body.name,
		email: req.body.email,
		registration: req.body.registration,
		passwordHash: req.body.passwordHash,
		role: req.body.role,
		createdAt: req.body.createdAt,
		updatedAt: null,
		isDeleted: req.body.isDeleted,
	};

	new User(newUser)
		.save()
		.then(() => {
			console.log('Usuário cadastrado com sucesso!');
		})
		.catch(err => {
			console.log(`Erro ao cadastrar Usuário: ${err}`);
		});

	return res.status(201).send();
});

router.get('/', async (req, res) => {
	const users = await User.find();

	res.status(200).send({ users });
});

router.get('/:id', async (req, res) => {
	const { id } = req.params;
	const user = await User.findById(id).exec();

	return res.status(200).send(user);
});

router.put('/:id', async (req, res) => {
	const { id } = req.params;

	const { name, email, registration, passwordHash, role } = req.body;

	const newDataUser = {
		name,
		email,
		registration,
		passwordHash,
		role,
		updatedAt: Date.now(),
	};

	await User.findById(id).updateOne(newDataUser);

	return res.status(200).send({ message: 'Usuário atualizado com sucesso!' });
});

router.delete('/:id', async (req, res) => {
	const { id } = req.params

	await User.deleteOne({ _id: id })

	return res.status(200).send({ message: 'Usuário deletado com sucesso!' })
})

export default router;
