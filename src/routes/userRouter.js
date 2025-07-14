import express from 'express';
import { adminValidateJWT } from '../auth/validateJWT.js';
import { getAllUsersController } from '../modules/User/controller/adminController.js';
import '../modules/User/model/UserSchema.js';

const router = express.Router();

router.get(
	'/',
	adminValidateJWT,
	async (req, res) => await getAllUsersController(req, res),
);

export default router;
