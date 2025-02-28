export class NotFound extends Error {
    constructor(message) {
        super(message);
        this.statusCode = 404;
        this.name = 'NotFound';
        this.cause = 'The endpoint you are looking for does not exist';
        this.image = 'https://http.cat/404';
    }
}