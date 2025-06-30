import User from '../../User/model/UserSchema.js';
import Subject from '../model/SubjectSchema.js';

export const createSubjectService = async (req, res) => {
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
		res.status(500).send({
			message: 'Erro ao criar disciplina',
			error: error.message,
		});
	}
};

export const getAllSubjectsService = async () => {
	try {
		const subject = await Subject.find();

		if (!subject || subject.length === 0) {
			return { status: 404, message: 'Nenhuma disciplina encontrada' };
		}

		return { status: 200, data: subject };
	} catch (error) {
		return { status: 500, message: error.message };
	}
};

export const getSubjectByIdService = async req => {
	try {
		const { subjectId } = req.params;

		const subjectById = await Subject.findById(subjectId);

		return { status: 200, data: subjectById };
	} catch (error) {
		return { status: 500, message: error.message };
	}
};

export const updateSubjectService = async req => {
	try {
		const { subjectId } = req.params;
		const { professor, ...subjectData } = req.body;

		const subjectExists = await Subject.findById(subjectId);

		if (!subjectExists) {
			return {
				status: 404,
				data: { message: 'Disciplina não cadastrada!' },
			};
		}

		const professorExists = await User.findOne({ name: professor });

		if (!professorExists) {
			return {
				status: 200,
				data: { message: `Professor "${professor}", não cadastrado` },
			};
		}

		const updatedSubject = await Subject.findByIdAndUpdate(
			subjectId,
			{
				...subjectData,
				professor: professorExists._id,
				updatedAt: Date.now(),
			},
			{ new: true, runValidators: true },
		);

		return { status: 200, data: updatedSubject };
	} catch (error) {
		return { status: 500, message: error.message };
	}
};
