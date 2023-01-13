import { messagesCollections, participantsCollections } from "../database/db.js";
import dayjs from "dayjs";

const now = Date.now()

export async function postStatus(req, res){

    const {user} = req.headers;
    let userIsValid;
    const updateExpression = {$set: {lastStatus: Date.now()}};

    try{
        userIsValid = await participantsCollections.findOne({name: user});

    }catch(err){
        return res.send(err);
    }

    console.log(userIsValid);

    if(!userIsValid) return res.status(404).send("User not found");

    await participantsCollections.updateOne({name: user}, updateExpression);

    res.sendStatus(200);

}

export async function inactiveUsersRemoval(){
    let inactiveUsers;
    const messageTemplate = {to: 'Todos', text: 'sai da sala...', type: 'status', time: dayjs().format('HH:mm:ss')};
    const query = {lastStatus: {$lt: Date.now() - 10000}};

    try{
        inactiveUsers = await participantsCollections.find(query).toArray();
        const statusMessage = inactiveUsers.map(obj => {
            const updateMessage = {...messageTemplate,from:obj.name};
            return updateMessage;
        })
        if(statusMessage.length !== 0){
            await messagesCollections.insertMany(statusMessage);
            await participantsCollections.deleteMany(query);
        }


    }catch(err){
        return console.log(err);
    }

}