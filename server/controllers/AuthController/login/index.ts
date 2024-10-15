import { compare } from "bcrypt";
import User from "../../../models/UserModel";
import { createToken, maxAge } from "../utils/createToken";

export const login = async (request: any, response: any) => {
    try {

        const { email, password } = request.body;

        if (!email || !password) {
            response.status(400).json("Email e senha são obrigatórios")
        }

        const user = await User.findOne({ email });

        if (!user) {
            return response.status(400).json({message:"Usuário com o e-mail fornecido não foi encontrado."})
        }

        const auth = await compare(password, user.password)

        if (!auth) {
            return response.status(400).json({message:"Senha incorreta"})
        }

        const token = createToken({ email: user.email, userId: user.id })

        response.cookie("jwt", token, {
            maxAge,
            secure: true,
            sameSite: "none"
        })

        return response.status(201).json({
            user: {
                id: user.id,
                email: user.email,
                profileSetup: user.profileSetup,
                firstName: user.firstName,
                lastName: user.lastName,
                image: user.image,
                color: user.color
            }
        })
    }
    catch (error) {
        console.log({ error });
        return response.status(500).json({ message: "Erro do Servidor" });
    }
}