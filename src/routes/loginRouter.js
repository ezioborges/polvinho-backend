import express from 'express';
import login from '../modules/User/controller/loginController.js'

const router = express.Router();

router.post('/', async (req, res) => login(req, res));

export default router;