import express from 'express';
import {
	createSubjectController,
	deleteSubjectController,
	getAllSubjectsController,
	getSubjectByIdController,
	insertStudentToSubjectController,
	updateSubjectController,
} from '../modules/Disciplines/controller/SubjectController.js';
import '../modules/Disciplines/model/SubjectSchema.js';

const router = express.Router();

router.post('/', async (req, res) => await createSubjectController(req, res));

router.get('/', async (req, res) => await getAllSubjectsController(req, res));

router.get(
	'/:subjectId',
	async (req, res) => await getSubjectByIdController(req, res),
);

router.put(
	'/:subjectId',
	async (req, res) => await updateSubjectController(req, res),
);

router.put('/:subjectId/insert-student', async (req, res) =>
	insertStudentToSubjectController(req, res),
);

router.delete(
	'/:subjectId',
	async (req, res) => await deleteSubjectController(req, res),
);

export default router;
