import { body } from "express-validator";

export const employerValidator = [
  body("name", "Name is required").not().isEmpty(),
  body("ownedDate", "Owned date is required")
    .not()
    .isEmpty()
    .isDate()
    .withMessage("Owned date must be a valid date"),
  body("address", "Address is required").not().isEmpty(),
];

export const candidateValidator = [
  body("name", "Name is required").optional(),
  body("birthday", "Birthday is required").not().isEmpty(),
  body("address", "Address is required").not().isEmpty(),
];

export const educationValidator = [
  body("school", "School name is required").notEmpty(),
  body("degree", "degree is required").notEmpty(),
  body("startDate", "Start date is required").notEmpty(),
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
  body("name", "Name is required").optional(),
  body("birthday", "Birthday is required").not().isEmpty(),
  body("address", "Address is required").not().isEmpty(),
];

export const loginValidator = [
  body("email", "Email is required").not().isEmpty(),
  body("email", "Please enter a valid email address").isEmail(),
  body("password", "Name is required").not().isEmpty(),
];
