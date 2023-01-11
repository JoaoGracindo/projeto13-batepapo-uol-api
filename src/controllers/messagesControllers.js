import { messagesCollections, participantsCollections } from "../database/db.js";
import dayjs from "dayjs";
import { stripHtml } from "string-strip-html";
import { ObjectId } from "mongodb";

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

    const {to, text, type} = req.body;
    const from = req.headers.user;

    const cleanInfo = {
        to: stripHtml(to).result,
        text: stripHtml(text).result,
        type: stripHtml(type).result,
        from: stripHtml(from).result
    }

    const message = {...cleanInfo, time: dayjs(now).format('HH:MM:SS') };


    try{
        await messagesCollections.insertOne(message)
    }catch(err){
        return res.send(err)
    }

    return res.sendStatus(201);
}

export async function deleteMessages(req, res){
    const user = req.headers.user;
    const {id} = req.params;

    try{
        const userIsValid = await participantsCollections.findOne({name: user});
        const idIsValid = await messagesCollections.findOne({_id: new ObjectId(id)});
    
        if(!idIsValid || !userIsValid) return res.sendStatus(404);
        if(userIsValid.name !== idIsValid.from) return res.sendStatus(401);

        await messagesCollections.deleteOne(idIsValid)

        return res.sendStatus(200)

    }catch(err){
        console.log(err)
        return res.status(500).send(err)
    }
    
}


export async function updateMessage(req, res){
    const {id} = req.params;
    const {to, text, type} = req.body;
    const from = req.headers.user;

    const messageBody = {
        to: stripHtml(to).result,
        text: stripHtml(text).result,
        type: stripHtml(type).result,
        from: stripHtml(from).result
    }



    try{
        const validId = await messagesCollections.findOne({_id: new ObjectId(id)});
        const isSameUser = validId.from === from;

        if(!validId) return res.sendStatus(404);
        if(!isSameUser) return res.sendStatus(401);

        await messagesCollections.updateOne({_id: new ObjectId(id)},{$set: messageBody});

    }catch(err){
        console.log(err)
        return res.status(500).send(err);
    }

    return res.sendStatus(201);
}