import { NextFunction, Request, Response } from "express";
import { body, check } from "express-validator";

export const employerValidator = [
  check("name", "Name is required").not().isEmpty(),
  check("email", "Email is required").not().isEmpty(),
  check("email", "Please enter a valid email address").isEmail(),
  check("password")
    .not()
    .isEmpty()
    .withMessage("Password is required")
    .isLength({
      min: 8,
    })
    .withMessage("Your password must be at least 8 characters long"),
  check("role", "Role must be 'employer'").equals("employer"),
  check("ownedDate", "Owned date is required")
    .not()
    .isEmpty()
    .isDate()
    .withMessage("Owned date must be a valid date"),
  check("address", "Address is required").not().isEmpty(),
];

const candidateValidator = [
  check("name", "Name is required").not().isEmpty(),
  check("email", "Email is required").not().isEmpty(),
  check("email", "Please enter a valid email address").isEmail(),
  check("password")
    .not()
    .isEmpty()
    .withMessage("Password is required")
    .isLength({
      min: 8,
    })
    .withMessage("Your password must be at least 8 characters long"),
  check("role", "Role must be 'candidate'").equals("candidate"),
  check("birthday", "Birthday is required").not().isEmpty(),
  check("address", "Address is required").not().isEmpty(),
];

export const validateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const role = req.body.role;

  if (role === "employer") {
    // employerValidator.forEach((validation) => {
    //   validation(req, res);
    // });
  } else if (role === "candidate") {
    candidateValidator.forEach((validation) => {
      validation(req, res, next);
    });
  } else {
    // Handle invalid or missing role
    res.status(400).json({ status: false, message: "Invalid user role" });
    return;
  }
};
