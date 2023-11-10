import { body } from "express-validator";

export const employerValidator = [
  body("name", "Name is required").not().isEmpty(),
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
  body("role", "Role must be 'employer'").equals("employer"),
  body("ownedDate", "Owned date is required")
    .not()
    .isEmpty()
    .isDate()
    .withMessage("Owned date must be a valid date"),
  body("address", "Address is required").not().isEmpty(),
];

// export const candidateValidator = [
//   body("name", "Name is required").not().isEmpty(),
//   body("email", "Email is required").not().isEmpty(),
//   body("email", "Please enter a valid email address").isEmail(),
//   body("password")
//     .not()
//     .isEmpty()
//     .withMessage("Password is required")
//     .isLength({
//       min: 8,
//     })
//     .withMessage("Your password must be at least 8 characters long"),
//   body("role", "Role must be 'candidate'").equals("candidate"),
//   body("birthday", "Birthday is required").not().isEmpty(),
//   body("address", "Address is required").not().isEmpty(),
// ];
export const candidateValidator = [
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
  body("role", "Role must be 'candidate'").equals("candidate"),
];

export const loginValidator = [
  body("email", "Email is required").not().isEmpty(),
  body("email", "Please enter a valid email address").isEmail(),
  body("password", "Name is required").not().isEmpty(),
];
