import { Request, Response } from "express"
import mongoose from "mongoose"
import Channel from "../../models/ChannelModel"

export const getUserChannels = async (request: Request, response: Response) => {
    try {
        const userId = new mongoose.Types.ObjectId(request.userId);
        const channels = await Channel.find({
            $or: [{ admin: userId }, { members: userId }]
        }).sort({ updatedAt: -1 });

        response.status(201).json({ channels });
    }
    catch (error) {
        response.status(500).send("Internal Server Error")
    }
}