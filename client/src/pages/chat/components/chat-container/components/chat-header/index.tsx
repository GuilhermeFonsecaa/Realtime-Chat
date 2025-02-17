import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getColor } from "@/lib/utils";
import { useChatStore } from "@/store";
import { HOST } from "@/utils/constants";
import { CircleX } from "lucide-react";

const ChatHeader = () => {
    const { closeChat, selectedChatData, selectedChatType } = useChatStore();

    return (
        <div className="h-[12vh] border-b-2 border-[#2f303b] flex items-center">
            <div className="flex gap-5 items-center w-full justify-between mx-10">
                <div className="flex gap-3 items-center justify-center">
                    <div className="w-12 h-12 relative">
                        {selectedChatType === "contact" ?
                            <Avatar className="h-12 w-12 rounded-full overflow-hidden">
                                {selectedChatData?.image ?
                                    <AvatarImage src={`${HOST}/${selectedChatData.image}`} alt="profile" className="object-cover w-full h-full" />
                                    :
                                    <div className={`flex items-center justify-center uppercase h-12 w-12 text-lg border-[1px] rounded-full ${getColor(selectedChatData?.color ?? 0)}`}>
                                        {selectedChatData?.firstName ? selectedChatData?.firstName?.split("").shift() : selectedChatData?.email.split("").shift()}
                                    </div>
                                }
                            </Avatar>
                            :
                            (
                                <div className="bg-[#ffffff22] h-10 w-10 flex items-center justify-center rounded-full"> # </div>
                            )
                        }
                    </div>
                
                    <div className="flex mb-1.5">
                        {selectedChatType === "channel" && selectedChatData?.firstName}
                    </div>

                    <div>
                        {selectedChatType === "contact" && selectedChatData?.firstName ? `${selectedChatData?.firstName}  ${selectedChatData?.lastName}` : selectedChatData?.email}
                    </div>
                </div>
                <div className="flex items-center justify-center gap-5">
                    <Button className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all bg-transparent hover:bg-transparent">
                        <CircleX className="text-3xl" onClick={closeChat} />
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default ChatHeader;