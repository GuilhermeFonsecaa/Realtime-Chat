import { Router } from "express";
import { verifyToken } from "../middlewares/AuthMiddleware/verifyToken";
import { createChannel } from "../controllers/ChannelController/createChannel";
import { getUserChannels } from "../controllers/ChannelController/getUserChannels"

const channelRoutes = Router();

channelRoutes.post("/create", verifyToken, createChannel);
channelRoutes.get("/user-channels", verifyToken, getUserChannels)

export default channelRoutes;