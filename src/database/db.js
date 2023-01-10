import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config()

const mongoClient = new MongoClient(process.env.DATABASE_URL);
await mongoClient.connect();
const db = mongoClient.db();
const participantsCollections = db.collection("participants");
const messagesCollections = db.collection("messages");

export {participantsCollections, messagesCollections}