export const formatDate = (releaseDateParam = '') => {
	const year = releaseDateParam.slice(0, 4);
	const month = releaseDateParam.slice(4, 6);
	const day = releaseDateParam.slice(6, 8);

	const date = new Date(year, month - 1, day);

	return date ? date.toISOString() : null;
};
