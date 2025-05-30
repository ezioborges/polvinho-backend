import mongoose from 'mongoose';
import bcrypt from 'bcrypt'; 

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true }, 
    registration: { type: String, required: true, unique: true }, 
    passwordHash: { type: String, required: true },
    role: { type: String, required: true, default: 'Aluno' }, 
    createdAt: { type: Date, default: Date.now }, 
    updatedAt: { type: Date, default: null },
    isDeleted: { type: Boolean, default: false },
});

// para criptografar as senhas quando o usuário é criado ou atualizado
UserSchema.pre('save', async function(next) {

    if (this.isModified('passwordHash')) {
        const saltRounds = 10;
        this.passwordHash = await bcrypt.hash(this.passwordHash, saltRounds);
    }
    next(); 
});

const User = mongoose.model('users', UserSchema);

export default User;