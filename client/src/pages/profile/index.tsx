import { Avatar } from "@/components/ui/avatar";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { colors, getColor } from "@/lib/utils";
import { profileSchema, profileSchemaType } from "@/schema/profileSchema";
import { useAppStore } from "@/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { AvatarImage } from "@radix-ui/react-avatar";
import { ArrowLeft, Plus, Trash } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

const Profile = () => {
    const { userInfo } = useAppStore();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [image, setImage] = useState(null);
    const [hovered, setHovered] = useState(false);
    const [selectedColor, setSelectedColor] = useState(0);

    const profileForm = useForm<profileSchemaType>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            email: "",
            firstName: "",
            lastName: ""
        }
    })

    const saveChanges = async () => {

    }

    return (
        <div className="h-screen flex items-center justify-center flex-col gap-10 bg-[#1b1c24]">
            <div className="flex flex-col gap-10 w-[80vw] md:w-max">
                <div>
                    <ArrowLeft className="text-4xl lg:text-6xl text-white/90 cursor-pointer" />
                </div>
                <div className="grid grid-cols-2">
                    <div className="h-full w-32 md:w-48 relative flex items-center justify-center" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
                        <Avatar className="h-32 w-32 md:w-48 md:h-48 rounded-full overflow-hidden">
                            {image ? <AvatarImage src={image} alt="profile" className="object-cover w-full h-full" /> : <div className={`flex items-center justify-center uppercase h-32 w-32 md:w-48 md:h-48 text-5xl border-[1px] rounded-full ${getColor(selectedColor)}`}>
                                {firstName ? firstName.split("").shift() : userInfo?.email.split("").shift()}
                            </div>
                            }
                        </Avatar>
                        {hovered && (
                            <div className="absolute inset-0 flex items-center justify-center bg-slate-900/50 ring-fuchsia-50 rounded-full">
                                {
                                    image ? <Trash className="text-white text-3xl cursor-pointer" /> : <Plus className="text-white cursor-pointer" strokeWidth={3} size={50} />
                                }
                            </div>
                        )}
                    </div>
                    <div className="flex min-w-32 md:min-w-64 flex-col text-white items-center justify-center">
                        <Form {...profileForm}>
                            <form className="flex flex-col my-8 gap-3 w-full">
                                <FormField
                                    control={profileForm.control}
                                    name="email"
                                    render={() => (
                                        <FormItem>
                                            <Input type="email" value={userInfo?.email} placeholder="Email" disabled className="rounded-lg p-6 bg-[#2c2e3b] border-none" />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={profileForm.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <Input type="text" placeholder="Primeiro Nome" className="rounded-lg p-6 w-full bg-[#2c2e3b] border-none" {...field} />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={profileForm.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <Input type="text" placeholder="Sobrenome" className="rounded-lg p-6 bg-[#2c2e3b] border-none" {...field} />
                                        </FormItem>
                                    )}
                                />
                            </form>
                        </Form>

                        <div className="w-full flex gap-5 items-center justify-start">
                            {
                                colors.map((color, index) => (
                                    <div onClick={() => setSelectedColor(index)} key={index} className={`${color} h-8 w-8 rounded-full cursor-pointer transition-all duration-300 ${selectedColor === index ? "outline outline-white outline-4" : ""}`} />
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;