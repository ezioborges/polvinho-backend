import cors from "cors";
import express from "express";
import "express-async-errors";
import env from "./env/index.js";
import { GlobalErrorHandler } from "./errors/handlers/GlobalErrorHandler.js";
import { routes } from "./routes.js";

/**
 * Base app - class based.
 */
class App {
	constructor() {
		this.server = express();
		this.setRoot();
		this.middlewares();
		this.routes();
		this.errorHandling();
	}

	/**
	 * Application middlewares definition (to every request)
	 */
	middlewares() {
		this.server.disable("x-powered-by");
		this.server.use(cors());
		this.server.use(express.json());
	}

	/**
	 * Base routes definition
	 */
	routes() {
		this.server.use(env.NAMESPACING, routes);
	}

	/**
	 * Root route definition
	 */
	setRoot() {
		this.server.get("/", (req, res) => {
			res.json({
				message: "Welcome to the polvinho-quiz-api",
				status: "success",
				data: {
					version: "1.0.0",
					documentation: `${req.protocol}://${req.get("host")}/api/docs`,
					ping: `${req.protocol}://${req.get("host")}/api/ping`,
				},
			});
		});
	}

	/**
	 * Error handling middleware
	 */
	errorHandling() {
		this.server.use((err, req, res, next) => {
			console.error(
				`❌ Error ❌: ${err.message}\n⚠️ Stack ⚠️: ${err.stack} \n`,
			);
			GlobalErrorHandler(err, req, res, next);
		});
	}
}

export default new App().server;
