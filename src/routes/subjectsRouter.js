import express from 'express';
import {
	createSubject,
	deleteSubject,
	getAllSubjects,
	getSubjectById,
	updateSubject,
} from '../modules/Disciplines/controller/SubjectController.js';
import '../modules/Disciplines/model/SubjectSchema.js';

const router = express.Router();

router.post('/', async (req, res) => await createSubject(req, res));
router.get('/', async (req, res) => await getAllSubjects(req, res));
router.get('/:subjectId', async (req, res) => await getSubjectById(req, res));
router.put('/:subjectId', async (req, res) => await updateSubject(req, res));
router.delete('/:subjectId', async (req, res) => await deleteSubject(req, res));

export default router;
