import { Response, Request } from "express"
import User from "../../../models/UserModel";
import { createToken, maxAge } from "../utils/createToken";

export const signup = async (request: Request, response: Response) => {
    try {

        const { email, password } = request.body;

        if (!email || !password) {
            response.status(400).json({ message: "Email e senha são obrigatórios" })
        }

        const verificationEmail = await User.findOne({ email })

        if (verificationEmail) {
            response.status(400).json({ message: "Já existe um usuário com este e-mail" });
        }

        const user = await User.create({ email, password });
        const token = createToken({ email: user.email, userId: user.id })

        response.cookie("jwt", token, {
            maxAge,
            secure: true,
            sameSite: "none"
        })

        response.status(201).json({
            user: {
                id: user.id,
                email: user.email,
                profileSetup: user.profileSetup
            }
        })
    }
    catch (error) {
        console.log({ error });
        response.status(500).json({ message: "Erro do Servidor" });
    }
}
