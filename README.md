This is the back-end template for the Polvinho Quiz platform, built with Node.js and Express.js. It provides a robust foundation for developing a quiz application with features like environment variable validation, error handling, and modular architecture.

## Table of Contents

- Features
- Getting Started
  - Pre-requisites
  - Installation
  - Running the Application
- Project Structure
- Environment Variables
- Scripts
- License

## Features

- Environment variable validation
- Global error handling
- Modular architecture
- Docker support
- Prettier and ESLint integration

## Getting Started

### Prerequisites

- Node.js v22.13.1
- Docker (optional, for containerized deployment)

### Installation

1. Clone the repository:

```sh
git clone https://github.com/yourusername/polvinho-quiz-back-end.git
cd polvinho-quiz-back-end
```

2. Install dependencies:

```sh
npm install
```

3. Copy the .env.example file to .env and fill in the required environment variables:

```sh
cp .env.example .env
```

### Running the Application

#### Using Node.js

```sh
npm start
```

#### Using Docker

1. Build and run the Docker containers:

```sh
docker-compose up --build
```

2. The application will be available at `http://localhost:3333`.

## Project Structure

```plaintext
.env
.env.example
.gitignore
.prettierignore
.prettierrc.json
docker-compose.yml
Dockerfile
eslint.config.mjs
package.json
src/
	app.js
	env/
		index.js
	errors/
		handlers/
			GlobalErrorHandler.js
		InvalidEnvironmentVariablesError.js
		NotFoundError.js
	middlewares/
	modules/
		pong/
			controller/
				PongController.js
			routes/
				router.js
	routes.js
	server.js
	utils/
		Response.js
```

- app.js: Initializes the Express application and sets up middlewares, routes, and error handling.
- index.js: Loads and validates environment variables.
- errors: Contains custom error classes and handlers.
- pong: Example module with a simple PongController and routes.
- routes.js: Defines the main application routes.
- server.js: Starts the Express server.

## Environment Variables

The application requires the following environment variables:

- `NODE_ENV`: Application environment (e.g., development, production)
- `PORT`: Port on which the application will run
- `NAMESPACING`: Base URL for API routes
- `JWT_EXPIRATION_TIME`: JWT expiration time in hours
- `JWT_SECRET`: Secret key for JWT
- `BACKEND_URL`: URL of the backend
- `FRONTEND_URL`: URL of the frontend
- `DATABASE_HOST`: Database host
- `DATABASE_PORT`: Database port
- `DATABASE_NAME`: Database name
- `SMTP_HOST`: SMTP host for email
- `SMTP_PORT`: SMTP port for email
- `SMTP_USERNAME`: SMTP username for email
- `SMTP_PASSWORD`: SMTP password for email

## Scripts

- `npm start`: Starts the application using Nodemon.
- `npm run format`: Formats the code using Prettier.
- `npm run lint`: Lints the code using ESLint.
- `npm run lint:fix`: Fixes linting errors using ESLint.

## License

This project is licensed under the ISC License. See the LICENSE file for details.