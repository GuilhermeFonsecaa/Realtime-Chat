import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { UserRoundPlus } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import Lottie from "react-lottie";
import { animationDefaultOptions, getColor } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { HOST } from "@/utils/constants";
import { useChatStore } from "@/store";
import { useMutation } from "@tanstack/react-query";
import { searchContacts } from "@/hooks/searchContacts";
import { toast } from "sonner";
import { useState } from "react";
import { SelectedChatDataProps } from "@/store/slice/chat-slice";


const PrivateConversations = () => {
    const { setSelectedChatType, setSelectedChatData } = useChatStore();
    const [search, setSearch] = useState<string>("")
    const [searchedContacts, setSearchedContacts] = useState<SelectedChatDataProps[]>([]);
    const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(null);
    const [openDialog, setOpenDialog] = useState<boolean>(false)

    const mutationSearchContacts = useMutation({
        mutationFn: searchContacts,
        onSuccess: (data) => {
            setSearchedContacts(data.contacts);
        },
        onError: (error: any) => {
            if (error.response && error.response.data) {
                toast.error(error.response.data);
            }
        }
    })

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearch(value);
        if (debounceTimeout) clearTimeout(debounceTimeout);
        // Define um novo timeout para buscar após um atraso
        const newTimeout = setTimeout(() => {
            mutationSearchContacts.mutate(value);
        }, 1000); // Aguarda 1s após o último caractere digitado

        setDebounceTimeout(newTimeout);
    }

    const selectNewContact = (contact: SelectedChatDataProps) => {
        setOpenDialog(false);
        setSearchedContacts([]);
        setSelectedChatType("contact");
        setSelectedChatData(contact);
    }

    return (
        <div>
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogTrigger>

                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <UserRoundPlus className="cursor-pointer text-neutral-400 font-light text-start hover:text-neutral-100 transition-all duration-300" size={20} />
                            </TooltipTrigger>
                            <TooltipContent className="bg-orange-500 text-white">
                                Selecione um novo contato
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                </DialogTrigger>
                <DialogContent className="bg-[#181920] border-none text-white md:w-[400px] md:h-[400px] lg:w-[400px] lg:h-[400px] xl:w-[500px] xl:h-[500px] 2xl:min-w-[650px] 2xl:h-[650px] flex flex-col gap-8">
                    <DialogHeader>
                        <DialogTitle>Selecione um contato</DialogTitle>
                        <DialogDescription>
                            Para iniciar uma conversa, selecione o contato desejado
                        </DialogDescription>
                    </DialogHeader>
                    <Input placeholder="Pesquise Contatos" className="bg-[#2c2e3b] border-none rounded-lg p-6" onChange={(e) => handleSearchChange(e)} />
                    <ScrollArea>
                        <div className="flex flex-col gap-5">
                            {searchedContacts.map((contact) => (
                                <div key={contact._id} className="flex gap-3 items-center cursor-pointer" onClick={() => selectNewContact(contact)}>
                                    <div className="w-12 h-12 relative">
                                        <Avatar className="h-12 w-12 rounded-full overflow-hidden">
                                            {contact?.image ?
                                                <AvatarImage src={`${HOST}/${contact.image}`} alt="profile" className="object-cover w-full h-full" /> :
                                                <div className={`flex items-center justify-center uppercase h-12 w-12 text-lg border-[1px] rounded-full ${getColor(contact?.color ?? 0)}`}>
                                                    {contact?.firstName?.split("").shift()}
                                                </div>
                                            }
                                        </Avatar>
                                    </div>
                                    <div className="flex flex-col">
                                        <span>{contact.firstName} {contact.lastName}</span>
                                        <span className="text-sm">{contact.email}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                    {searchedContacts.length <= 0 && (
                        <div className="flex-1 md:flex flex-col justify-center items-center hidden duration-1000 transition-all">
                            <Lottie isClickToPauseDisabled={true} height={150} width={150} options={animationDefaultOptions} />
                            <div className="text-opacity-80 text-white flex flex-col gap-5 items-center md:text-base lg:text-xl xl:text-2xl mt-5 transition-all duration-300 text-center">
                                <h3 className="poppins-medium">
                                    Olá <span className="text-orange-500">!</span> Pesquise um novo <span className="text-orange-500">Contato.</span>
                                </h3>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

        </div>
    );
}

export default PrivateConversations;