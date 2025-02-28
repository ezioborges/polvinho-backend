export class InvalidEnvironmentVariablesError extends Error {
	/**
     * receives a message you want to send to the user
     * 
     * @param {string} message 
     * 
     * @returns {void}
     */
    constructor(message) {
		super(message);
		this.name = "InvalidEnvironmentVariablesError";
	}
}