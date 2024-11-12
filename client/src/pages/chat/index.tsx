import { useAuthStore, useChatStore } from "@/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import ContactsContainer from "./components/contacts-container";
import EmptyChatContainer from "./components/empty-chat-container";
import ChatContainer from "./components/chat-container";

const Chat = () => {
    const { userInfo } = useAuthStore();
    const { selectedChatType } = useChatStore();
    const navigate = useNavigate();

    useEffect(() => {
        if (!userInfo?.profileSetup) {
            toast.info("Por favor, configure seu perfil para continuar");
            navigate("/profile")
        }
    }, [userInfo, navigate])

    return (
        <div className="flex w-full h-screen text-white overflow-hidden">
            <ContactsContainer />
            
            {/*se foi selecionado algum tipo de chat abrir ele se não deixa o componente de emptychatcontainer */}
            {selectedChatType === undefined ? (
                <EmptyChatContainer />
            )
                :
                (
                    <ChatContainer />
                )
            }
        </div>
    );
}

export default Chat;