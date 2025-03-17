import express from 'express'
import mongoose from 'mongoose'
import '../modules/Professor/model/ProfessorSchema.js'

const Professor = mongoose.model('professors')

const router = express.Router()

router.post('/', (req, res) => {
  const newProfessor = {
    name: req.body.name,
    email: req.body.email,
    registration: req.body.registration, 
    passwordHash: req.body.passwordHash,
    role: req.body.role,
    createdAt: req.body.createdAt,
    updatedAt: null,
    isDeleted: req.body.isDeleted
  }
  
  new Professor(newProfessor).save().then(() => {
    console.log('Professor cadastrado com sucesso!');
  }).catch(err => {
    console.log(`Erro ao cadastrar professor: ${err}`);
  })

  return res.status(201).send()
})

router.get('/', async (req, res) => {
  const professors = await Professor.find()

  res.status(200).send({ professors })
})

router.get('/:id', async (req, res) => {
  const { id } = req.params
  const professor = await Professor.findById(id).exec()

  return res.status(200).send(professor)
})

export default router;
