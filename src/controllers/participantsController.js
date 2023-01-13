import dayjs from "dayjs";
import { stripHtml } from "string-strip-html";

import { participantsCollections, messagesCollections } from "../database/db.js";
import { userSchema } from "../middlewares/userSchema.js";

const now = Date.now();



export async function signUp(req, res){

    const name = stripHtml(req.body.name).result;


    const validUsername = userSchema.validate({name});
    if(validUsername.error) return res.send(validUsername.error);
    const bodyUser = {name, lastStatus: now};
    const bodyMessage = {from: name, to: 'Todos', text: 'entra na sala...', type: 'status', time: dayjs().format('HH:mm:ss')};

    try{
        await participantsCollections.insertOne(bodyUser);
        await messagesCollections.insertOne(bodyMessage);

    }catch(err){
        return res.send(err);
    }

    return res.sendStatus(201);
}

export async function getParticipants(req, res){
    try{
        const users = await participantsCollections.find({}).toArray();
       return res.send(users);

    }catch(err){
       return res.send(err);
    }
}
