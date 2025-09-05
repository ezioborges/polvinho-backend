export const createUserValidator = reqBody => {
	const { name, email, registration, passwordHash, role } = reqBody;

	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	const validRegex = emailRegex.test(email);

	const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{6,}$/;
	const validPassword = passwordRegex.test(passwordHash);

	const possibleRoles = ['admin', 'professor', 'student'];
	const validRole = possibleRoles.includes(role);

	if (!name || name.length <= 0) {
		return {
			status: 400,
			data: { message: 'Campo de nome é obrigatório!' },
		};
	}

	if (!email || email.length <= 0) {
		return {
			status: 400,
			data: { message: 'Campo de email é obrigatório!' },
		};
	}

	if (!validRegex) {
		return {
			status: 400,
			data: { message: 'Formato de email inválido!' },
		};
	}

	if (!registration || registration.length < 6) {
		return {
			status: 400,
			data: {
				message:
					'A matrícula do usuário deve possuir no mínimo 6 caracteres',
			},
		};
	}

	if (!passwordHash || !validPassword) {
		return {
			status: 400,
			data: {
				message:
					'Verifique se a senha criada possui, no mínimo, um número, uma letra maiúscula, uma minúscula e um caractere especial. Além de possuir tamanho mínimo de 6 caracteres',
			},
		};
	}

	if (!validRole) {
		return {
			status: 400,
			data: {
				message:
					'É necessário passar uma role válida para cadastrar um usuário.',
			},
		};
	}

	return false;
};
