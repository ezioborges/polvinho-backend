export class Response {
    /**
     * Response object
     * @param {number} status
     * @param {string} message
     * @param {object | string} data
     */

    constructor(status, message, data = null) {
      this.status = status;
      this.message = message;
      this.data = data;
      this.error = null;
    }

    /**
     * Set a error inside the response
     * 
     * @param {object} errorObject 
     */
    setError(errorObject) {
      this.error = errorObject;
    }
  }