export const createUserValidate = (req, res, next) => {
	const { name, email, registration, role } = req.body;

	if (!name || name.trim() === '') {
		return res.status(400).send({ message: 'Nome é obrigatório!' });
	}

	if (!email || email.trim() === '') {
		return res.status(400).send({ message: 'Email é obrigatório!' });
	}

	if (!registration || registration.trim() === '') {
		return res.status(400).send({ message: 'Matrícula é obrigatória' });
	}

	if (registration.length < 6) {
		return res
			.status(400)
			.send({ message: 'Matrícula deve ter pelo menos 6 caracteres' });
	}

	if (!role || role.trim() === '') {
		return res
			.status(400)
			.send({ message: 'Função é obrigatória ao cadastrar usuário' });
	}

	const validEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!validEmailRegex.test(email)) {
		return res.status(400).send({
			message: 'Email inválido',
		});
	}

	next();
};
