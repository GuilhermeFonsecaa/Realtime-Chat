import { Button } from "@/components/ui/button";
import { useChatStore } from "@/store";
import { CircleX } from "lucide-react";

const ChatHeader = () => {
    const { closeChat } = useChatStore();

    return (
        <div className="h-[10vh] border-b-2 border-[#2f303b] flex items-center justify-between">
            <div className="flex gap-5 items-center">
                <div className="flex gap-3 items-center justify-center">
                    <div className="flex items-center justify-center gap-5">
                        <Button className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all bg-transparent hover:bg-transparent">
                            <CircleX className="text-3xl" onClick={closeChat}/>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChatHeader;