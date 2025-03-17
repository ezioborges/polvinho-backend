import express from 'express'
import mongoose from 'mongoose'
import professor from './routes/professorRouter.js'

export const app = express()
export const port = 3333

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017').then(() => {
  console.log('Mongo conectado com sucesso! :)');
}).catch(err => {
  console.log(`Erro ao conectar com o mongodb: ${err}`);
})

app.use('/professor', professor)