import { Router } from "express";
import { getMessages } from "../controllers/MessagesController/getMessages";
import { verifyToken } from "../middlewares/AuthMiddleware/verifyToken"

const messagesRoutes = Router();

messagesRoutes.post("/get-messages", verifyToken, getMessages);

export default messagesRoutes;