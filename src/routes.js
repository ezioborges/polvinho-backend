import { Router } from 'express';
import { NotFound } from './errors/NotFoundError.js';
import { pongRoutes } from './modules/pong/routes/router.js';

const routes = Router();

routes.use('/ping', pongRoutes);

// Catch-all route for handling 404 errors
routes.use(() => {
	throw new NotFound("Route doesn't exist");
});

export { routes };
