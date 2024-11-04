import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { addProfileImage } from "@/hooks/addProfileImage";
import { removeProfileImage } from "@/hooks/removeProfileImage";
import { updateProfile } from "@/hooks/updateProfile";
import { colors, getColor } from "@/lib/utils";
import { profileSchema, profileSchemaType } from "@/schema/profileSchema";
import { useAppStore } from "@/store";
import { HOST } from "@/utils/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { AvatarImage } from "@radix-ui/react-avatar";
import { useMutation } from "@tanstack/react-query";
import { ArrowLeft, LoaderCircle, Plus, Trash } from "lucide-react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Profile = () => {
    const { userInfo, setUserInfo } = useAppStore();
    const [hovered, setHovered] = useState(false);
    const navigate = useNavigate();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const profileForm = useForm<profileSchemaType>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            email: userInfo?.email,
            firstName: userInfo?.firstName,
            lastName: userInfo?.lastName,
            color: userInfo?.color || 0
        }
    })

    const mutationUpdateProfile = useMutation({
        mutationFn: updateProfile,
        mutationKey: ["updateProfile"],
        onSuccess: () => {
            toast.success("Perfil atualizado com sucesso", { className: "bg-emerald-500 text-white", closeButton: false });
            userInfo && setUserInfo({ ...userInfo, firstName: profileForm.getValues("firstName"), lastName: profileForm.getValues("lastName"), color: profileForm.getValues("color"), profileSetup: true })
            navigate("/chat");
        },

        onError: (error: any) => {
            if (error.response && error.response.data) {
                toast.error(error.response.data);
            }
        }
    })

    const saveChanges = async (form: profileSchemaType) => {
        mutationUpdateProfile.mutate(form);
    }

    const handleFileInputClick = () => {
        fileInputRef?.current?.click()
    }


    const mutationAddProfileImage = useMutation({
        mutationFn: addProfileImage,
        mutationKey: ["addProfileImage"],
        onSuccess: (response) => {
            const imageUrl = `${HOST}/${response}`;
            toast.success("Imagem atualizada com sucesso", { className: "bg-emerald-500 text-white", closeButton: false });
            userInfo && setUserInfo({ ...userInfo, image: imageUrl })
        },

        onError: (error: any) => {
            if (error.response && error.response.data) {
                toast.error(error.response.data);
            }
        }
    })

    const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;

        if (files && files.length > 0) {
            const file = files[0];// arquivo selecionado
            const formData = new FormData();
            formData.append("profile-image", file); //// Adiciona o arquivo ao FormData com a chave "profile-image"
            mutationAddProfileImage.mutate(formData);

            const reader = new FileReader();
            reader.onload = () => {
               userInfo && setUserInfo({...userInfo, image: reader.result as string}) // Define o estado 'image' com o resultado da leitura (que é um URL de dados da imagem)
            }
            reader.readAsDataURL(files[0]); // Inicia a leitura do arquivo como uma URL de dados
        }
    };

    const mutationRemoveProfileImage = useMutation({
        mutationFn: removeProfileImage,
        mutationKey: ["removeProfileImage"],
        onSuccess: () => {
            toast.success("Imagem removida com sucesso", { className: "bg-emerald-500 text-white", closeButton: false });
            userInfo && setUserInfo({ ...userInfo, image: undefined })
        },
        onError: (error: any) => {
            if (error.response && error.response.data) {
                toast.error(error.response.data);
            }
        }
    })

    const handleDeleteImage = async () => {
        mutationRemoveProfileImage.mutate()
    };

    console.log(userInfo?.image)

    return (
        <div className="h-screen flex items-center justify-center flex-col gap-10 bg-[#1b1c24]">
            <div className="flex flex-col gap-10 w-[80vw] md:w-max">
                <div>
                    <ArrowLeft className="text-4xl lg:text-6xl text-white/90 cursor-pointer" />
                </div>
                <div className="grid grid-cols-2">
                    <div className="w-32 md:w-48 relative flex items-center justify-center" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
                        <Avatar className="h-32 w-32 md:w-48 md:h-48 rounded-full overflow-hidden">
                            {userInfo?.image ?
                                <AvatarImage src={userInfo.image} alt="profile" className="object-cover w-full h-full" /> :
                                <div className={`flex items-center justify-center uppercase h-32 w-32 md:w-48 md:h-48 text-5xl border-[1px] rounded-full ${getColor(profileForm.watch("color"))}`}>
                                    {profileForm && profileForm.watch("firstName")
                                        ? profileForm.watch("firstName").split("").shift()
                                        : userInfo?.email ? userInfo.email.split("").shift() : ""}
                                </div>
                            }
                        </Avatar>
                        {hovered && (
                            <div className="absolute inset-0 flex items-center justify-center bg-slate-900/50 ring-fuchsia-50 rounded-full" onClick={userInfo?.image ? handleDeleteImage : handleFileInputClick}>
                                {
                                    userInfo?.image ? <Trash className="text-white text-3xl cursor-pointer" /> : <Plus className="text-white cursor-pointer" size={50} />
                                }
                            </div>
                        )}
                        <Input type="file" ref={fileInputRef} className="hidden" onChange={handleImageChange} name="profile-image" accept=".png, .jpg, .jpeg, .svg, .webp" />
                    </div>

                    <div className="flex min-w-32 md:min-w-64 flex-col text-white items-center justify-center mt-5">
                        <Form {...profileForm}>
                            <form className="flex flex-col my-8 gap-3 w-full" onSubmit={profileForm.handleSubmit(saveChanges)}>
                                <FormField
                                    control={profileForm.control}
                                    name="email"
                                    render={() => (
                                        <FormItem>
                                            <Input type="email" value={userInfo?.email} placeholder="Email" disabled className="rounded-lg p-6 bg-[#2c2e3b] border-none" />
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={profileForm.control}
                                    name="firstName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <Input type="text" placeholder="Primeiro Nome" className="rounded-lg p-6 w-full bg-[#2c2e3b] border-none" {...field} />
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={profileForm.control}
                                    name="lastName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <Input type="text" placeholder="Sobrenome" className="rounded-lg p-6 bg-[#2c2e3b] border-none" {...field} />
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={profileForm.control}
                                    name="color"
                                    render={() => (
                                        <FormItem>
                                            <FormLabel className="text-gray-300">Cor:</FormLabel>
                                            <div className="w-full flex gap-5 mt-3 items-center justify-start">
                                                {colors.map((color, index) => (
                                                    <label key={index} className="cursor-pointer">
                                                        <input
                                                            type="radio"
                                                            name="color"
                                                            value={index}
                                                            checked={profileForm.watch("color") === index}
                                                            onChange={() => profileForm.setValue("color", index)}
                                                            className="hidden"
                                                        />
                                                        <div
                                                            className={`h-8 w-8 rounded-full transition-all duration-300 ${color} ${profileForm.watch("color") === index ? "outline outline-white outline-4" : ""}`}
                                                        ></div>
                                                    </label>
                                                ))}
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="w-full mt-5">
                                    <Button disabled={mutationUpdateProfile.isPending} type="submit" className={`h-16 w-[300px] ${colors[profileForm.watch("color")]} hover:opacity-70 hover:${colors[profileForm.watch("color")]} transition-all duration-300`}>
                                        {mutationUpdateProfile.isPending ? <LoaderCircle className="animate-spin" /> : "Salvar Perfil"}
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Profile;