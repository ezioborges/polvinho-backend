import express from 'express';
import '../modules/User/model/UserSchema.js';

import { validateJWT } from '../auth/validateJWT.js';
import {
	createUser,
	deleteUser,
	getAllUsers,
	getUserById,
	updateUser,
} from '../modules/User/controller/userController.js';

const router = express.Router();

router.post('/', validateJWT, async (req, res) => await createUser(req, res));

router.get('/', validateJWT, async (req, res) => await getAllUsers(req, res));

router.get(
	'/:id',
	validateJWT,
	async (req, res) => await getUserById(req, res),
);

router.put('/:id', validateJWT, async (req, res) => await updateUser(req, res));

router.delete(
	'/:id',
	validateJWT,
	async (req, res) => await deleteUser(req, res),
);

export default router;
