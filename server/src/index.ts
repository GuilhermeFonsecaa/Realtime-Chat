import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
import mongoose from "mongoose"

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

const server = app.listen(port, () => {
    console.log("Server rodando");
})

if (!databaseURL) {
    throw new Error("DATABASE_URL não está definido");
}

mongoose.connect(databaseURL).then(() => console.log("Conectado ao banco de dados")).catch(error => console.log(error.message))