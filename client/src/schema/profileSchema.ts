import { z } from "zod";

export const profileSchema = z.object({
    email: z.string().email({ message: "Email é obrigatório" }),
    firstName: z.string({ message: "Primeiro nome é obrigatório" }).min(1, {message: "Primeiro nome é obrigatório"}),
    lastName: z.string({ message: "Sobrenome é obrigatório" }).min(1, {message: "Sobrenome é obrigatório"}),
    color: z.number({message: "Cor é obrigatória"})
})

export type profileSchemaType = z.infer<typeof profileSchema>