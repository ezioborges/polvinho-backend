import express from 'express';
import { validateJWT } from '../auth/validateJWT.js';
import { getAllUsersController } from '../modules/User/controller/adminController.js';
import '../modules/User/model/UserSchema.js';

const router = express.Router();

router.get(
	'/',
	validateJWT(['admin']),
	async (req, res) => await getAllUsersController(req, res),
);

export default router;
