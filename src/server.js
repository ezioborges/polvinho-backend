import { configDotenv } from 'dotenv';
import { app } from './app.js';

const env = configDotenv()
const { PORT } = env.parsed

app.listen(PORT, () => {
	console.log(`Servidor rodando na porta ${PORT}`);
});
