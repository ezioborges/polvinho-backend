export const UsersArrayValidator = (userArray, role) => {
	if (!userArray || userArray.length <= 0) {
		if (role === 'professor') {
			return {
				status: 404,
				data: { message: `Não há professores cadastrados!` },
			};
		} else if (role === 'student') {
			return {
				status: 404,
				data: { message: `Não há alunos cadastrados!` },
			};
		}
	}
};

export const userExisitsValidator = (user, role) => {
	if (!user || user.length <= 0) {
		if (role === 'professor') {
			return {
				status: 404,
				data: { message: `Professor não encontrado!` },
			};
		} else if (role === 'student') {
			return {
				status: 404,
				data: { message: `Aluno não encontrado!` },
			};
		}
	}
};
