import { messagesCollections } from "../database/db.js";
import dayjs from "dayjs";

const now = Date.now()

export async function getMessages(req, res){
    const {user} = req.headers;
    const {limit} = req.query
    let messages;

    try{
         messages = await messagesCollections.find({}).toArray()

    }catch(err){
        return res.status(500).send(err)
    }

    const filteredMessages = messages.filter((item) => item.to === "Todos" || item.to === user);

    if(limit) return res.send(filteredMessages.slice(-limit).reverse());

    res.send(filteredMessages.reverse());
}

export async function postMessages(req, res){

    const messageInformation = req.body;
    const from = req.headers.user;

    const message = {...messageInformation, from, time: dayjs(now).format('HH:MM:SS') }

    try{
        await messagesCollections.insertOne(message)
    }catch(err){
        return res.send(err)
    }

    return res.sendStatus(201);
}