import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { downloadFileHook } from "@/hooks/downloadFile";
import { getChannelMessages } from "@/hooks/getChannelMessages";
import { getMessages } from "@/hooks/getMessages";
import { getColor } from "@/lib/utils";
import { useAuthStore, useChatStore } from "@/store";
import { Message } from "@/store/slice/chat-slice";
import { HOST } from "@/utils/constants";
import { useQuery } from "@tanstack/react-query";
import { ArrowDown, Folder, LoaderCircle, X } from "lucide-react";
import moment from "moment";
import 'moment/locale/pt-br';
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface ApiResponse {
    messages: Message[];
}

const MessageContainer = () => {
    const { selectedChatType, selectedChatData, selectedChatMessages, setSelectedChatMessages } = useChatStore();
    const { userInfo } = useAuthStore();
    const [fileUrl, setFileUrl] = useState<string | undefined>(undefined);
    const [showImage, setShowImage] = useState<boolean>(false);
    const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
    const [showProgress, setShowProgress] = useState<boolean>(false);
    const [downloadKey, setDownloadKey] = useState(0);  // Contador para forçar a reexecução da query
    const [progress, setProgress] = useState<number>(0);
    let lastDisplayedDate: Date | null = null;

    const { data, isLoading, isSuccess } = useQuery<ApiResponse>({
        queryKey: ["get-messages", selectedChatData?._id],
        queryFn: selectedChatData?._id && selectedChatType === "contact" ? () => getMessages(selectedChatData?._id) : undefined,
        retry: false
    });

    const { data: dataChannelMessages, isLoading: isLoadingChannelMessages, isSuccess: isSuccessChannelMessages } = useQuery<ApiResponse>({
        queryKey: ["get-messages-channel", selectedChatData?._id],
        queryFn: selectedChatData?._id && selectedChatType === "channel" ? () => getChannelMessages(selectedChatData?._id) : undefined,
        retry: false
    });

    const { data: dataDownload, isLoading: isLoadingDownload, isError: isErrorDownload, isSuccess: isSuccessDownload } = useQuery({
        queryKey: ["download-file", fileUrl, downloadKey],
        queryFn: () => fileUrl && downloadFileHook(fileUrl, (progress) => {
            setProgress(progress);
            if (progress === 100) {
                setTimeout(() => setShowProgress(false), 500);
                setTimeout(() => setProgress(0), 1000);
            }
        }),
        enabled: !!fileUrl,
        retry: false,
    });

    useEffect(() => {
        if (isSuccess && data && Array.isArray(data.messages) && selectedChatType==="contact") {
            setSelectedChatMessages(data.messages);
        }
    }, [isSuccess, data, setSelectedChatMessages, selectedChatData?._id]);

    useEffect(() => {
        if (isSuccessChannelMessages && dataChannelMessages && Array.isArray(dataChannelMessages.messages) && selectedChatType==="channel") {
            setSelectedChatMessages(dataChannelMessages.messages);
        }
    }, [isSuccessChannelMessages, dataChannelMessages, setSelectedChatMessages, selectedChatData?._id]);

    const handleDownload = (url: string) => {
        setProgress(0);
        setShowProgress(true);
        setDownloadKey(prevKey => prevKey + 1);  // Forçar a reexecução da query
        setFileUrl(url);
    };
    const checkIfImage = (filePath: string) => {
        const imageRegex = /\.(jpg|jpeg|png|bmp|tiff|tif|webp|svg|ico|heic|heif)$/i;
        return imageRegex.test(filePath)
    }

    if (isLoadingDownload) {
        <div>Carregando <LoaderCircle className="animate-spin" /></div>
    }

    if (isSuccessDownload) {
        const urlBlob = window.URL.createObjectURL(dataDownload);
        const link = document.createElement("a");
        link.href = urlBlob;
        link.setAttribute("download", fileUrl?.split("/").pop() || "arquivo");
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(urlBlob);
        setFileUrl(undefined)
    }

    if (isErrorDownload) {
        toast.error("Error ao fazer download do arquivo")
    }

    if (isLoading) return <div>Carregando <LoaderCircle className="animate-spin" /></div>;

    if (isLoadingChannelMessages) {
        <div>Carregando <LoaderCircle className="animate-spin" /></div>
    }


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

                        const isSender = typeof message.sender === 'object' && '_id' in message.sender && message.sender._id === userInfo?.id;

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
                                                    <div className="cursor-pointer" onClick={() => {
                                                        if (message.fileUrl) {
                                                            setShowImage(true);
                                                            setImageUrl(message.fileUrl);
                                                        }
                                                    }}>
                                                        <img src={`${HOST}/${message.fileUrl}`} height={300} width={300} />
                                                    </div>
                                                )
                                                    : (
                                                        <div className="flex flex-col items-center justify-center">
                                                            <div className="flex items-center justify-center gap-4">
                                                                <span className="text-white/80 text-3xl bg-black/20 rounded-full p-2">
                                                                    <Folder size={19} />
                                                                </span>
                                                                <span className="text-sm">{message?.fileUrl?.split("/").pop()}</span>
                                                                <span className="bg-black/20 p-2 text-2xl rounded-full hover:bg-black/50 cursor-pointer transition-all duration-300" onClick={() => {
                                                                    setShowProgress(true);
                                                                    handleDownload(message.fileUrl || "");
                                                                }}>
                                                                    <ArrowDown size={19} />
                                                                </span>
                                                            </div>

                                                            {showProgress &&
                                                                <Progress className="h-5 w-full border border-emerald-500 mt-3" value={progress} />
                                                            }

                                                        </div>

                                                    )}
                                            </div>
                                        )}

                                        <div className="text-xs text-gray-600">
                                            {moment(message.timestamp).format("HH:mm")}
                                        </div>
                                    </div>
                                )}

                                {selectedChatType === "channel" && (
                                    <div className={`flex flex-col mt-5 gap-3 w-full  ${isSender && message.messageType === "text" ? "text-right" : "text-left"} ${isSender && message.messageType === "file" && "items-end"}`}>

                                        <div>
                                            {message.messageType === "text" && (
                                                <div className={`${isSender ? "bg-orange-500 text-white border-orange-700 text-center" : "text-center bg-[#2a2b33]/5 text-white/80 border-[#fffff]/20"} border inline-block p-4 rounded my-1 max-w-[50%] break-words`}>
                                                    {message.content}
                                                </div>
                                            )}
                                        </div>

                                        {message.messageType === "file" && (
                                            <div className={`${isSender ? "text-white border-orange-500 w-[20%]" : "bg-[#2a2b33]/5 text-white/80 border-[#fffff]/20"} border inline-block p-4 rounded my-1 w-[20%] max-w-[50%] break-words`}>
                                                {checkIfImage(message.fileUrl || "") ? (
                                                    <div className="cursor-pointer" onClick={() => {
                                                        if (message.fileUrl) {
                                                            setShowImage(true);
                                                            setImageUrl(message.fileUrl);
                                                        }
                                                    }}>
                                                        <img src={`${HOST}/${message.fileUrl}`} height={300} width={300} />
                                                    </div>
                                                )
                                                    : (
                                                        <div className="flex flex-col items-center justify-center">
                                                            <div className="flex items-center justify-center gap-4">
                                                                <span className="text-white/80 text-3xl bg-black/20 rounded-full p-2">
                                                                    <Folder size={19} />
                                                                </span>
                                                                <span className="text-sm">{message.fileUrl?.split("/").pop()}</span>
                                                                <span className="bg-black/20 p-2 text-2xl rounded-full hover:bg-black/50 cursor-pointer transition-all duration-300" onClick={() => {
                                                                    setShowProgress(true);
                                                                    handleDownload(message.fileUrl || "");
                                                                }}>
                                                                    <ArrowDown size={19} />
                                                                </span>
                                                            </div>

                                                            {showProgress &&
                                                                <Progress className="h-5 w-full border border-emerald-500 mt-3" value={progress} />
                                                            }

                                                        </div>

                                                    )}
                                            </div>
                                        )}

                                        {typeof message.sender === 'object' && '_id' in message.sender && message.sender._id !== userInfo?.id ?
                                            <div className="flex items-center justify-start gap-3">
                                                <Avatar className="h-8 w-8 rounded-full overflow-hidden">
                                                    {message.sender.image ?
                                                        <AvatarImage src={`${HOST}/${message.sender.image}`} alt="profile" className="object-cover w-full h-full" />
                                                        :
                                                        <div className={`flex items-center justify-center uppercase h-8 w-8 text-lg border-[1px] rounded-full ${getColor(message.sender.color ?? 0)}`}>
                                                            {message.sender.firstName ? message.sender.firstName.split("").shift() : message.sender.email.split("").shift()}
                                                        </div>
                                                    }
                                                </Avatar>
                                                <span className="text-sm text-white/60">{`${message.sender.firstName} ${message.sender.lastName}`}</span>
                                                <span className="text-xs text-white/60">{moment(message.timestamp).format("LT")}</span>
                                            </div>
                                            :
                                            <div className="text-xs text-white/60 mt-1">
                                                {moment(message.timestamp).format("LT")}
                                            </div>
                                        }
                                    </div>
                                )}
                            </div>
                        );
                    })
                )}
            </div>

            {showImage && (
                <div className="fixed z-[1000] top-0 left-0 h-screen w-screen flex flex-col items-center justify-center backdrop-blur-lg">
                    <div>
                        <img src={`${HOST}/${imageUrl}`} className="h-[80vh] w-full bg-cover" />
                    </div>

                    <div className="flex gap-5 fixed top-0 mt-5">
                        <Button type="button" className="bg-orange-500 h-12 w-12 text-2xl rounded-full hover:bg-orange-600 cursor-pointer transition-all duration-300" onClick={() => handleDownload(imageUrl || "")}>
                            <ArrowDown />
                        </Button>

                        <Button type="button" className="bg-orange-500 h-12 w-12 p-3 text-2xl rounded-full  hover:bg-orange-600 cursor-pointer transition-all duration-300" onClick={() => {
                            setImageUrl(undefined);
                            setShowImage(false);
                        }}>
                            <X size={20} />
                        </Button>
                    </div>
                </div>
            )}
        </div>

    );
}

export default MessageContainer;