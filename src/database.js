import mongoose from 'mongoose';

mongoose.Promise = global.Promise;
mongoose
	.connect('mongodb://localhost:27017')
	.then(() => {
		console.log('Mongo conectado com sucesso! :)');
	})
	.catch(err => {
		console.log(`Erro ao conectar com o mongodb: ${err}`);
	});
