export const createUserMiddleware = (req, res, next) => {
	const { name, email, registration, passwordHash, role } = req.body;
	const errors = {};

	if (!name || name.length <= 0) {
		errors.name = 'O campo de nome é obrigatório.';
	}

	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!email || email.length <= 0) {
		errors.email = 'O campo de e-mail é obrigatório.';
	} else if (!emailRegex.test(email)) {
		errors.email = 'Formato de e-mail inválido.';
	}

	if (!registration || registration.length < 6) {
		errors.registration =
			'A matrícula do usuário deve possuir no mínimo 6 caracteres.';
	}

	const passwordRegex =
		/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{6,}$/;
	if (!passwordHash) {
		errors.password = 'O campo de senha é obrigatório.';
	} else if (!passwordRegex.test(passwordHash)) {
		errors.password =
			'A senha deve possuir, no mínimo: um número, uma letra maiúscula, uma letra minúscula e um caractere especial. Além de ter no mínimo 6 caracteres.';
	}

	const possibleRoles = ['admin', 'professor', 'student'];
	if (!role) {
		errors.role = 'O campo de role é obrigatório.';
	} else if (!possibleRoles.includes(role)) {
		errors.role = 'A role informada não é válida.';
	}

	// Se houver erros, envia resposta HTTP 400
	if (Object.keys(errors).length > 0) {
		return res.status(400).json({
			message: 'A requisição contém campos inválidos.',
			errors,
		});
	}

	next();
};
