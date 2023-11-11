import {
  candidateUpdate,
  createEducation,
  createExperience,
  getCandidateInfo,
  updateEducation,
} from "@/controllers/candidateController";
import checkRole from "@/middleware/checkRole";
import { checkValidation } from "@/middleware/checkValidation";
import {
  candidateValidator,
  educationValidator,
} from "@/validation/candidateValidator";
import express from "express";

const router = express.Router();

// Define middleware for candidates
const candidateMiddlewares = [
  checkRole("candidate"),
  ...candidateValidator,
  checkValidation,
];
const educationMiddlewares = [
  checkRole("candidate"),
  ...educationValidator,
  checkValidation,
];

router.get("/profile", checkRole("candidate"), getCandidateInfo);
router.put("/update", candidateMiddlewares, candidateUpdate);
router.post("/education", educationMiddlewares, createEducation);
router.put("/education/:id", educationMiddlewares, updateEducation);
router.post("/experience", checkRole("candidate"), createExperience);

export default router;
