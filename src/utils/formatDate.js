export const formatDate = (submissionDeadlineParam = '') => {
	const formatedDate = new Date(submissionDeadlineParam).toISOString();
	return formatedDate;
};
