import jwt from 'jsonwebtoken';
import User from '../model/UserSchema.js';
import { env } from '../../../env/index.js'; 
import bcrypt from 'bcrypt';

const JWT_SECRET = env.JWT_SECRET;

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user  = await User.findOne({ email })
        if (!user) {
            return res.status(404).send({ message: "Credenciais inválidas" })
        };

        const isPasswordValid = await bcrypt.compare(password, user.passwordHash)

        if (!isPasswordValid) {
            return res.status(401).send({ message: "Senha inválida" })
        }

        const token = jwt.sign(
            { id: user._id, email: user.email},
            JWT_SECRET,
            { expiresIn: '1h' }
        )

        return res.status(200).send({
            message: "Login realizado com sucesso",
            token,
            user: {
                id: user._id,
                name: user.name,
                emaail: user.email,
                role: user.role
            }
        })
    } catch (error) {
        return res.status(500).send({
            message: "Erro ao realizar login",
            error: error.message
        });        
    }
}

export default login;