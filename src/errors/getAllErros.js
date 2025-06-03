export const getAllErrors = (errorRes, statusCode, msg, errorMsg) => {
	return errorRes.status(statusCode).send({
		message: msg,
		error: errorMsg,
	});
};
