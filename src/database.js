import mongoose from 'mongoose';
import { env } from './env/index.js';

mongoose.Promise = global.Promise;

mongoose
	.connect(env.DATABASE_HOST)
	.then(() => {
		console.log('Mongo conectado com sucesso! :)');
	})
	.catch(err => {
		console.log(`Erro ao conectar com o mongodb: ${err}`);
	});
