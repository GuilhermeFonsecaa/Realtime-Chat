import { Request, Response } from "express"

export const logOut = async (request: Request, response: Response) => {
    try {
        response.clearCookie("jwt", {
            maxAge: 1,
            sameSite: "none",
            secure: true
        });
        response.status(200).send("Logout realizado com sucesso");
    }
    catch (error) {
        response.status(500).json({ message: "Erro do Servidor" });
    }
}