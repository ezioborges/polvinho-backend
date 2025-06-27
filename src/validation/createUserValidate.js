export const createProfessorValidate = (req, res, next) => {
	const { name, email, registration, passwordHash, role } = req.body;

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

	if (!passwordHash || passwordHash.trim() === '') {
		return res.status(400).send({ message: 'Senha é obrigatória' });
	}

	if (!role || role.trim() === '' || role !== 'professor') {
		return res
			.status(400)
			.send({ message: 'Função é obrigatória ser professor' });
	}

	const validEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!validEmailRegex.test(email)) {
		return res.status(400).send({
			message: 'Email inválido',
		});
	}

	const validPassword =
		/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}[\]|\\:;"'<>,.?/~`-])[A-Za-z\d!@#$%^&*()_+={}[\]|\\:;"'<>,.?/~`-]{6,}$/;
	if (!validPassword.test(passwordHash)) {
		return res.status(400).send({
			message:
				'Senha inválida. Deve conter pelo menos 6 caracteres, incluindo letras maiúsculas, minúsculas, números e símbolos.',
		});
	}

	next();
};
