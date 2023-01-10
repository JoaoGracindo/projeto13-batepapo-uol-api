import { participantsCollections, messagesCollections } from "../database/db.js";
import dayjs from "dayjs";

const now = Date.now()

export async function signUp(req, res){

    const name = req.body.name;
    const bodyUser = {name, lastStatus: now};
    const bodyMessage = {from: name, to: 'Todos', text: 'entra na sala...', type: 'status', time: dayjs(now).format('HH:MM:SS')};

    try{
        await participantsCollections.insertOne(bodyUser);
        await messagesCollections.insertOne(bodyMessage);

    }catch(err){
        return res.send(err)
    }

    res.sendStatus(201);
}

export async function getParticipants(req, res){
    try{
        const users = await participantsCollections.find({}).toArray();
        res.send(users)

    }catch(err){
        res.send(err)
    }
}

export async function getMessages(req, res){

    let messages;

    try{
         messages = await messagesCollections.find({}).toArray()

    }catch(err){
        return res.status(500).send(err)
    }

    res.send(messages)
}