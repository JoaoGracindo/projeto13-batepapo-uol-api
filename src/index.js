import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config()

import { signUp, getParticipants, getMessages } from "./controllers/participantsController.js";
import { userSchema } from "./middlewares/userSchema.js";

const app = express();
app.use(json())
app.use(cors())

app.get("/participants", getParticipants)
app.post("/participants", signUp)
app.get("/messages", getMessages)


app.listen(process.env.SERVER_URI, () => console.log("Server is listening..."))