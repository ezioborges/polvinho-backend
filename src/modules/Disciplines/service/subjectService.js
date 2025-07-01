import { updateSubjectValidate } from '../../../validation/updateSubjectValidate.js';
import Subject from '../model/SubjectSchema.js';

export const createSubjectService = async req => {
	try {
		const subjectData = req.body;

		const newSubject = new Subject({
			...subjectData,
			professor: null,
		});

		await newSubject.save();

		return {
			status: 200,
			message: 'Disciplina criada com sucesso!',
		};
	} catch (error) {
		return { status: 500, data: { message: error.message } };
	}
};

export const getAllSubjectsService = async () => {
	try {
		const subject = await Subject.find();

		if (!subject || subject.length === 0) {
			return {
				status: 404,
				data: { message: 'Nenhuma disciplina encontrada' },
			};
		}

		return { status: 200, data: subject };
	} catch (error) {
		return { status: 500, mesdayasage: error.message };
	}
};

export const getSubjectByIdService = async req => {
	try {
		const { subjectId } = req.params;

		const subjectById = await Subject.findById(subjectId);

		return { status: 200, data: subjectById };
	} catch (error) {
		return { status: 500, data: error.message };
	}
};

export const updateSubjctService = async req => {
	try {
		const { subjectId } = req.params;
		const { name, professor, students } = req.body;

		const validation = await updateSubjectValidate(
			subjectId,
			name,
			professor,
			students,
		);

		if (validation.status !== 200) {
			return validation;
		}

		return {
			status: 200,
			data: { message: 'Disciplina atualizada com sucesso' },
		};
	} catch (error) {
		return { status: 500, data: { message: error.message } };
	}
};

export const deleteSubjectService = async req => {
	try {
		const { subjectId } = req.params;

		await Subject.findByIdAndUpdate(subjectId, {
			isDeleted: true,
			updatedAt: Date.now(),
		});

		return { status: 200, data: { message: 'Subject deleted' } };
	} catch (error) {
		return { status: 500, data: error.message };
	}
};
