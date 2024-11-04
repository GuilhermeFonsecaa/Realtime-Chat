import { Request, Response } from "express";
import User from "../../../models/UserModel";

export const updateProfile = async (request: Request, response: Response) => {
    try {
        const { userId } = request;
        const { firstName, lastName, color } = request.body;

        if (!firstName || !lastName || color === undefined || color === null) {
            response.status(404).send("Nome, sobrenome e cor são obrigatórios")
        }
        const userData = await User.findByIdAndUpdate(userId, { firstName, lastName, color, profileSetup: true }, { new: true, runValidators: true });

        if (userData !== null) {
            response.status(200).json({
                id: userData.id,
                email: userData.email,
                profileSetup: userData.profileSetup,
                firstName: userData.firstName,
                lastName: userData.lastName,
                image: userData.image,
                color: userData.color
            })
        }
        else {
            response.status(404).send("Usuário não encontrado")
        }
    }
    catch (error) {
        response.status(500).send("Internal Server Error");
    }
}