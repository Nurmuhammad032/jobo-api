import {
  employerUpdate,
  getEmployerInfo,
} from "@/controllers/employerController";
import checkRole from "@/middleware/checkRole";
import { checkValidation } from "@/middleware/checkValidation";
import { employerValidator } from "@/validation/employerValidator";
import express from "express";

const router = express.Router();

// Define middleware for employers
const employerMiddlewares = [
  checkRole("employer"),
  ...employerValidator,
  checkValidation,
];

router.put("/update", employerMiddlewares, employerUpdate);
router.get("/dashboard", checkRole("employer"), getEmployerInfo);

export default router;
