import express from 'express';
import { validateJWT } from '../auth/validateJWT.js';
import { getAllUsersController } from '../modules/User/controller/adminController.js';
import '../modules/User/model/UserSchema.js';
import { createUserService } from '../modules/User/service/userService.js';

const router = express.Router();

router.get(
	'/',
	validateJWT(['admin']),
	async (req, res) => await getAllUsersController(req, res),
);

router.post('/', async (req, res) => await createUserService(req, res));

export default router;
