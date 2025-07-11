import express from 'express';
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
router.post('/', async (req, res) => await createStudentController(req, res));

router.get('/', async (req, res) => await getAllStudentsController(req, res));

router.get(
	'/:studentId',
	async (req, res) => await getStudentByIdController(req, res),
);

router.put(
	'/:studentId',
	async (req, res) => await updateStudentController(req, res),
);

router.delete(
	'/:studentId',
	async (req, res) => await deleteStudentController(req, res),
);

export default router;
