import { Router } from "express";
import { getMessages } from "../controllers/MessagesController/getMessages";
import { uploadFile } from "../controllers/MessagesController/uploadFile";
import { verifyToken } from "../middlewares/AuthMiddleware/verifyToken"
import multer from "multer";

const messagesRoutes = Router();

const upload = multer({ dest: "uploads/files" })
messagesRoutes.post("/get-messages", verifyToken, getMessages);
messagesRoutes.post(
    "/upload-file",
    verifyToken,
    upload.single("file"), // Processa o arquivo da requisição
    uploadFile
  );

export default messagesRoutes;