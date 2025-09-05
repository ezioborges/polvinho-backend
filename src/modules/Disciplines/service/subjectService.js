import User from '../../User/model/UserSchema.js';
import Subject from '../model/SubjectSchema.js';

export const createSubjectService = async req => {
	try {
		const subjectData = req.body;

		const subjectExists = await Subject.findOne({ name: subjectData.name });

		if (subjectExists !== null) {
			// quando uma rota não existir retornar status 404
			return { status: 404, message: 'Disciplina já cadastrada!' };
		}

		const newSubject = new Subject({
			...subjectData,
		});

		await newSubject.save();

		return {
			status: 200,
			message: 'Disciplina criada com sucesso!',
		};
	} catch (error) {
		return { status: 500, message: error.message };
	}
};

export const getAllSubjectsService = async () => {
	try {
		const subject = await Subject.find().populate('quizzes');

		if (!subject || subject.length === 0) {
			return {
				status: 404,
				data: [],
			};
		}

		return { status: 200, data: subject };
	} catch (error) {
		return { status: 500, data: { message: error.message } };
	}
};

export const getSubjectByIdService = async req => {
	try {
		const { subjectId } = req.params;

		const subjectById = await Subject.findById(subjectId);

		return { status: 200, data: subjectById };
	} catch (error) {
		return { status: 500, data: { message: error.message } };
	}
};

export const updateSubjctService = async req => {
	try {
		const { subjectId } = req.params;
		const { name, professor } = req.body;

		const professorExists = await User.findOne({
			name: professor,
			role: 'professor',
		});

		if (!professorExists) {
			return {
				status: 404,
				data: { message: 'Professor não cadastrado' },
			};
		}

		const subjectExists = await Subject.findById(subjectId);

		/// remove a disciplina do professor anterior
		//TODO: MODIFICAR PARA VERIFICAR SE A LISTA ATUALIZADA PERDEU ALGUM ID E ATUALIZAR O ARRAY, NÃO EXCLUIR AS DISCIPLINAS DE FORMA AUTOMÁTICA,
		//UM PROFESSOR PODE TER MAIS DE UMA MATÉRIA CADASTRADA.
		await User.findByIdAndUpdate(
			subjectExists.professor,
			{
				subject: [],
				updatedAt: Date.now(),
			},
			{ new: true, runValidators: true },
		);

		// atualiza o professor atual
		//TODO: ATUALIZAÇÃO DO ARRAY DEVERÁ USAR AS FUNÇÕES NATIVAS DO MONGOSO PARA TRABALHAR COM ARRAYS.
		//EX: $push?
		await User.findByIdAndUpdate(
			professorExists._id,
			{
				subject: subjectId,
				updatedAt: Date.now(),
			},
			{ new: true, runValidators: true },
		);

		// atualiza a disciplina atual
		//TODO: INCREMENTAR A ATUALIZAÇÃO DOS ALUNOS E QUIZZES, CASO EXISTA
		//uma subject por de ter vários alunos ou quizzes, mas apenas um professor(?).
		await Subject.findByIdAndUpdate(
			subjectId,
			{
				name: name,
				professor: professorExists._id,
				updatedAt: Date.now(),
			},
			{ new: true, runValidators: true },
		);

		return {
			status: 200,
			data: { message: 'Disciplina atualizada com sucesso!' },
		};
	} catch (error) {
		return { status: 500, data: { message: error.message } };
	}
};

export const deleteSubjectService = async req => {
	try {
		const { subjectId } = req.params;

		// exclui a disciplina
		//TODO: VER A NECESSIDADE DE EXCLUIR AS INFORMAÇÕES DOS ARRAYS E PROFESSOR
		await Subject.findByIdAndUpdate(subjectId, {
			isDeleted: true,
			updatedAt: Date.now(),
		});

		return {
			status: 200,
			data: { message: 'Disciplina deletada com sucesso' },
		};
	} catch (error) {
		return { status: 500, data: { message: error.message } };
	}
};
