import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Employer, { IEmployer } from "../models/Employer";
import { validationResult } from "express-validator";

const registerEmployer = (req: IEmployer, res: Response) => {};

/**
 * Register
 * @route POST /api/auth/register
 * @access Public
 **/
export const register = asyncHandler(async (req: Request, res: Response) => {});

/**
 * Login
 * @route POST /api/auth/login
 * @access Public
 **/
export const login = asyncHandler(async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(333).json({ status: false, errors: errors.array() });
    throw new Error("Error occured");
  }
  res.json({ message: "No errors!" });
});
