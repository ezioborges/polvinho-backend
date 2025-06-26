import { getAllErrors } from '../../../errors/getAllErros.js';
import { compareIds, entityArrayExists } from '../../../validation/index.js';
import User from '../../User/model/UserSchema.js';
import Subject from '../model/SubjectSchema.js';

export const createSubject = async (req, res) => {
	try {
		const { professor, ...subjectsData } = req.body;

		if (!professor) {
			return res.status(401).send({
				message:
					'É necessário informar o professor responsável pela disciplina',
			});
		}

		const professorToAssociate = await User.findOne({ name: professor });

		if (!professorToAssociate) {
			return res.status(404).send({
				message: `Professor ${professor}, não encontrado`,
			});
		}

		const newSubject = new Subject({
			...subjectsData,
			professor: professorToAssociate._id,
		});

		await newSubject.save();

		await User.findByIdAndUpdate(
			professorToAssociate._id,
			{ $push: { subject: newSubject._id } },
			{ new: true, useFindAndModify: false },
		);

		return res
			.status(201)
			.send({ message: 'Disciiplina criada com sucesso' });
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

		return res.status(200).send({ subject });
	} catch (error) {
		getAllErrors(res, 404, 'Disciplina não encontrada', error.message);
	}
};

export const updateSubject = async (req, res) => {
	try {
		const { subjectId } = req.params;
		const { professor, ...subjectsData } = req.body;

		if (!professor) {
			return res.status(401).send({
				message:
					'É necessário informar o professor responsável pela disciplina',
			});
		}

		// Buscar a disciplina atual para obter o professor antigo
		const currentSubject = await Subject.findById(subjectId);

		if (!currentSubject) {
			return res.status(404).send({
				message: 'Disciplina não encontrada',
			});
		}

		const professorToAssociate = await User.findOne({ name: professor });

		if (!professorToAssociate) {
			return res.status(404).send({
				message: `Professor ${professor}, não encontrado`,
			});
		}

		// Se o professor está mudando, atualizar as relações
		if (currentSubject.professor !== professorToAssociate._id) {
			// Remover a disciplina do professor antigo
			await User.findByIdAndUpdate(
				currentSubject.professor,
				{ $pull: { subject: subjectId } },
				{ new: true, useFindAndModify: false },
			);

			// Adicionar a disciplina ao novo professor
			await User.findByIdAndUpdate(
				professorToAssociate._id,
				{ $push: { subject: subjectId } },
				{ new: true, useFindAndModify: false },
			);
		}

		// Atualizar a disciplina
		await Subject.findByIdAndUpdate(subjectId, {
			...subjectsData,
			professor: professorToAssociate._id,
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
