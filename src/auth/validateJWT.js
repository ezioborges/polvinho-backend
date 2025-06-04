import jwt from 'jsonwebtoken';
import { env } from '../env/index.js';
import User from '../modules/User/model/UserSchema.js';

const secret = env.JWT_SECRET || 'umanhamuitosecreta';

function extractToken(bearerToken) {
	return bearerToken.split(' ')[1];
}

export const adminValidateJWT = async (req, res, next) => {
	const bearerToken = req.header('Authorization');

	if (!bearerToken) {
		return res.status(401).json({ error: 'Token não fornecido' });
	}

	const token = extractToken(bearerToken);

	try {
		const decoded = jwt.verify(token, secret);

		const user = await User.findById(decoded.id);

		const role = user.role.toLocaleLowerCase();

		if (!user) {
			return res
				.status(401)
				.json({ error: 'Erro ao procurar usuário do token' });
		}

		if (role !== 'admin') {
			return res.status(403).json({
				error: 'Acesso negado: Verifique suas credenciais.',
			});
		}

		req.user = user;

		next();
	} catch (error) {
		return res.status(401).json({
			message: 'Token inválido ou expirado',
			error: error.message,
		});
	}
};
