import { Request, Response } from "express";
import User from "../../../models/UserModel";

export const getUserInfo = async (request: Request, response: Response): Promise<any> => {

    try {
        const userData = await User.findById(request.userId);
        if (!userData) {
            return response.status(404).send("Id do usuário não foi encontrado")
        }
        return response.status(200).json({
            id: userData.id,
            email: userData.email,
            profileSetup: userData.profileSetup,
            firstName: userData.firstName,
            lastName: userData.lastName,
            image: userData.image,
            color: userData.color
        })
    }
    catch (error) {
        return response.status(500).send("Internal Server Error")
    }

}