import { login, registerUser } from "@/controllers/authController";
import { validateUser } from "@/validation/authValidator";
import express from "express";
import { body } from "express-validator";

const router = express.Router();
const val = [body("name").notEmpty()];
router.post("/register", registerUser);
router.post("/login", login);

export default router;
