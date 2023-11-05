// userRoute.js
import {
  candidateUpdate,
  employerUpdate,
  getCandidateInfo,
  getEmployerInfo,
} from "@/controllers/userController";
import checkRole from "@/middleware/checkRole";
import { checkValidation } from "@/middleware/checkValidation";
import {
  candidateValidator,
  employerValidator,
} from "@/validation/userValidator";
import express from "express";

const router = express.Router();

// Define middleware for candidates and employers
const candidateMiddlewares = [
  checkRole("candidate"),
  ...candidateValidator,
  checkValidation,
];
const employerMiddlewares = [
  checkRole("employer"),
  ...employerValidator,
  checkValidation,
];

router.put("/candidate/update", candidateMiddlewares, candidateUpdate);
router.put("/employer/update", employerMiddlewares, employerUpdate);
router.get("/candidate/profile", checkRole("candidate"), getCandidateInfo);
router.get("/employer/dashboard", checkRole("employer"), getEmployerInfo);

export default router;
