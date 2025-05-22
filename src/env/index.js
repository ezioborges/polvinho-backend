import { config } from 'dotenv'; // Importe 'config' ao invés de 'configDotenv'

// Carrega as variáveis do .env APENAS se não estiver em ambiente de produção.
// Isso evita que o dotenv tente ler um arquivo .env que não existe no Render.
if (process.env.NODE_ENV !== 'production') {
	config(); // Chama config() para carregar o .env localmente
}

// Exporta as variáveis diretamente de process.env
// Em desenvolvimento: process.env é populado por dotenv.
// Em produção (Render): process.env já é populado pelo ambiente do Render.
export const env = {
	NODE_ENV: process.env.NODE_ENV || 'development',
	PORT: process.env.PORT || 2424,
	DATABASE_HOST: process.env.DATABASE_HOST, // <-- Agora ele pega do process.env
	// Adicione outras variáveis aqui se tiver
};

// Opcional: Adicione uma verificação de segurança (muito recomendado)
if (!env.DATABASE_HOST) {
	console.error(
		'ERRO CRÍTICO: DATABASE_HOST não está definida nas variáveis de ambiente!',
	);
	// Você pode forçar a saída do processo se a conexão for essencial
	// process.exit(1);
}
