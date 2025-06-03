import { getAllErrors } from '../../../errors/getAllErros.js';
import { compareIds, entityArrayExists } from '../../../validation/index.js';
import Subject from '../model/SubjectSchema.js';

export const createSubject = async (req, res) => {
	try {
		const newSubject = new Subject(req.body);
		await newSubject.save();
		return res
			.status(201)
			.send({ message: 'Disciplina criado com sucesso!' });
	} catch (error) {
		getAllErrors(res, 500, 'Erro ao carregar a disciplina', error.message);
	}
};

export const getAllSubjects = async (_req, res) => {
	try {
		const subjects = await Subject.find();

		entityArrayExists(subjects);

		return res.status(200).send({ subjects });
	} catch (error) {
		getAllErrors(res, 404, 'Disciplinas não encontradas', error.message);
	}
};

export const getSubjectById = async (req, res) => {
	try {
		const { subjectId } = req.params;

		const subject = await Subject.findById(subjectId);

		compareIds(subjectId, subject._id.toString());

		return res.status(200).send(subject);
	} catch (error) {
		getAllErrors(res, 404, 'Disciplina não encontrada', error.message);
	}
};

export const updateSubject = async (req, res) => {
	try {
		const { subjectId } = req.params;
		const discipline = req.body;

		await Subject.findById(subjectId).updateOne({
			...discipline,
			updatedAt: Date.now(),
		});

		return res
			.status(200)
			.send({ message: 'Disciplina atualizada com sucesso' });
	} catch (error) {
		getAllErrors(res, 500, 'Erro ao atualizar disciplina', error.message);
	}
};

export const deleteSubject = async (req, res) => {
	try {
		const { subjectId } = req.params;

		const disciplines = req.body;

		await Subject.findById(subjectId).updateOne({
			...disciplines,
			isDeleted: true,
			updatedAt: Date.now(),
		});

		return res
			.status(200)
			.send({ message: 'Disciplina deletada com sucesso!' });
	} catch (error) {
		getAllErrors(res, 404, 'Erro ao deletar disciplina', error.message);
	}
};
