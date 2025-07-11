import express from 'express';
import {
	createProfessorController,
	deleteProfessorController,
	getAllProfessorsController,
	getProfessorByIdController,
	updateProfessorController,
} from '../modules/User/controller/adminController.js';
import '../modules/User/model/UserSchema.js';

const router = express.Router();

router.post('/', async (req, res) => await createProfessorController(req, res));

router.get('/', async (req, res) => await getAllProfessorsController(req, res));

router.get(
	'/:professorId',
	async (req, res) => await getProfessorByIdController(req, res),
);

router.put(
	'/:professorId',
	async (req, res) => await updateProfessorController(req, res),
);

router.delete(
	'/:professorId',
	async (req, res) => await deleteProfessorController(req, res),
);

export default router;
