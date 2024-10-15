import { Router } from "express";
import { signup } from "../controllers/AuthController/signup/index";
import { login } from "../controllers/AuthController/login/index"

const authRoutes = Router();

authRoutes.post("/signup", signup);
authRoutes.post("/login", login)

export default authRoutes;