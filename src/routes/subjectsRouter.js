import express from 'express';
import { validateJWT } from '../auth/validateJWT.js';
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
	validateJWT(['admin']),
	async (req, res) => await createSubjectController(req, res),
);

router.get(
	'/',
	validateJWT(['admin', 'professor']),
	async (req, res) => await getAllSubjectsController(req, res),
);

router.get(
	'/:subjectId',
	validateJWT(['admin', 'professor']),
	async (req, res) => await getSubjectByIdController(req, res),
);

router.put(
	'/:subjectId',
	validateJWT(['admin']),
	async (req, res) => await updateSubjctController(req, res),
);

router.delete(
	'/:subjectId',
	validateJWT(['admin']),
	async (req, res) => await deleteSubjectController(req, res),
);

export default router;
