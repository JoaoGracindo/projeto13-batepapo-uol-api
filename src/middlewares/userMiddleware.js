import { userSchema } from "./userSchema.js";
import {participantsCollections} from "../database/db.js";

export async function userValidation(req, res, next){

    const {name} = req.body
    const {error} = userSchema.validate({name})

    if(error) return res.status(422).send("Name must be a string bigger than 2 char.");

    const userAlreadyExists = await participantsCollections.findOne({name})
    if(userAlreadyExists) return res.status(409).send("User already exists");
    

    next();
}