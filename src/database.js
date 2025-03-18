import { configDotenv } from 'dotenv';
import mongoose from 'mongoose';

const env = configDotenv()
const { DATABASE_HOST } = env.parsed

mongoose.Promise = global.Promise;
mongoose
	.connect(DATABASE_HOST)
	.then(() => {
		console.log('Mongo conectado com sucesso! :)');
	})
	.catch(err => {
		console.log(`Erro ao conectar com o mongodb: ${err}`);
	});
