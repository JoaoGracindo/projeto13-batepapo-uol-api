import { messageSchema } from "./messageSchema.js";
import { participantsCollections } from "../database/db.js";

export async function messageValidation(req, res, next){

    const message = req.body;
    const from = req.headers.user;
    let userIsValid;

    const {error} = messageSchema.validate(message);

    try{

        userIsValid = await participantsCollections.findOne({name: from});

    }catch(err){
        return res.send(err);
    }


    if(error || !userIsValid) return res.sendStatus(422);

    next();
}