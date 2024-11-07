import { Router } from "express";
import { signup } from "../controllers/AuthController/signup/index";
import { login } from "../controllers/AuthController/login/index"
import { getUserInfo } from "../controllers/AuthController/userInfo/index"
import { verifyToken } from "../middlewares/AuthMiddleware/verifyToken"
import { updateProfile } from "../controllers/AuthController/updateProfile"
import { addProfileImage } from "../controllers/AuthController/addProfileImage"
import { removeProfileImage } from "../controllers/AuthController/removeProfileImage"
import { logOut } from "../controllers/AuthController/logOut"
import multer from "multer";

const authRoutes = Router();
const upload = multer({ dest: "uploads/profiles/" })

authRoutes.post("/signup", signup);
authRoutes.post("/login", login);
authRoutes.get("/user-info", verifyToken, getUserInfo);
authRoutes.put("/update-profile", verifyToken, updateProfile);
authRoutes.post("/add-profile-image", verifyToken, upload.single("profile-image"), addProfileImage)
authRoutes.delete("/remove-profile-image", verifyToken, removeProfileImage)
authRoutes.post("/logout", logOut)

export default authRoutes;