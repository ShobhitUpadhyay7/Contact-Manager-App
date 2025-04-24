import express from "express";
import User from "../controllers/userController.js";
import validateToken from "../middleware/validateTokenHandler.js";

const router = express.Router();

router.post("/register", User.registerUser);

router.post("/login", User.loginUser);

router.get("/current", validateToken, User.currentUser);

export default router;
