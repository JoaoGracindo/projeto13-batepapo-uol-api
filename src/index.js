import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config()

import { signUp, getParticipants } from "./controllers/participantsController.js";
import { getMessages } from "./controllers/messagesControllers.js";
import { userValidation } from "./middlewares/userMiddleware.js";

const app = express();
app.use(json())
app.use(cors())

app.get("/participants", getParticipants)
app.post("/participants", userValidation, signUp)
app.get("/messages", getMessages)


app.listen(process.env.SERVER_URI, () => console.log("Server is listening..."))