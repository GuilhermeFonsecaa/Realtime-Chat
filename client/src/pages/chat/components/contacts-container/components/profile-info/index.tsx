import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { getColor } from "@/lib/utils";
import { useAuthStore } from "@/store";
import { HOST } from "@/utils/constants";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Pencil, Power } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { logOut } from "@/hooks/logout";
import { toast } from "sonner";


const ProfileInfo = () => {
    const { userInfo, setUserInfo } = useAuthStore();
    const navigate = useNavigate();


    const mutation = useMutation({
        mutationFn: logOut,
        onSuccess: () => {
            toast.success("Logout realizado com sucesso", { className: "bg-orange-500 text-white", closeButton: false });
            navigate("/auth")
            setUserInfo(null)
        },
        onError: (error: any) => {
            if (error.response && error.response.data) {
                toast.error(error.response.data);
            }
        }
    })

    const handleLogout = () => {
        mutation.mutate();
    }

    return (
        <div className="absolute bottom-0 w-full h-16 flex items-center justify-between md:px-8 lg:px-5 xl:px-5 py-10 bg-[#2a2b33]">
            <div className="flex gap-3 items-center justify-center">
                <div className="w-12 h-12 relative">
                    <Avatar className="h-12 w-12 rounded-full overflow-hidden">
                        {userInfo?.image ?
                            <AvatarImage src={`${HOST}/${userInfo.image}`} alt="profile" className="object-cover w-full h-full" /> :
                            <div className={`flex items-center justify-center uppercase h-12 w-12 text-lg border-[1px] rounded-full ${getColor(userInfo?.color ?? 0)}`}>
                                {userInfo?.firstName?.split("").shift()}
                            </div>
                        }
                    </Avatar>
                </div>

                <div className="text-sm">
                    {userInfo?.firstName && userInfo?.lastName ? `${userInfo.firstName} ${userInfo.lastName}` : ""}
                </div>
            </div>
            <div className="flex gap-5">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <Pencil className="text-orange-400 font-medium" size={18} onClick={() => navigate("/profile")} />
                        </TooltipTrigger>
                        <TooltipContent className="bg-orange-500 text-white">
                            <p>Editar Perfil</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <Power className="text-orange-400 font-medium" size={18} onClick={handleLogout} />
                        </TooltipTrigger>
                        <TooltipContent className="bg-orange-500 text-white">
                            <p>Sair</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </div>
    );
}

export default ProfileInfo;