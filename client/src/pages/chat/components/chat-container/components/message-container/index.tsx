import { getMessages } from "@/hooks/getMessages";
import { useAuthStore, useChatStore } from "@/store";
import { Message } from "@/store/slice/chat-slice";
import { HOST } from "@/utils/constants";
import { useQuery } from "@tanstack/react-query";
import { ArrowDown, Folder, LoaderCircle } from "lucide-react";
import moment from "moment";
import 'moment/locale/pt-br';
import { useEffect } from "react";

interface ApiResponse {
    messages: Message[];
}

const MessageContainer = () => {
    const { selectedChatType, selectedChatData, selectedChatMessages, setSelectedChatMessages } = useChatStore();
    const { userInfo } = useAuthStore();
    const { data, isLoading, isSuccess } = useQuery<ApiResponse>({
        queryKey: ["get-messages", selectedChatData?._id],
        queryFn: selectedChatData?._id ? () => getMessages(selectedChatData?._id) : undefined,
        retry: false
    });

    useEffect(() => {
        if (isSuccess && data && Array.isArray(data.messages)) {
            setSelectedChatMessages(data.messages); // Atualiza o estado com as mensagens
        }
    }, [isSuccess, data, setSelectedChatMessages, selectedChatData?._id]);

    let lastDisplayedDate: Date | null = null;

    const checkIfImage = (filePath: string) => {
        const imageRegex = /\.(jpg|jpeg|png|bmp|tiff|tif|webp|svg|ico|heic|heif)$/i;
        return imageRegex.test(filePath)
    }

    const downloadFile = (file: File) => {

    }

    if (isLoading) return <div>Carregando <LoaderCircle className="animate-spin" /></div>;


    return (
        <div className="flex-1 overflow-y-auto p-4 px-8 md:w-[65vw] lg:w-[70vw] xl:w-[77vw] w-full">
            <div>
                {selectedChatMessages.length > 0 && (
                    selectedChatMessages.map((message: Message) => {
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

                                        {message.messageType === "file" && (
                                            <div className={`${message.sender !== selectedChatData?._id ? "text-white border-orange-500" : "bg-[#2a2b33]/5 text-white/80 border-[#fffff]/20"} border inline-block p-4 rounded my-1 max-w-[50%] break-words`}>
                                                {checkIfImage(message.fileUrl || "") ? (
                                                    <div className="cursor-pointer">
                                                        <img src={`${HOST}/${message.fileUrl}`} height={300} width={300} />
                                                    </div>
                                                )
                                                    : (
                                                        <div className="flex items-center justify-center gap-4">
                                                            <span className="text-white/80 text-3xl bg-black/20 rounded-full p-2">
                                                                <Folder size={19}/>
                                                            </span>
                                                            <span className="text-sm">{message?.fileUrl?.split("/").pop()}</span>
                                                            <span className="bg-black/20 p-2 text-2xl rounded-full hover:bg-black/50 cursor-pointer transition-all duration-300" onClick={() => downloadFile}>
                                                                <ArrowDown size={19}/>
                                                            </span>
                                                        </div>
                                                    )}
                                            </div>
                                        )}


                                        <div className="text-xs text-gray-600">
                                            {moment(message.timestamp).format("HH:mm")}
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })
                )}
            </div>
        </div>

    );
}

export default MessageContainer;