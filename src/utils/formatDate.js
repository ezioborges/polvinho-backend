export const formatDate = (submissionDeadlineParam = '') => {
	const day = submissionDeadlineParam.slice(0, 2);
	const month = submissionDeadlineParam.slice(2, 4);
	const year = submissionDeadlineParam.slice(4);

	const formatedDate = new Date(year, month - 1, day).toISOString();
	return formatedDate;
};
