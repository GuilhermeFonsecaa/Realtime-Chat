
import mongoose from "mongoose";
import Message from "../../models/MessagesModel";
import Channel from "../../models/ChannelModel";
import { Server as SocketIOServer } from "socket.io"

export interface sendMessageProps {
    channelId: string;
    sender: mongoose.Schema.Types.ObjectId; //user.id de sender
    content: string;
    messageType: string;
    fileUrl: string | undefined
}

export const sendChannelMessage = async (message: sendMessageProps, userSocketMap: Map<any, any>, io: SocketIOServer) => {
    const { channelId, sender, content, messageType, fileUrl } = message;

    const createdMessage = await Message.create({
        sender,
        recipient: null,
        content,
        messageType,
        timestamp: new Date(),
        fileUrl
    });

    const messageData = await Message.findById(createdMessage._id).populate("sender", "id email firstName lastName image color").exec(); //"sender" para identificar o campo de referência no model e popula o campo com os dados inseridos

    await Channel.findByIdAndUpdate(channelId, {
        $push: { messages: createdMessage._id }
    }); //insere o id da nova mensagem no array de messages do canal

    const channel = await Channel.findById(channelId).populate("members"); //Busca o canal e substitui os IDs dos membros (members) pelos documentos completos dos usuários.

    const finalData = { ...messageData?.toObject(), channelId: channelId };

    if (channel && channel.members) {
        channel.members.forEach((member) => {
            const memberSocketId = userSocketMap.get(member._id.toString());
            if (memberSocketId) {
                io.to(memberSocketId).emit("recieve-channel-message", finalData)
            }
            const adminSocketId = userSocketMap.get(channel.admin._id.toString());
            if (adminSocketId) {
                io.to(adminSocketId).emit("recieve-channel-message", finalData);
            }
        })
    }

};