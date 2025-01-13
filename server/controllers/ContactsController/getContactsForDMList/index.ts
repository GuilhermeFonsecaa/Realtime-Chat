import { Response, Request } from "express"
import mongoose from "mongoose"
import Message from "../../../models/MessagesModel"

export const getContactsForDMList = async (request: Request, response: Response) => {
    try {
        const userId = new mongoose.Types.ObjectId(request.userId); //converte userId para um ObjectId do Mongoose

        const contacts = await Message.aggregate([
            {
                //filtra apenas mensagens onde o usuário autenticado é o remetente ou o destinatário
                $match: {
                    $or: [{ sender: userId }, { recipient: userId }],
                },
            },

            {
                $sort: { timeStamp: -1, } //ordena em ordem descrecente
            },

            {
                //Agrupa as mensagens com base no Id do outro usuário
                $group: {
                    _id: {
                        //condicional para determinar o campo a ser agrupado -> Se a mensagem foi enviada pelo usuário autenticado agrupa pelo campo recipient, caso contrário pelo campo sender
                        $cond: {
                            if: { $eq: ["$sender", userId] },
                            then: "$recipient",
                            else: "$sender"
                        },
                    },
                    lastMessageTime: { $first: "$timestamp" }, //pega o valor do campo timestamp da primeira mensagem encontrada no grupo
                },
            },

            {
                // Exclui o próprio usuário da lista de contatos
                $match: {
                    _id: { $ne: userId },
                },
            },

            {
                //Realiza um join com a coleção users
                $lookup: {
                    from: "users",
                    localField: "_id", //id do contato, resultante do $group
                    foreignField: "_id", //O campo _id da coleção users
                    as: "contactInfo" //Nome do campo onde os dados do contato serão armazenados
                },
            },

            {
                // transforma cada elemento do array contactInfo em um documento separado
                $unwind: "$contactInfo",
            },

            {
                //Seleciona quais campos devem ser retornados
                $project: {
                    _id: 1,
                    lastMessageTime: 1,
                    email: "$contactInfo.email",
                    firstName: "$contactInfo.firstName",
                    lastName: "$contactInfo.lastName",
                    color: "$contactInfo.color"
                },
            },
            {
                $sort: { lastMessageTime: -1 } //ordena pela última mensagem
            }
        ]);

        response.status(200).json({ contacts });
    }

    catch (error) {
        response.status(500).send("Internal Server Error")
    }
}