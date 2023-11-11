import Employer from "@/models/Employer";
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { Model } from "mongoose";

/**
 * Get employer
 * @route GET /api/employer/dashboard
 * @access Private
 **/
export const getEmployerInfo = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user.id;
    const user = await Employer.findOne({ user: userId }).populate(
      "user",
      "-password"
    );

    if (!user) {
      res.status(404);
      throw new Error("Employer profile not found!");
    }

    res.json({
      status: true,
      message: "Employer information retrieved successfully.",
      data: user,
    });
  }
);

/**
 * Update employer
 * @route PUT /api/employer/update
 * @access Private
 **/
export const employerUpdate = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, email, password, role, ...others } = req.body;
    const userId = req.user.id;
    const employer = await Employer.findOneAndUpdate({ user: userId }, others, {
      new: true,
    }).populate("user", "-password");
    res.json({
      status: true,
      message: "Employer information updated successfully.",
      data: employer,
    });
  }
);
