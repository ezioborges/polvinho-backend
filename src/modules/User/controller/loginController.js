import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { env } from '../../../env/index.js';
import User from '../model/UserSchema.js';

const JWT_SECRET = env.JWT_SECRET;

const login = async (req, res) => {
	try {
		const { email, password, registration } = req.body;

		let user;

		if (email) {
			user = await User.findOne({ email });
		} else if (registration) {
			user = await User.findOne({ registration });
		}

		if (!user) {
			return res
				.status(404)
				.send({ message: 'Email ou matrícula inválidos' });
		}

		const isPasswordValid = await bcrypt.compare(
			password,
			user.passwordHash,
		);

		if (!isPasswordValid) {
			return res.status(401).send({ message: 'Senha inválida' });
		}

		const token = jwt.sign(
			{ id: user._id, email: user.email, role: user.role },
			JWT_SECRET,
			{ expiresIn: '4h' },
		);

		return res.status(200).send({
			message: 'Login realizado com sucesso',
			token,
			user: {
				id: user._id,
				name: user.name,
				email: user.email,
				role: user.role,
			},
		});
	} catch (error) {
		return res.status(500).send({
			message: 'Erro ao realizar login',
			error: error.message,
		});
	}
};

export default login;
