import { insertStudentValidate } from '../../../validation/insertStudentValidate.js';
import User from '../../User/model/UserSchema.js';
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

export const insertProfessorInSubjectService = async req => {
	try {
		const { subjectId } = req.params;
		const { professor } = req.body;

		const subjectExists = await Subject.findById(subjectId);

		if (subjectExists.professor) {
			return {
				status: 400,
				data: {
					message: 'Disciplina já possui um professor cadastrado!',
				},
			};
		}

		if (!subjectExists) {
			return {
				status: 404,
				data: { message: 'Disciplina não cadastrada!' },
			};
		}

		const professorExists = await User.findOne({ name: professor });

		console.log('professorExists ===> ', professorExists._id);

		if (!professorExists) {
			return {
				status: 400,
				data: { message: `Professor "${professor}", não cadastrado` },
			};
		}

		const updatedSubject = await Subject.findByIdAndUpdate(
			subjectId,
			{
				professor: professorExists._id,
				updatedAt: Date.now(),
			},
			{ new: true, runValidators: true },
		);

		await User.findByIdAndUpdate(
			professorExists._id,
			{ subject: subjectId, updatedAt: Date.now() },
			{ new: true, runValidators: true },
		);

		return { status: 200, data: updatedSubject };
	} catch (error) {
		return { status: 500, data: error.message };
	}
};

export const insertStudentInSubjectService = async req => {
	try {
		const { subjectId } = req.params;

		const validation = await insertStudentValidate(subjectId, req.body);

		if (validation.status !== 200) {
			return validation;
		}

		const studentExists = validation.data;

		const updateSubject = await Subject.findByIdAndUpdate(
			subjectId,
			{
				$push: { students: studentExists._id },
				updatedAt: Date.now(),
			},
			{ new: true, runValidators: true },
		).populate('students');

		await User.findByIdAndUpdate(
			studentExists._id,
			{ subject: subjectId, updatedAt: Date.now() },
			{ new: true, runValidators: true },
		);

		return { status: 200, data: updateSubject };
	} catch (error) {
		return { status: 500, data: error.essage };
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
