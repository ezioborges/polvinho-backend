import express from 'express';
import { adminValidateJWT } from '../auth/validateJWT.js';
import {
	createStudentController,
	deleteStudentController,
	getAllStudentsController,
	getStudentByIdController,
	updateStudentController,
} from '../modules/User/controller/adminController.js';
import '../modules/User/model/UserSchema.js';

const router = express.Router();

//STUDENT ROUTES
router.post(
	'/',
	adminValidateJWT,
	async (req, res) => await createStudentController(req, res),
);

router.get(
	'/',
	adminValidateJWT,
	async (req, res) => await getAllStudentsController(req, res),
);

router.get(
	'/:studentId',
	adminValidateJWT,
	async (req, res) => await getStudentByIdController(req, res),
);

router.put(
	'/:studentId',
	adminValidateJWT,
	async (req, res) => await updateStudentController(req, res),
);

router.delete(
	'/:studentId',
	adminValidateJWT,
	async (req, res) => await deleteStudentController(req, res),
);

export default router;
