import { Response } from "../../utils/Response.js"

export const GlobalErrorHandler = async (err, req, res, next) => {
	const errCode = err.statusCode || 500;
	const errMsg = err.message || "Something went wrong";
	const image = err.image || undefined;

	let response = new Response();
	response.setError({
		status: errCode,
		message: errMsg,
		image: image,
	});

	res.status(errCode).json(response);
};
