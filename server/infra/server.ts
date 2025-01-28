import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
import connectDatabase from "./database"
import authRoutes from "../routes/AuthRoutes"
import contactsRoutes from "../routes/ContactsRoute"
import setupSocket from "../socket/socket"
import messagesRoutes from "../routes/MessagesRoutes"

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const databaseURL = process.env.DATABASE_URL;

app.use(cors({
    origin: [process.env.ORIGIN as string],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true
}))

app.use(cookieParser())
app.use(express.json())
app.use("/uploads/profiles", express.static("uploads/profiles")); //disponibiliza arquivos estáticos na rota
app.use("/uploads/files", express.static("uploads/files")) //disponibiliza arquivos estáticos na rota

app.use("/api/auth", authRoutes)
app.use("/api/contacts", contactsRoutes)
app.use("/api/messages", messagesRoutes)

if (!databaseURL) {
    throw new Error("DATABASE_URL não está definido");
}

connectDatabase(databaseURL);

const server = app.listen(port, () => {
    console.log("Server rodando");
})

setupSocket(server)

