import { NextFunction, Request, Response, json } from "express";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import Employer from "@/models/Employer";
import { check, validationResult } from "express-validator";
import generateToken from "@/utils/generateToken";
import Candidate from "@/models/Candidate";
import User, { IUser } from "@/models/User";
import { employerValidator } from "@/validation/authValidator";

/**
 * Register
 * @route POST /api/auth/register
 * @access Public
 **/
export const registerUser = asyncHandler(
  async (req: Request<{}, {}, IUser>, res: Response, next: NextFunction) => {
    check("avatar").notEmpty().withMessage("Avatar is required");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ status: false, errors: errors.array() });
      return;
    }

    const { email, password, role, ...others } = req.body;
    const isExistEmail = await User.findOne({ email });
    if (isExistEmail) {
      res.status(400);
      throw new Error("Email is already registered.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    if (role === "employer") {
      const newEmployer = new Employer({
        user: savedUser._id,
        ...req.body,
      });
      const savedEmployer = await newEmployer.save();

      res.json({
        status: true,
        message: "User created successfully",
        data: savedEmployer,
        token: generateToken(savedUser._id),
      });
    } else if (role === "candidate") {
      const newCandidate = new Candidate({
        user: savedUser._id,
        ...others,
      });

      const savedCandidate = await newCandidate.save();
      res.json({
        status: true,
        message: "User created successfully",
        data: savedCandidate,
        token: generateToken(savedCandidate._id),
      });
    }
  }
);

/**
 * Login
 * @route POST /api/auth/login
 * @access Public
 **/
export const login = asyncHandler(async (req: Request, res: Response) => {
  res.json({ message: "No errors!" });
});
