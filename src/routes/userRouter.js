import express from 'express';
import '../modules/User/model/UserSchema.js';

import {
	createProfessorController,
	createStudentController,
	deleteProfessorController,
	getAllProfessorsController,
	getProfessorByIdController,
	updateProfessorController,
} from '../modules/User/controller/adminController.js';
import { createUserValidate } from '../validation/createUserValidate.js';

const router = express.Router();

//PROFESSOR ROUTES
router.post('/professors', createUserValidate, async (req, res) =>
	createProfessorController(req, res),
);

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

export default router;
