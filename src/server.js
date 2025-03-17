import { app, port } from './app.js';

app.listen(port, () => {
	console.log(`Servidor rodando na porta ${port}`);
});
