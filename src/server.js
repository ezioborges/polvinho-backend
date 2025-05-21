import { app } from './app.js';
import { env } from './env/index.js';

app.listen(env.PORT, () => {
	console.log(`Servidor rodando na porta ${env.PORT}`);
});
