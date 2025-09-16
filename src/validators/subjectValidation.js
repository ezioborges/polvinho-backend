export const subjectExistsValidator = subject => {
	if (!subject || subject.length <= 0) {
		return {
			status: 404,
			data: { message: 'A disciplina não está cadastrada!' },
		};
	}
};
