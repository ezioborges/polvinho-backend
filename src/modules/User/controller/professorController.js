import { CreateProfessorService } from '../service/professorService.js';

export const createProfessorController = async (req, res) => {
	try {
		await CreateProfessorService(req, res);
	} catch (error) {
		throw new Error('Erro ao cadastrar proferssor', error.message);
	}
};
