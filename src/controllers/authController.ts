import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import Employer from "@/models/Employer";
import { validationResult } from "express-validator";
import generateToken from "@/utils/generateToken";
import Candidate from "@/models/Candidate";
import User, { IUser } from "@/models/User";

/**
 * Register
 * @route POST /api/auth/register
 * @access Public
 **/
export const registerUser = asyncHandler(
  async (req: Request<{}, {}, IUser>, res: Response) => {
    try {
      console.log("running or");
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
        ...req.body,
        password: hashedPassword,
      });

      const savedUser = await newUser.save();

      if (role === "employer") {
        const employerData = {
          user: newUser._id,
          ...others,
        };

        const newEmployer = new Employer(employerData);
        res.json({
          status: true,
          message: "User created successfully",
          data: newEmployer,
          token: generateToken(savedUser._id),
        });
      } else if (role === "candidate") {
        const candidateData = {
          user: newUser._id,
          ...others,
        };

        const newCandidate = Candidate.create(candidateData);

        res.json({
          status: true,
          message: "User created successfully",
          data: newCandidate,
          token: generateToken(savedUser._id),
        });
      }
    } catch (error) {
      res
        .status(500)
        .json({ status: false, message: (error as Error).message });
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
