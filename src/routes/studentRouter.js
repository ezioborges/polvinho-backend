import express from 'express';
import { validateJWT } from '../auth/validateJWT.js';
import {
	createStudentController,
	deleteStudentController,
	getAllStudentsController,
	getStudentByIdController,
	getSubjectsByStudentController,
	updateStudentController,
} from '../modules/User/controller/adminController.js';
import '../modules/User/model/UserSchema.js';

const router = express.Router();

//STUDENT ROUTES
router.post(
	'/',
	validateJWT(['admin']),
	async (req, res) => await createStudentController(req, res),
);

router.get(
	'/',
	validateJWT(['admin', 'professor', 'aluno']),
	async (req, res) => await getAllStudentsController(req, res),
);

router.get(
	'/:studentId',
	validateJWT(['admin']),
	async (req, res) => await getStudentByIdController(req, res),
);

router.get(
	'/:studentId/subjects',
	async (req, res) => await getSubjectsByStudentController(req, res),
);

router.put(
	'/:studentId',
	validateJWT(['admin']),
	async (req, res) => await updateStudentController(req, res),
);

router.delete(
	'/:studentId',
	validateJWT(['admin']),
	async (req, res) => await deleteStudentController(req, res),
);

export default router;
