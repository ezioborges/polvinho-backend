import { Response } from '../../../utils/Response.js';
export class PongController {
	constructor() {
		this.getPong = this.getPong.bind(this);
	}

	/**
	 * This method returns a pong message
	 * @param {request} _
	 * @param {response} res
	 */
	async getPong(_, res) {
		const response = new Response();
		response.status = 200;
		response.data = { message: 'pong' };

		res.json(response);
	}
}
