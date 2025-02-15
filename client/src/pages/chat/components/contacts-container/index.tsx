import { useQuery } from "@tanstack/react-query";
import Logo from "./components/logo";
import NavigationTitle from "./components/navigation-title";
import PrivateConversations from "./components/private-conversations";
import ProfileInfo from "./components/profile-info";
import { getContacts } from "@/hooks/getContacts";
import ContactsList from "../contacts-list";
import { LoaderCircle } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import CreateChannel from "./components/create-channel";
import { userChannels } from "@/hooks/userChannels";

const ContactsContainer = () => {

  const { data, isLoading } = useQuery({
    queryKey: ["get-contacts"],
    queryFn: getContacts,
  });

  const { data: dataUserChannels, isLoading: isLoadingUserChannels } = useQuery({
    queryKey: ["get-channels"],
    queryFn: userChannels
  })

  if (isLoading) {
    return <div><LoaderCircle className="animate-spin" /></div>;
  }

  if (isLoadingUserChannels) {
    return <div><LoaderCircle className="animate-spin" /></div>;
  }
  
  const adaptedChannels = dataUserChannels.channels.map((channel) => ({
    _id: channel._id,
    color: 0,
    email: "", // Não aplicável para canais
    image: "", // Não aplicável para canais
    firstName: channel.name, // Usar o nome do canal como firstName
    lastName: "", // Não aplicável para canais
  }));

  return (
    <div className="relative  bg-[#181920] border-r-2 border-[#2f303b]">
      <div className="md:w-[35vw] lg:w-[30vw] xl:w-[23vw]">
        <Logo />

        <div className="flex flex-col items-center my-5 justify-between">
          <div className="flex w-full items-center justify-between pr-10">
            <NavigationTitle text="Conversas Privadas" />
            <PrivateConversations />
          </div>
          <div className="max-h-[42vh]  w-full">
            <ScrollArea className="h-[33vh] w-full">
              <ContactsList contacts={data.contacts} isChannel={false} />
            </ScrollArea>
          </div>
        </div>

        <div className="flex items-center my-5 justify-between pr-10">
          <NavigationTitle text="Grupos" />
          <CreateChannel />
        </div>
        <div className="max-h-[42vh]  w-full">
          <ScrollArea className="h-[33vh] w-full">
            <ContactsList contacts={adaptedChannels} isChannel={true} />
          </ScrollArea>
        </div>
        <div>
          <ProfileInfo />
        </div>
      </div>
    </div>
  );
}

export default ContactsContainer;