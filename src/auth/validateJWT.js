import jwt from 'jsonwebtoken';
import { env } from '../env/index.js';
import User from '../modules/User/model/UserSchema.js';

const secret = env.JWT_SECRET || 'umanhamuitosecreta';

function extractToken(bearerToken) {
	return bearerToken.split(' ')[1];
}

export const validateJWT = async (req, res, next) => {
	const bearerToken = req.header('Authorization');
	console.log('🚀 ~ validateJWT ~ bearerToken:', bearerToken);

	if (!bearerToken) {
		return res.status(401).json({ error: 'Token não fornecido' });
	}

	const token = extractToken(bearerToken);
	console.log('🚀 ~ validateJWT ~ token:', token);

	try {
		const decoded = jwt.verify(token, secret);
		console.log('🚀 ~ validateJWT ~ decoded:', decoded);

		const user = await User.findById(decoded.id);
		console.log('🚀 ~ validateJWT ~ user:', user);

		if (!user) {
			return res
				.status(401)
				.json({ error: 'Erro ao procurar usuário do token' });
		}

		console.log('req.user ===> ', req.user);

		req.user = user;

		next();
	} catch (error) {
		return res.status(401).json({
			message: 'Token inválido ou expirado',
			error: error.message,
		});
	}
};
