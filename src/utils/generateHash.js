import bcrypt from 'bcrypt'

async function generateHash(password) {
    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds);

    console.log('Senha original ===> ', password);
    console.log('Hash da senha criptografada ===> ', hashPassword);
    
}

generateHash('123456789')