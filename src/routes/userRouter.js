import express from 'express';
import '../modules/User/model/UserSchema.js';

import {
<<<<<<< HEAD
	createUserController,
	deleteUserController,
	getAllUsersController,
	getUserByIdController,
	updateUserController,
} from '../modules/User/controller/userController.js';

const router = express.Router();

router.post('/', async (req, res) => createUserController(req, res));
=======
	createProfessorController,
	createStudentController,
	deleteProfessorController,
	deleteStudentController,
	getAllProfessorsController,
	getAllStudentsController,
	getProfessorByIdController,
	getStudentByIdController,
	updateProfessorController,
	updateStudentController,
} from '../modules/User/controller/adminController.js';
import { createUserValidate } from '../validation/createUserValidate.js';

const router = express.Router();

//PROFESSOR ROUTES
router.post('/professors', createUserValidate, async (req, res) =>
	createProfessorController(req, res),
);
>>>>>>> ca69f562b8ffd8761eb5359d6ed3c1702281b944

router.get(
	'/professors',
	async (req, res) => await getAllProfessorsController(req, res),
);

router.get(
	'/professors/:professorId',
	async (req, res) => await getProfessorByIdController(req, res),
);

router.put(
	'/professors/:professorId',
	async (req, res) => await updateProfessorController(req, res),
);

router.delete(
	'/professors/:professorId',
	async (req, res) => await deleteProfessorController(req, res),
);

//STUDENT ROUTES
router.post(
	'/students',
	createUserValidate,
	async (req, res) => await createStudentController(req, res),
);

router.get(
	'/students',
	async (req, res) => await getAllStudentsController(req, res),
);

router.get(
	'/students/:studentId',
	async (req, res) => await getStudentByIdController(req, res),
);

router.put(
	'/students/:studentId',
	async (req, res) => await updateStudentController(req, res),
);

router.delete(
	'/students/:studentId',
	async (req, res) => await deleteStudentController(req, res),
);

export default router;
