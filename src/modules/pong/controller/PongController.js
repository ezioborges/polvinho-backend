import { request, response, Router } from "express";

export class PongController {
    constructor(){
        this.getPong = this.getPong.bind(this);
    }

    /**
     * This method returns a pong message
     * 
     * @param {request} _ 
     * @param {response} res 
     */
    async getPong(_, res){
        res.json({message: 'pong'});
    }

    /**
     * Set the routes for this controller
     * 
     * @param {Router} router 
     */
    async setRouter(router){
        router.get('/ping', this.getPong);
    };

}