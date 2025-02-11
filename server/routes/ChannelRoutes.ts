import { Router } from "express";
import {verifyToken} from "../middlewares/AuthMiddleware/verifyToken";
import { createChannel } from "../controllers/ChannelController/createChannel";

const channelRoutes = Router();

channelRoutes.post("/create", verifyToken, createChannel);

export default channelRoutes;