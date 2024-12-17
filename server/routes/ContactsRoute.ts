import {Router} from "express";
import {verifyToken} from "../middlewares/AuthMiddleware/verifyToken";
import { searchContacts } from "../controllers/ContactsController/searchContacts";
import {getContactsForDMList} from "../controllers/ContactsController/getContactsForDMList";

const contactsRoutes = Router();

contactsRoutes.post("/search",verifyToken, searchContacts);
contactsRoutes.get("/get-contacts-for-dm", verifyToken, getContactsForDMList);

export default contactsRoutes;