import { Response, Request } from "express";
import User from "../../../models/UserModel";
import { existsSync, unlinkSync } from "fs";

export const removeProfileImage = async (request: Request, response: Response) => {
    try {
        const { userId } = request;

        const user = await User.findById(userId);

        if (!user) {
            response.status(400).send("Usuário não encontrado")
            return;
        }

        //usuário tem uma imagem e se o arquivo existe
        if (user.image && existsSync(user.image)) {
            unlinkSync(user.image); //remover o arquivo
        }
        else if (user.image) {
            response.status(404).send("Arquivo de imagem não encontrado")
        }
        else {
            response.status(404).send("O usuário não possui uma imagem de perfil cadastrada")
        }

        user.image = null;
        await user.save();
        response.status(200).send("Imagem de perfil removida com sucesso.");
        
    }
    catch (error) {
        response.status(500).send("Internal Server Error")
    }
}