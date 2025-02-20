import { Router } from "express";
import { verifyToken } from "../middlewares/AuthMiddleware/verifyToken";
import { createChannel } from "../controllers/ChannelController/createChannel";
import { getUserChannels } from "../controllers/ChannelController/getUserChannels"
import {getChannelMessages} from "../controllers/ChannelController/getChannelMessages"

const channelRoutes = Router();

channelRoutes.post("/create", verifyToken, createChannel);
channelRoutes.get("/user-channels", verifyToken, getUserChannels);
channelRoutes.get("/get-messages/:channelId", verifyToken, getChannelMessages)

export default channelRoutes;