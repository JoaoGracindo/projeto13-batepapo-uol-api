import { messageSchema } from "./messageSchema.js";
import { participantsCollections } from "../database/db.js";

export async function messageValidation(req, res, next){

    const message = req.body;
    const from = req.headers.user;


    const {error} = messageSchema.validate(message);
    const userIsValid = await participantsCollections.findOne({name: from})

    if(error || !userIsValid) return res.sendStatus(422)

    next()
}