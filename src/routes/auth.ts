import { login, registerUser } from "@/controllers/authController";
import { validateUser } from "@/validation/authValidator";
import express from "express";

const router = express.Router();

router.post("/register", validateUser, registerUser);
router.post("/login", login);

export default router;
