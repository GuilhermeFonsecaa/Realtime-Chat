import { Request, Response } from "express";
import { renameSync } from "node:fs";
import User from "../../../models/UserModel";

export const addProfileImage = async (request: Request, response: Response) => {
    try {
        if (!request.file) {
            response.status(400).send("Um arquivo é obrigátorio");
            return;
        }

        const date = Date.now();
        let fileName = "uploads/profiles/" + date + request.file?.originalname;
        renameSync(request?.file.path, fileName); // renomeia o arquivo

        const updateUser = await User.findOneAndUpdate(
            { _id: request.userId },
            { image: fileName },
            { new: true, runValidartors: true }); //id:busca / image:campo a ser atualizado / new: retorna o documento atualizado após a operação, runValidator: Mongoose executa as validações definidas no esquema do modelo antes de aplicar a atualização

        response.status(200).json({
            image: updateUser?.image
        })
    }

    catch (error) {
        console.log({ error });
        response.status(500).json({ message: "Erro do Servidor" });
    }

}