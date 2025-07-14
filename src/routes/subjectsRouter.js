import express from 'express';
import { adminValidateJWT } from '../auth/validateJWT.js';
import {
	createSubjectController,
	deleteSubjectController,
	getAllSubjectsController,
	getSubjectByIdController,
	updateSubjctController,
} from '../modules/Disciplines/controller/SubjectController.js';
import '../modules/Disciplines/model/SubjectSchema.js';

const router = express.Router();

router.post(
	'/',
	adminValidateJWT,
	async (req, res) => await createSubjectController(req, res),
);

router.get(
	'/',
	adminValidateJWT,
	async (req, res) => await getAllSubjectsController(req, res),
);

router.get(
	'/:subjectId',
	adminValidateJWT,
	async (req, res) => await getSubjectByIdController(req, res),
);

router.put(
	'/:subjectId',
	adminValidateJWT,
	async (req, res) => await updateSubjctController(req, res),
);

router.delete(
	'/:subjectId',
	adminValidateJWT,
	async (req, res) => await deleteSubjectController(req, res),
);

export default router;
