import { Response, Request } from "express"
import User from "../../../models/UserModel";

export const getAllContacts = async (request: Request, response: Response) => {
    try {
        const users = await User.find({ _id: { $ne: request.userId } }, "firstName lastName _id email"); //exclui o proprio id e quais campos quer na query
      
        const contacts = users.map((user) => ({
            label: user.firstName ? `${user.firstName} ${user.lastName}` : user.email,
            value:user._id
        }))
       
        response.status(200).json({ contacts });
    }

    catch (error) {
        response.status(500).send("Internal Server Error")
    }
}