import { useAuthStore } from "@/store";
import { HOST } from "@/utils/constants";
import { createContext, useContext, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client"

const SocketContext = createContext<Socket | null>(null);

export const useSocket = () => {
    return useContext(SocketContext);
}

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
    const socket = useRef<Socket | null>(null);
    const { userInfo } = useAuthStore();

    useEffect(() => {
        if (userInfo) {
            //cria a conexão WebSocket com o servidor
            socket.current = io(HOST, {
                withCredentials: true,
                query: { userId: userInfo.id },
            });

            socket.current.on("connect", () => {
                console.log("Conectado ao servidor socket");
            });
            
            //função de limpeza, só será executada se userInfo mudar
            return () => {
                socket.current?.disconnect();
            }
        }
    }, [userInfo]);


    return (
        <SocketContext.Provider value={socket.current}>
            {children}
        </SocketContext.Provider>
    )

}
