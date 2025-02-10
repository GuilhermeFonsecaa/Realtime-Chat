import {Router} from "express";
import {verifyToken} from "../middlewares/AuthMiddleware/verifyToken";
import { searchContacts } from "../controllers/ContactsController/searchContacts";
import {getContactsForDMList} from "../controllers/ContactsController/getContactsForDMList";
import {getAllContacts} from "../controllers/ContactsController/getAllContacts"

const contactsRoutes = Router();

contactsRoutes.post("/search",verifyToken, searchContacts);
contactsRoutes.get("/get-contacts-for-dm", verifyToken, getContactsForDMList);
contactsRoutes.get("/get-all-contacts", verifyToken, getAllContacts)
export default contactsRoutes;