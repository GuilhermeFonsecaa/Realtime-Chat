import { Socket } from "socket.io";

export const disconnect = (socket: Socket, userSocketMap: Map<string, string>) => {
    //recebe o socket.id desconectado e percorre o map buscando o socketId que está em userSocketMap que é igual ao socket.id desconectado, após encontrar deleta o userId associado ao socketId
    for (const [userId, socketId] of userSocketMap.entries()) {
        if (socketId === socket.id) {
            userSocketMap.delete(userId)
            break;
        }
    }
    console.log(`Cliente desconectado: ${socket.id}`);
};
