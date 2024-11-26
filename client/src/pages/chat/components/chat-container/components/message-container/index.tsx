import { useAuthStore, useChatStore } from "@/store";
import { Message } from "@/store/slice/chat-slice";
import moment from "moment";
import 'moment/locale/pt-br';

const MessageContainer = () => {
    const { selectedChatType, selectedChatData, selectedChatMessages } = useChatStore();
    const { userInfo } = useAuthStore();
    let lastDisplayedDate: Date | null = null;

    return (
        <div className="flex-1 overflow-y-auto p-4 px-8 md:w-[65vw] lg:w-[70vw] xl:w-[77vw] w-full">
            <div>
                {selectedChatMessages.map((message: Message) => {
                    const messageDate = message.timestamp;

                    const showDate = message.timestamp !== null && messageDate !== lastDisplayedDate;

                    if (showDate) {
                        lastDisplayedDate = messageDate;
                    }

                    return (
                        <div key={message._id}>
                            {showDate && (
                                <div className="text-center text-gray-500 my-2">
                                    {moment(messageDate).format("D [de] MMMM [de] YYYY")}
                                </div>
                            )}

                            {selectedChatType === "contact" && (
                                <div className={message.sender === selectedChatData?._id ? "text-left" : "text-right"}>
                                    {message.messageType === "text" && (
                                        <div className={`${message.sender !== selectedChatData?._id ? "bg-orange-500 text-white border-orange-700" : "bg-[#2a2b33]/5 text-white/80 border-[#fffff]/20"} border inline-block p-4 rounded my-1 max-w-[50%] break-words`}>
                                            {message.content}
                                        </div>
                                    )}
                                    <div className="text-xs text-gray-600">
                                        {moment(message.timestamp).format("HH:mm")}
                                    </div>
                                </div>
                            )}
                        </div>
                    )
                }
                )
                }
            </div>
        </div>
    );
}

export default MessageContainer;