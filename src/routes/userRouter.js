import express from 'express';
import '../modules/User/model/UserSchema.js';

import { adminVvalidateJWT } from '../auth/validateJWT.js';
import {
	createUser,
	deleteUser,
	getAllUsers,
	getUserById,
	updateUser,
} from '../modules/User/controller/userController.js';

const router = express.Router();

router.post(
	'/',
	adminVvalidateJWT,
	async (req, res) => await createUser(req, res),
);

router.get(
	'/',
	adminVvalidateJWT,
	async (req, res) => await getAllUsers(req, res),
);

router.get(
	'/:id',
	adminVvalidateJWT,
	async (req, res) => await getUserById(req, res),
);

router.put(
	'/:id',
	adminVvalidateJWT,
	async (req, res) => await updateUser(req, res),
);

router.delete(
	'/:id',
	adminVvalidateJWT,
	async (req, res) => await deleteUser(req, res),
);

export default router;
