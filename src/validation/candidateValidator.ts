import { body } from "express-validator";
import { Types } from "mongoose";

export const candidateValidator = [
  body("name", "Name is required").optional(),
  body("birthday", "Birthday is required").not().isEmpty(),
  body("address", "Address is required").not().isEmpty(),
];

export const educationValidator = [
  body("candidateId")
    .notEmpty()
    .withMessage("Candidate id is required.")
    .custom((value) => {
      if (!Types.ObjectId.isValid(value)) {
        throw new Error("Please provide a valid candidate id.");
      }
      return true; // Indicates the success of the custom validation
    }),
  body("school", "School name is required").notEmpty(),
  body("degree", "degree is required").notEmpty(),
  body("startDate", "Start date is required")
    .notEmpty()
    .isDate()
    .withMessage("Please enter a valid date."),
  body("currentEducate")
    .optional()
    .isBoolean()
    .withMessage(
      "Please specify if you are currently enrolled in this education."
    ),
  body("description")
    .optional()
    .isLength({ min: 10 })
    .withMessage(
      "Description should be at least 10 characters long or left empty."
    ),
];

export const experienceValidator = [
  body("candidateId")
    .isString()
    .notEmpty()
    .withMessage("Candidate id is required."),
  body("name", "Name is required").optional(),
  body("birthday", "Birthday is required").not().isEmpty(),
  body("address", "Address is required").not().isEmpty(),
];
