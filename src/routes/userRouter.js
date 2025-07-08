import express from 'express';
import '../modules/User/model/UserSchema.js';

import {
	createProfessorController,
	createUserController,
	deleteUserController,
	getAllUsersController,
	getUserByIdController,
	updateUserController,
} from '../modules/User/controller/userController.js';
import { createUserValidate } from '../validation/createUserValidate.js';

const router = express.Router();

router.post('/', async (req, res) => createUserController(req, res));

router.post('/professor', createUserValidate, async (req, res) =>
	createProfessorController(req, res),
);

router.get(
	'/',
	// adminValidateJWT,
	async (req, res) => await getAllUsersController(req, res),
);

router.get(
	'/:id',
	// adminValidateJWT,
	async (req, res) => await getUserByIdController(req, res),
);

router.put(
	'/:id',
	// adminValidateJWT,
	async (req, res) => await updateUserController(req, res),
);

router.delete(
	'/:id',
	// adminValidateJWT,
	async (req, res) => await deleteUserController(req, res),
);

export default router;
