import {
  login,
  registerCandidate,
  registerEmployer,
} from "@/controllers/authController";
import { checkValidation } from "@/middleware/checkValidation";
import {
  employerValidator,
  candidateValidator,
  loginValidator,
} from "@/validation/authValidator";
import express from "express";

const router = express.Router();

router.post(
  "/register-employer",
  employerValidator,
  checkValidation,
  registerEmployer
);

router.post(
  "/register-candidate",
  candidateValidator,
  checkValidation,
  registerCandidate
);
router.post("/login", loginValidator, checkValidation, login);

export default router;
