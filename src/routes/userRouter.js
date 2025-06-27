import express from 'express';
import '../modules/User/model/UserSchema.js';

import { adminValidateJWT } from '../auth/validateJWT.js';
import { createProfessorController } from '../modules/User/controller/professorController.js';
import {
	createUser,
	deleteUser,
	getAllUsers,
	getUserById,
	getUserSubjects,
	updateUser,
} from '../modules/User/controller/userController.js';
import { createProfessorValidate } from '../validation/createUserValidate.js';

const router = express.Router();

router.post('/', async (req, res) => await createUser(req, res));

router.post(
	'/professor',
	adminValidateJWT,
	createProfessorValidate,
	async (req, res) => createProfessorController(req, res),
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
