import { Request, Response } from "express";
import Message from "../../../models/MessagesModel"

export const getMessages = async (request: Request, response: Response) => {
    try {
        const user1 = request.userId;
        const user2 = request.body.id;

        if (!user1 || !user2) {
            response.status(400).send("Ambos os ID´s dos usuários são obrigatória");
        }

        const messages = await Message.find({
            $or: [
                {
                    sender: user1, recipient: user2
                },
                {
                    sender: user2, recipient: user1
                }
            ]
        }).sort({ timestamp: 1 });
        response.status(200).json({ messages });
    }
    catch (error) {
        response.status(500).send("Internal Server Error")
    }
}