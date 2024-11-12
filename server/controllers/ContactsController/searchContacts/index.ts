import { Response, Request } from "express";
import User from "../../../models/UserModel"

export const searchContacts = async (request: Request, response: Response) => {
    try {
        const { search } = request.body;

        if (search === undefined || search === null) {
            response.status(400).send("Pesquisa é obrigatória");
        }

        const sanitizedSearch = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
        const regex = new RegExp(sanitizedSearch, "i"); //expressão regular com base em sanitizedSearch e "i" => sem distinção entre letras maiúsculas e minúsculas

        const contacts = await User.find({
            //and -> todas as operações verdadeiras e or pelo menos uma das condições dentro do array seja verdadeira.
            $and: [
                { _id: { $ne: request.userId } }, //exclui o próprio usuário da pesquisa, $ne = "diferente de"
                {
                    $or: [
                        { firstName: regex }, //procura por correspondencias do regex em firstName
                        { lastName: regex },  //procura por correspondencias do regex em lastName
                        { email: regex } //procura por correspondencias do regex em email
                    ],
                },
            ],
        });
        response.status(200).json({ contacts });
    }

    catch (error) {
        response.status(500).send("Internal Server Error")
    }
}