import { login, register } from "../controllers/authController";
import express from "express";
import { body } from "express-validator";

const router = express.Router();
const loginValidator = [
  body("email", "Email is required").not().isEmpty(),
  body("email", "Please enter a valid email address").isEmail(),
  body("password")
    .not()
    .isEmpty()
    .withMessage("Password is required")
    .isLength({
      min: 8,
    })
    .withMessage("Your password must be at least 8 characters long"),
];
router.post("/register", register);
router.post("/login", loginValidator, login);

export default router;
