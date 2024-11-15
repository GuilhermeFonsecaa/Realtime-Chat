import { Socket, Server as SocketIOServer } from "socket.io"
import { Server as HTTPServer } from "http"

//cria instancia do socketIoServer
const setupSocket = (server: HTTPServer) => {
    const io = new SocketIOServer(server, {
        cors: {
            origin: process.env.ORIGIN,
            methods: ["GET", "POST"],
            credentials: true
        },
    });

    const userSocketMap = new Map(); //map para associar userId aos sockets.id, permitindo encontrar o socket associado ao usuário

    const disconnect = (socket: Socket) => {
        console.log(`Cliente disconectado: ${socket.id}`);
        //percorre o map buscando o socket.id desconectado, dps de encontrar deleta o userId associado
        for (const [userId, socketId] of userSocketMap.entries()) {
            if (socketId === socket.id) {
                userSocketMap.delete(userId)
                break;
            }
        }
    }

    io.on("connection", (socket) => {
        const userId = socket.handshake.query.userId //userIds são passados pelo cliente para a conexão WebSocket

        //se userId foi enviado armazena em userSocketMap
        if (userId) {
            userSocketMap.set(userId, socket.id);
            console.log(`Usuário conectado: ${userId} com socket ID : ${socket.id}`)
        }
        else {
            console.log("User ID não fornecido durante a conexão")
        }

        //quando um cliente se desconecta é removido do userSocketMap 
        socket.on("disconnect", () => disconnect(socket))
    })
}

export default setupSocket;