import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config()

import { signUp, getParticipants } from "./controllers/participantsController.js";
import { getMessages, postMessages, deleteMessages } from "./controllers/messagesControllers.js";
import { userValidation } from "./middlewares/userMiddleware.js";
import { messageValidation } from "./middlewares/messageMiddleware.js";
import { postStatus, inactiveUsersRemoval } from "./controllers/statusController.js";

const app = express();
app.use(json());
app.use(cors());

app.get("/participants", getParticipants);
app.post("/participants", userValidation, signUp);

app.get("/messages", getMessages);
app.post("/messages", messageValidation, postMessages);
app.delete("/messages/:id", deleteMessages)

app.post("/status", postStatus);

setInterval(inactiveUsersRemoval, 60000);

app.listen(process.env.SERVER_URI, () => console.log("Server is listening..."))