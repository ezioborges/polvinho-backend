import jwt from 'jsonwebtoken';
import { env } from '../env/index.js';
import User from '../modules/User/model/UserSchema.js';

const secret = env.JWT_SECRET || 'umanhamuitosecreta';

function extractToken(bearerToken) {
	return bearerToken.split(' ')[1];
}

// Função que retorna um middleware de validação de JWT para roles específicas
export const validateJWT =
	(allowedRoles = []) =>
	async (req, res, next) => {
		const bearerToken = req.header('Authorization');

		if (!bearerToken) {
			return res.status(401).json({ error: 'Token não fornecido' });
		}

		const token = extractToken(bearerToken);

		try {
			const decoded = jwt.verify(token, secret);

			const user = await User.findById(decoded.id);

			if (!user) {
				return res
					.status(401)
					.json({ error: 'Erro ao procurar usuário do token' });
			}

			const userRole = user.role.toLowerCase();

			// Verifica se a role do usuário está na lista de roles permitidas
			if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
				return res.status(403).json({
					error: 'Acesso negado: Você não tem permissão para esta ação.',
				});
			}

			req.user = user; // Adiciona o usuário decodificado ao objeto de requisição

			next();
		} catch (error) {
			return res.status(401).json({
				message: 'Token inválido ou expirado',
				error: error.message,
			});
		}
	};
