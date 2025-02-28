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
		res.json({ message: "pong" });
	}
}
