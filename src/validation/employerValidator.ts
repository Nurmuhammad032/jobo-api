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
