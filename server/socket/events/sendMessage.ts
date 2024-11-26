import mongoose from "mongoose";
import Message from "../../models/MessagesModel";
import { Server as SocketIOServer } from "socket.io"

export interface sendMessageProps {
    sender: mongoose.Schema.Types.ObjectId, //user.id de sender
    recipient: mongoose.Schema.Types.ObjectId,// user.id de recipient
    content: string
}

export const sendMessage = async (message: sendMessageProps, userSocketMap: Map<any, any>, io: SocketIOServer) => {
    //Procura o socketId associado ao message.sender e message.recipient, pois os dois são o user.id
    const senderSocketId = userSocketMap.get(message.sender);
    const recipientSocketId = userSocketMap.get(message.recipient);

    const createdMessage = await Message.create(message);

    const messageData = await Message.findById(createdMessage._id)
        .populate("sender", "id email firstName lastName image color") //"sender" para identificar o campo de referência no model e popula o campo com os dados inseridos
        .populate("recipient", "id email firstName lastName image color"); //"recipient" para identificar o campo de referência no model e popula o campo com os dados inseridos

    //verifica se está conectado e usa o to para selecionar o socket e envia um evento recieveMessage com os dados da mensagem
    if (recipientSocketId) {
        io.to(recipientSocketId).emit("recieveMessage", messageData)
    }
    if (senderSocketId) {
        io.to(senderSocketId).emit("recieveMessage", messageData)
    }
};