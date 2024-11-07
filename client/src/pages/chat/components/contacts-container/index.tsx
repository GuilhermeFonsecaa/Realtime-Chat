import Logo from "./components/logo";
import NavigationTitle from "./components/navigation-title";
import ProfileInfo from "./components/profile-info";

const ContactsContainer = () => {
  return (
    <div className="relative  bg-[#181920] border-r-2 border-[#2f303b]">
      <div className="md:w-[35vw] lg:w-[30vw] xl:w-[23vw]">
        <Logo />

        <div className="flex items-center my-5 justify-between pr-10">
          <NavigationTitle text="Conversas Privadas" />
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