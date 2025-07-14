import express from 'express';
import { adminValidateJWT } from '../auth/validateJWT.js';
import {
	createProfessorController,
	deleteProfessorController,
	getAllProfessorsController,
	getProfessorByIdController,
	updateProfessorController,
} from '../modules/User/controller/adminController.js';
import '../modules/User/model/UserSchema.js';

const router = express.Router();

router.post(
	'/',
	adminValidateJWT,
	async (req, res) => await createProfessorController(req, res),
);

router.get(
	'/',
	adminValidateJWT,
	async (req, res) => await getAllProfessorsController(req, res),
);

router.get(
	'/:professorId',
	adminValidateJWT,
	async (req, res) => await getProfessorByIdController(req, res),
);

router.put(
	'/:professorId',
	adminValidateJWT,
	async (req, res) => await updateProfessorController(req, res),
);

router.delete(
	'/:professorId',
	adminValidateJWT,
	async (req, res) => await deleteProfessorController(req, res),
);

export default router;
