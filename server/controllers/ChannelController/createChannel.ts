import { Request, Response } from "express";
import User from "../../models/UserModel"
import Channel from "../../models/ChannelModel"

export const createChannel = async (request: Request, response: Response) => {
    try {
        const { name, members } = request.body;
        const userId = request.userId;

        const admin = await User.findById(userId);

        if (!admin) {
            response.status(400).send("Admin user not found");
        };

        const validMembers = await User.find({
            _id: {
                $in: members
            }
        });

        if (validMembers.length !== members.length) {
            response.status(400).send("Alguns membros não são usuários válidos")
        };

        const newChannel = new Channel({
            name, members, admin: userId
        });

        await newChannel.save();
        response.status(201).json({ channel: newChannel });
    }
    catch (error) {
        response.status(500).send("Internal Server Error");
    };
}