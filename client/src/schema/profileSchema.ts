import { z } from "zod";

export const profileSchema = z.object({
    email: z.string().email({ message: "Email é obrigatório" }),
    firstName: z.string({ message: "Primeiro nome é obrigatório" }),
    lastName: z.string({ message: "Sobrenome é obrigatório" })
})

export type profileSchemaType = z.infer<typeof profileSchema>