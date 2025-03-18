import { env } from './env/index.js';
import mongoose from 'mongoose';

mongoose.Promise = global.Promise;
mongoose
	.connect(env.DATABASE_HOST)
	.then(() => {
		console.log('Mongo conectado com sucesso! :)');
	})
	.catch(err => {
		console.log(`Erro ao conectar com o mongodb: ${err}`);
	});
