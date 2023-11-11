import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import Employer from "@/models/Employer";
import generateToken from "@/utils/generateToken";
import Candidate from "@/models/Candidate";
import User, { IUser } from "@/models/User";
function excludePassword(_: any, ret: any) {
  delete ret.password;
}
enum UserRole {
  Employer = "employer",
  Candidate = "candidate",
}

interface ILoginBody {
  email: string;
  password: string;
}

const createUserAndAssociate = async (
  req: Request<{}, {}, IUser>,
  res: Response,
  userRole: UserRole
) => {
  const { email, password, ...others } = req.body;

  try {
    const isExistEmail = await User.findOne({ email });
    if (isExistEmail) {
      return res
        .status(400)
        .json({ status: false, message: "Email is already registered." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email: req.body.email,
      role: userRole,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    const userData = {
      user: savedUser._id,
      ...others,
    };

    if (userRole === UserRole.Employer) {
      const newEmployer = new Employer(userData);
      const savedData = await newEmployer.save();
      res.json({
        status: true,
        message: "User created successfully",
        data: savedData,
        token: generateToken({
          id: savedUser._id,
          email: savedUser.email,
          role: savedUser.role,
        }),
      });
    } else if (userRole === UserRole.Candidate) {
      const newCandidate = new Candidate(userData);
      const savedData = await newCandidate.save();
      res.json({
        status: true,
        message: "User created successfully",
        data: savedData,
        token: generateToken({
          id: savedUser._id,
          email: savedUser.email,
          role: savedUser.role,
        }),
      });
    }
  } catch (error) {
    res.status(500);
    throw new Error((error as Error).message);
  }
};

/**
 * Register for employer
 * @route POST /api/auth/register/employer
 * @access Public
 **/
export const registerEmployer = asyncHandler(
  async (req: Request<{}, {}, IUser>, res: Response) => {
    createUserAndAssociate(req, res, UserRole.Employer);
  }
);

/**
 * Register for candidate
 * @route POST /api/auth/register/candidate
 * @access Public
 **/
export const registerCandidate = asyncHandler(
  async (req: Request<{}, {}, IUser>, res: Response) => {
    const { email, password } = req.body;
    const isExistEmail = await User.findOne({ email });
    if (isExistEmail) {
      res.status(400);
      throw new Error("Email is already registered.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email: req.body.email,
      role: "candidate",
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    await Candidate.create({ user: newUser.id });
    res.json({
      status: true,
      message: "Candidate created successfully",
      data: savedUser.toJSON({ transform: excludePassword }),
      token: generateToken({
        id: newUser._id,
        email: newUser.email,
        role: newUser.role,
      }),
    });
  }
);

/**
 * Login
 * @route POST /api/auth/login
 * @access Public
 **/
export const login = asyncHandler(
  async (req: Request<{}, {}, ILoginBody>, res: Response) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      res.status(401);
      throw new Error("Email not found!");
    }

    const isPasswordMatched = await user.matchPassword(password);

    if (isPasswordMatched) {
      res.json({
        status: true,
        message: "You are now logged in",
        data: {
          role: user.role,
          email: user.email,
        },
        token: generateToken({
          id: user._id,
          email: user.email,
          role: user.role,
        }),
      });
    } else {
      res.status(401);
      throw new Error("Password not found!");
    }
  }
);
