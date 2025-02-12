import { z } from "zod";

export const createChannelSchema = z.object({
    name: z.string({ message: "Nome é obrigatório" }),
    members: z.array(z.object({
        _id: z.string(),
    }, { message: "Selecione pelo menos um contato" }))
});

export type createNewChannelType = z.infer<typeof createChannelSchema>



