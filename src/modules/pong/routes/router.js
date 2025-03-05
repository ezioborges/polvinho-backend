import { Router } from 'express';
import { PongController } from '../controller/PongController.js';

const routes = Router();
const pongController = new PongController();

routes.get('/', pongController.getPong);

export { routes as pongRoutes };
