import express from "express";
import Contact from "../controllers/contactController.js";
import validateToken from "../middleware/validateTokenHandler.js";

const router = express.Router();

router.use(validateToken);

router.get("/", Contact.getAllContact);

router.post("/", Contact.createContact);

router.get("/:id", Contact.getContact);

router.put("/:id", Contact.updateContact);

router.delete("/:id", Contact.deleteContact);

export default router;
