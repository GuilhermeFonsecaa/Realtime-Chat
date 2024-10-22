import { Router } from "express";
import { signup } from "../controllers/AuthController/signup/index";
import { login } from "../controllers/AuthController/login/index"
import { getUserInfo } from "../controllers/AuthController/userInfo/index"
import { verifyToken } from "../middlewares/AuthMiddleware/verifyToken"

const authRoutes = Router();

authRoutes.post("/signup", signup);
authRoutes.post("/login", login)
authRoutes.get("/user-info", verifyToken, getUserInfo)

export default authRoutes;