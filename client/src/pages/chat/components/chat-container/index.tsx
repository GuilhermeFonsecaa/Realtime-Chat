import ChatHeader from "./components/chat-header";
import MessageBar from "./components/message-bar";
import MessageContainer from "./components/message-container";

const ChatContainer = () => {
    return (
        <div className="fixed top-0 h-screen w-screen bg-[#1c1d25] flex flex-col md:static md:flex-1">
            <ChatHeader />
            <MessageContainer />
            <MessageBar />
        </div>
    );
}

export default ChatContainer;