// userRoute.js
import {
  candidateUpdate,
  createEducation,
  createExperience,
  employerUpdate,
  getCandidateInfo,
  getEmployerInfo,
} from "@/controllers/userController";
import checkRole from "@/middleware/checkRole";
import { checkValidation } from "@/middleware/checkValidation";
import {
  candidateValidator,
  educationValidator,
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
const educationMiddlewares = [
  checkRole("candidate"),
  ...educationValidator,
  checkValidation,
];

router.put("/candidate/update", candidateMiddlewares, candidateUpdate);
router.put("/employer/update", employerMiddlewares, employerUpdate);
router.get("/candidate/profile", checkRole("candidate"), getCandidateInfo);
router.post("/candidate/education", educationMiddlewares, createEducation);
router.get("/candidate/experience", checkRole("candidate"), createExperience);
router.get("/employer/dashboard", checkRole("employer"), getEmployerInfo);

export default router;
