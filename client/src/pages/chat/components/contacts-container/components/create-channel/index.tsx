import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { LoaderCircle, UserRoundPlus } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { useChatStore } from "@/store";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getAllContacts } from "@/hooks/getAllContacts";
import { useForm } from "react-hook-form";
import { createChannelSchema } from "@/schema/createNewChannel";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import MultipleSelector from "@/components/ui/multiple-selector";
import { createChannel } from "@/hooks/createChannel";
import { toast } from "sonner";

interface memberProps {
    _id: string;
    firstName: string; // Pegando apenas o primeiro nome
    lastName: string;
    email: string;
}

const CreateChannel = () => {
    const { addChannel } = useChatStore();
    const [openDialog, setOpenDialog] = useState<boolean>(false);

    const { data, isPending } = useQuery({
        queryFn: getAllContacts,
        queryKey: ["get-all-contacts"]
    })

    const mutationCreateNewChannel = useMutation({
        mutationKey: ["create-channel"],
        mutationFn: createChannel,
        onSuccess: (response) => {
            if (response?.status === 201 && response.data) {
                toast.success("Grupo criado com sucesso", { className: "bg-orange-500 text-white" });
                addChannel(response.data.channel);
                setOpenDialog(false);
            }
        },
        onError: (error: any) => {
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            }
        }
    })

    const form = useForm({
        resolver: zodResolver(createChannelSchema),
    })

    const onSubmitCreateNewChannel = () => {
        const members = form.getValues("members") as memberProps[]; // Garante que o TypeScript reconheça a estrutura completa dos membros

        mutationCreateNewChannel.mutate({
            members: members.map(({ _id }) => ({ _id })), // Apenas os IDs são enviados para a API
            name: form.getValues("name")
        });
    };

    {
        isPending && (
            <div className="flex justify-center items-center"><LoaderCircle className="animate-spin" /> </div>
        )
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
                                Crie um novo grupo
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                </DialogTrigger>
                <DialogContent className="bg-[#181920] border-none text-white md:w-[400px] md:h-[400px] lg:w-[400px] lg:h-[500px] xl:w-[700px] xl:max-w-[900px] xl:h-[400px] 2xl:min-w-[650px] 2xl:h-[430px] 2xl:max-h-[700px]  flex flex-col">
                    <DialogHeader>
                        <DialogTitle>Criar Grupo</DialogTitle>
                        <DialogDescription>
                            Por favor preencha os detalhes do grupo
                        </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmitCreateNewChannel)} className="xl:mt-3 2xl:mt-5 gap-7 flex flex-col">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nome</FormLabel>
                                        <FormControl>
                                            <Input type="text" className="py-5" placeholder="Digite o nome do grupo" {...field} />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="members"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Contatos</FormLabel>
                                        <FormControl>
                                            <MultipleSelector
                                                className="text-white"
                                                defaultOptions={data?.contacts.filter(
                                                    (member: memberProps) => !field.value.some((selected: memberProps) => selected._id === member._id)
                                                )}
                                                placeholder="Selecione os Contatos"
                                                emptyIndicator={
                                                    data?.contacts.length === 0 ? (
                                                        <p>Nenhum contato disponível</p>
                                                    ) : (
                                                        <p>Nenhum resultado encontrado</p>
                                                    )
                                                }
                                                value={field.value.map((contact: memberProps) => ({
                                                    value: contact._id,
                                                    label: `${contact.firstName} ${contact.lastName}`,
                                                }))}
                                                onChange={(selected) => {
                                                    const newContacts = selected.map((option) => ({
                                                        _id: option.value,
                                                        firstName: option.label.split(" ")[0],
                                                        lastName: option.label.split(" ").slice(1).join(" "),
                                                        email: data?.contacts.find((c: memberProps) => c._id === option.value)?.email || "",
                                                    }));
                                                    field.onChange(newContacts);
                                                }}
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button disabled={mutationCreateNewChannel.isPending} className="w-full bg-orange-500 hover:bg-orange-600 h-10 xl:mt-8" type="submit">
                                {mutationCreateNewChannel.isPending ? <LoaderCircle className="animate-spin" /> : "Criar Grupo"}
                            </Button>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>

        </div>
    );
}

export default CreateChannel;