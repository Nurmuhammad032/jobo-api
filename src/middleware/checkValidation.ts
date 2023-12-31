import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export const checkValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req).formatWith(({ msg }) => ({
    message: msg,
  }));
  if (!errors.isEmpty()) {
    res.status(422).json({ status: false, errors: errors.array() });
    return;
  }
  next();
};
