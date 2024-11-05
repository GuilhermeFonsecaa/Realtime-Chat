import { Request, Response } from "express";
import { compare } from "bcrypt";
import User from "../../../models/UserModel";
import { createToken, maxAge } from "../utils/createToken";

interface LoginRequestBody {
    email: string;
    password: string;
}

export const login = async (request: Request, response: Response) => {
    try {
        const { email, password } = request.body;

        if (!email || !password) {
            response.status(400).json({ message: "Email e senha são obrigatórios" });
        }

        const user = await User.findOne({ email });

        if (!user) {
            response.status(400).json({ message: "Usuário com o e-mail fornecido não foi encontrado." });
            return;
        }

        const auth = await compare(password, user.password);

        if (!auth) {
            response.status(400).json({ message: "Credenciais inválidas" });
            return;
        }

        const token = createToken({ email: user.email, userId: user.id });

        response.cookie("jwt", token, {
            maxAge,
            secure: true,
            sameSite: "none"
        });

        response.status(201).json({
            user: {
                id: user.id,
                email: user.email,
                profileSetup: user.profileSetup,
                firstName: user.firstName,
                lastName: user.lastName,
                image: user.image,
                color: user.color
            },
        });
    } catch (error) {
        console.error(error);
        response.status(500).json({ message: "Erro do Servidor" });
    }
};
