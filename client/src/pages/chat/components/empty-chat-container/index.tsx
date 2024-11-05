import { animationDefaultOptions } from "@/lib/utils";
import Lottie from "react-lottie"

const EmptyChatContainer = () => {
    return (  
        <div className="flex-1 md:bg-[#1c1d25] md:flex flex-col justify-center items-center hidden duration-1000 transition-all">
           <Lottie isClickToPauseDisabled={true} height={250} width={250} options={animationDefaultOptions}/>
           <div className="text-opacity-80 text-white flex flex-col gap-5 items-center lg:text-4xl text-3xl transition-all duration-300 text-center">
            <h3 className="poppins-medium">
                Olá <span className="text-orange-500">!</span> Bem-vindo ao <span className="text-orange-500">TalkFlow.</span> 
            </h3>
           </div>
        </div>
    );
}
 
export default EmptyChatContainer;