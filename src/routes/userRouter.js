import express from 'express';
import '../modules/User/model/UserSchema.js';

import { adminValidateJWT } from '../auth/validateJWT.js';
import {
	createUser,
	deleteUser,
	getAllUsers,
	getUserById,
	getUserSubjects,
	updateUser,
} from '../modules/User/controller/userController.js';

const router = express.Router();

router.post(
	'/',
	async (req, res) => await createUser(req, res),
);

router.get(
	'/',
	adminValidateJWT,
	async (req, res) => await getAllUsers(req, res),
);

router.get(
	'/:id',
	adminValidateJWT,
	async (req, res) => await getUserById(req, res),
);

router.get(
	'/:userId/subjects',
	adminValidateJWT,
	async (req, res) => await getUserSubjects(req, res),
);

router.put(
	'/:id',
	adminValidateJWT,
	async (req, res) => await updateUser(req, res),
);

router.delete(
	'/:id',
	adminValidateJWT,
	async (req, res) => await deleteUser(req, res),
);

export default router;
