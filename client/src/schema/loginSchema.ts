import { z } from "zod";

export const LoginSchema = z.object({
    email: z.string().email({message: "Por favor, insira um e-mail válido"}),
    password: z.string()
    .min(8, "A senha deve ter pelo menos 8 caracteres")
    .regex(/[a-z]/, "A senha deve conter pelo menos uma letra minúscula")
    .regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula")
    .regex(/\d/, "A senha deve conter pelo menos um número")
    .regex(/[@$!%*?&]/, "A senha deve conter pelo menos um caractere especial"),
});

export type loginSchemaType = z.infer<typeof LoginSchema>




