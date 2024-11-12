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

const MessageBar = () => {
    const [message, setMessage] = useState<string>("")

    const handleAddEmoji = (emoji: { emoji: string }) => {
        setMessage((msg) => msg + emoji.emoji)
    }

    const handleMessage = () => {

    }

    return (
        <div className="h-[10vh] bg-[rgb(28,29,37)] flex justify-center items-center px-8 mb-6 gap-6">

            <div className="flex-1 flex bg-[#2a2b33] rounded-md items-center gap-5 ">
                <Input type="text" className="flex-1 p-10 bg-transparent rounded-md focus:border-none focus:outline-none border-none" placeholder="Mensagem..." value={message} onChange={(e) => setMessage(e.target.value)} />
                <Button className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all bg-transparent hover:bg-transparent">
                    <Paperclip className="text-orange-400" size={23} />
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
        </div>
    );
}

export default MessageBar;