import express from 'express'
// import mongoose from 'mongoose'

const router = express.Router()

router.get('/', (req, res) => {
  return res.status(201).send({ message: 'Aqui ta chegando' })
})

export default router;
