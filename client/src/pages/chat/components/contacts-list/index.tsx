import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { getColor } from "@/lib/utils";
import { useChatStore } from "@/store";
import { HOST } from "@/utils/constants";

interface ContactsListProps {
    contacts: {
        _id: string,
        color: number,
        email: string,
        image: string,
        firstName: string,
        lastName: string,
    }[]
    isChannel: boolean
}

interface ContactProps {
    _id: string,
    color: number,
    image: string,
    email: string,
    firstName: string,
    lastName: string,
}

const ContactsList = ({ contacts, isChannel }: ContactsListProps) => {
    const { selectedChatData, setSelectedChatData, setSelectedChatType, selectedChatType, setSelectedChatMessages } = useChatStore();

    const handleClick = (contact: ContactProps) => {
        if (isChannel) {
            setSelectedChatType("channel");
            setSelectedChatData(contact)
        }
        else {
            setSelectedChatType("contact")
            setSelectedChatData(contact)
            if (selectedChatData && selectedChatData._id !== contact._id) {
                setSelectedChatMessages([])
            }
        }
    }

    return (
        <div className="mt-5">
            {Array.isArray(contacts) ? (
                contacts.map((contact: ContactProps) => (
                    <div key={contact._id} className={`pl-10 py-2 transition-all duration-300 cursor-pointer ${selectedChatData && selectedChatData._id === contact._id ? "bg-orange-700 hover:bg-orange-800" : "hover:bg-[#f1f1f111]"}`} onClick={() => handleClick(contact)}>
                        <div className="flex gap-5 items-center justify-start text-neutral-300">
                            {!isChannel &&
                                <Avatar className="w-10 h-10 rounded-full overflow-hidden">
                                    {contact.image ? (
                                        <AvatarImage src={`${HOST}/${contact.image}`} alt="profile" className="object-cover w-full bg-black" />
                                    ) : (
                                        <div className={`${selectedChatData && selectedChatData._id === contact._id ? "bg-[ffffff22] border border-white/70" : getColor(contact.color)} uppercase h-10 w-10 text-lg border-[1px] flex items-center justify-center rounded-full ${getColor(contact.color)}`}>
                                            {contact.firstName ? contact.firstName.split("").shift() : contact.email.split("").shift()}
                                        </div>
                                    )}
                                </Avatar>}
                            {isChannel &&
                                (
                                    <div className="bg-[#ffffff22] h-10 w-10 flex items-center justify-center rounded-full">
                                        #
                                    </div>
                                )
                            }

                            {
                                isChannel ? (
                                    <span>{contact.firstName}</span>) : (<span>{`${contact.firstName} ${contact.lastName}`}</span>

                                )
                            }
                        </div>
                    </div>
                ))
            ) : (
                <p  className="flex items-center justify-start">Nenhum resultado.</p>
            )}
        </div>
    );
};

export default ContactsList;