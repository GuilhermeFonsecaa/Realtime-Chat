import { Server as SocketIOServer } from "socket.io"
import { Server as HTTPServer } from "http"
import { sendMessage, sendMessageProps } from "./events/sendMessage"
import { sendChannelMessage, sendChannelMessageProps } from "./events/sendChannelMessage"
import { disconnect } from "./events/disconnect"

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

    //Para cada cliente conectado, o servidor cria um novo socket
    io.on("connection", (socket) => {
        const userId = socket.handshake.query.userId; //userIds são passados pelo cliente para a conexão WebSocket

        if (userId) {
            userSocketMap.set(userId, socket.id);
            console.log(`Usuário conectado: ${userId} com socket ID : ${socket.id}`);
        }
        else {
            console.log("User ID não fornecido durante a conexão");
        };

        socket.on("sendMessage", async (message: sendMessageProps) => {
            try {
                await sendMessage(message, userSocketMap, io);
            }
            catch (error) {
                console.log("Erro ao enviar a mensagem", error);
            };
        }
        );

        socket.on("send-channel-message", async (message: sendChannelMessageProps) => {
            try {
                await sendChannelMessage(message, userSocketMap, io);
            }
            catch (error) {
                console.log("Erro ao enviar a mensagem", error);
            };
        }
        );

        socket.on("disconnect", () => disconnect(socket, userSocketMap));  //quando um cliente se desconecta é removido do userSocketMap 
    });

}


export default setupSocket;