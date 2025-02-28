import { Response } from "../../utils/Response.js";

export const GlobalErrorHandler = async (err, _req, res) => {
	const errCode = err.statusCode || 500;
	const errMsg = err.message || "Something went wrong";
	const image = err.image || undefined;

	const response = new Response();
	response.setError({
		status: errCode,
		message: errMsg,
		image,
	});

	res.status(errCode).json(response);
};
