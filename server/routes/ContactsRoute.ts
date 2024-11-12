import {Router} from "express"
import {verifyToken} from "../middlewares/AuthMiddleware/verifyToken"
import { searchContacts } from "../controllers/ContactsController/searchContacts";

const contactsRoutes = Router();

contactsRoutes.post("/search",verifyToken, searchContacts)

export default contactsRoutes;