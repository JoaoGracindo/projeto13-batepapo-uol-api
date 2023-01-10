import { messagesCollections } from "../database/db.js";

export async function getMessages(req, res){

    let messages;

    try{
         messages = await messagesCollections.find({}).toArray()

    }catch(err){
        return res.status(500).send(err)
    }

    res.send(messages)
}