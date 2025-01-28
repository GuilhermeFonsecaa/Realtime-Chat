import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Paperclip, SendHorizonal, SmilePlus } from "lucide-react";
import { useRef, useState } from "react";
import EmojiPicker, { Theme } from "emoji-picker-react"
import { useAuthStore, useChatStore } from "@/store";
import { useSocket } from "@/context/SocketContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UploadFile } from "@/hooks/uploadFile";
import { toast } from "sonner";

const MessageBar = () => {
    const [message, setMessage] = useState<string>("");
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { selectedChatType, selectedChatData } = useChatStore();
    const { userInfo } = useAuthStore();
    const socket = useSocket()
    const queryClient = useQueryClient();

    const handleAddEmoji = (emoji: { emoji: string }) => {
        setMessage((msg) => msg + emoji.emoji)
    }

    const handleMessage = () => {
        if (selectedChatType === "contact" && selectedChatData && userInfo) {
            socket?.emit("sendMessage", {
                sender: userInfo.id,
                content: message,
                recipient: selectedChatData?._id,
                messageType: "text",
                fileUrl: undefined
            })
            setMessage("");
            queryClient.invalidateQueries({ queryKey: ["get-contacts"] });
        };
    };

    const handleAttachementClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    }

    const mutationUploadFile = useMutation({
        mutationFn: UploadFile,
        onSuccess: (response) => {
            if (response?.status === 200 && response.data) {
                if (selectedChatType === "contact" && selectedChatData && userInfo) {
                    socket?.emit("sendMessage", {
                        sender: userInfo.id,
                        content: undefined,
                        recipient: selectedChatData?._id,
                        messageType: "file",
                        fileUrl: response.data.filePath,
                    });
                    queryClient.invalidateQueries({ queryKey: ["get-contacts"] });
                };
                toast.success("Arquivo carregado com sucesso", { className: "bg-orange-500 text-white" });
            }
        },
        onError: (error: any) => {
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            }
        }
    })

    const handleAttachementChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        console.log(file)
        if (file) {
            mutationUploadFile.mutate(file)
        }
    }

    return (
        <div className="h-[10vh] bg-[rgb(28,29,37)] flex justify-center items-center px-8 mb-6 gap-6" >

            <div className="flex-1 flex bg-[#2a2b33] rounded-md items-center gap-5 ">
                <Input type="text" className="flex-1 p-10 bg-transparent rounded-md focus:border-none focus:outline-none border-none" placeholder="Mensagem..." value={message} onChange={(e) => setMessage(e.target.value.trimStart())} required />
                <Button className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all bg-transparent hover:bg-transparent" onClick={handleAttachementClick}>
                    <Paperclip className="text-orange-400" size={23} />
                    <Input type="file" className="hidden" ref={fileInputRef} onChange={handleAttachementChange} />
                </Button>
                <div className="relative flex">
                    <Popover>
                        <PopoverTrigger>
                            <Button className="text-neutral-500 focus:border-none focus:outline-none focus:text-orange-500 duration-300 transition-all bg-transparent hover:bg-transparent">
                                <SmilePlus className="text-orange-400" size={20} />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="bg-transparent border-none w-full mr-3">
                            <EmojiPicker width={300} theme={Theme.DARK} onEmojiClick={handleAddEmoji} autoFocusSearch={false}></EmojiPicker>
                        </PopoverContent>
                    </Popover>


                    <div className="absolute bottom-16 right-0"></div>
                </div>
            </div>

            <div className="relative">
                <Button className="flex items-center p-5 justify-center bg-orange-500 rounded-md focus:border-none focus:outline-none focus:text-white focus:bg-orange-700 hover:bg-orange-700 duration-300 transition-all" onClick={handleMessage}>
                    <SendHorizonal size={20} />
                </Button>
            </div>
        </div >
    );
}

export default MessageBar;