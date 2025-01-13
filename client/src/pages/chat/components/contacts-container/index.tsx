import { useQuery } from "@tanstack/react-query";
import Logo from "./components/logo";
import NavigationTitle from "./components/navigation-title";
import PrivateConversations from "./components/private-conversations";
import ProfileInfo from "./components/profile-info";
import { getContacts } from "@/hooks/getContacts";
import ContactsList from "../contacts-list";
import { LoaderCircle } from "lucide-react";

const ContactsContainer = () => {

  const { data, isLoading } = useQuery({
    queryKey: ["get-contacts"],
    queryFn: getContacts,
});

if (isLoading) {
    return <div><LoaderCircle className="animate-spin"/></div>;
}


  return (
    <div className="relative  bg-[#181920] border-r-2 border-[#2f303b]">
      <div className="md:w-[35vw] lg:w-[30vw] xl:w-[23vw]">
        <Logo />

        <div className="flex flex-col items-center my-5 justify-between">
          <div className="flex w-full items-center justify-between pr-10">
            <NavigationTitle text="Conversas Privadas" />
            <PrivateConversations />
          </div>
          <div className="max-h-[38vh] overflow-y-auto scrollbar-hidden w-full">
            <ContactsList contacts={data.contacts} isChannel={false} />
          </div>
        </div>

        <div className="flex items-center my-5 justify-between pr-10">
          <NavigationTitle text="Grupos" />
        </div>
        <div>
          <ProfileInfo />
        </div>
      </div>
    </div>
  );
}

export default ContactsContainer;