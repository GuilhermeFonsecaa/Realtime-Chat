import { createContext, useContext, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useAuthStore, useChatStore } from "@/store";
import { HOST } from "@/utils/constants";
import { Message } from "@/store/slice/chat-slice";

const SocketContext = createContext<Socket | null>(null);

export const useSocket = () => {
    return useContext(SocketContext);
};

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const { userInfo } = useAuthStore();

    useEffect(() => {
        if (userInfo) {
            const newSocket = io(HOST, {
                withCredentials: true,
                query: { userId: userInfo.id },
            });
            setSocket(newSocket);

            newSocket.on("connect", () => {
                console.log("Conectado ao servidor socket");
            });

            const handleRecieveMessage = (message: Message) => {
                const { selectedChatData, selectedChatType, addMessage } = useChatStore.getState();
                const senderId = typeof message.sender === "object" && message.sender !== null && message.sender._id;
                const recipientId = typeof message.recipient === "object" && message.recipient !== null && message.recipient._id;

                if (
                    (selectedChatType !== undefined && selectedChatData && selectedChatData._id === senderId) ||
                    (selectedChatData && selectedChatData._id === recipientId)
                ) {
                    addMessage(message);
                }
            };

            const handleRecieveChannelMessage = (message: Message) => {
                const { selectedChatData, selectedChatType, addMessage } = useChatStore.getState();

                if (
                    (selectedChatType !== undefined && selectedChatData && selectedChatData._id === message.channelId)
                ) {
                    addMessage(message);
                }
            };

            newSocket.on("recieveMessage", handleRecieveMessage);
            newSocket.on("recieve-channel-message", handleRecieveChannelMessage);

            return () => {
                newSocket.disconnect();
                setSocket(null);
            };
        }
    }, [userInfo]);

    return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};
