import express from 'express';
import mongoose from 'mongoose';
import '../modules/User/model/UserSchema.js';

import {
	createUser,
	deleteUser,
	getAllUsers,
	getUserById,
	updateUser,
} from '../modules/User/controller/userController.js';

const User = mongoose.model('users');

const router = express.Router();

router.post('/', async (req, res) => await createUser(req, res));

router.get('/', async (req, res) => await getAllUsers(req, res));

router.get('/:id', async (req, res) => await getUserById(req, res));

router.put('/:id', async (req, res) => await updateUser(req, res));

router.delete('/:id', async (req, res) => await deleteUser(req, res));

export default router;
