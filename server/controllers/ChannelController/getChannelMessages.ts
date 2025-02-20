import { Request, Response } from "express"
import Channel from "../../models/ChannelModel"

export const getChannelMessages = async (request: Request, response: Response) => {
    try {
        const { channelId } = request.params;
        const channel = await Channel.findById(channelId).populate({ path: "messages", populate: { path: "sender", select: "firstName lastName email _id image color" } }); //channel é populado com as mensagens e para cada mensagem o campo sender é populado
        if (!channel) {
            response.status(404).send("Grupo não encontrado");
        }
        else {
            const messages = channel.messages;
            response.status(201).json({ messages });
        }
    }
    catch (error) {
        response.status(500).send("Internal Server Error");
    }
}