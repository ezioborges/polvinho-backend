export const userArrayExists = arr => {
	if (arr.length <= 0) {
		throw new Error('Não há clientes cadastrados');
	}
};

export const compareIds = (paramsId, userId) => {
	if (paramsId !== userId) {
		throw new Error('Falha na requisição de usuário');
	}
};
