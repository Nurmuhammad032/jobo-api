import Candidate from "@/models/Candidate";
import { IEducation } from "@/models/Education";
import Employer from "@/models/Employer";
import User from "@/models/User";
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { Model } from "mongoose";

const fetchUserInformation = async <T>(
  req: Request,
  res: Response,
  Model: Model<T>
) => {
  const userId = req.user.id;
  const user = await Model.findOne({ user: userId }).populate(
    "user",
    "-password"
  );

  if (!user) {
    res.status(404);
    throw new Error(`${Model.modelName} profile not found!`);
  }

  res.json({
    status: true,
    message: `${Model.modelName} information retrieved successfully.`,
    data: user,
  });
};

/**
 * Get candidate
 * @route GET /api/candidate/profile
 * @access Private
 **/
export const getCandidateInfo = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user.id;
    const user = await Candidate.findOne({ user: userId }).populate(
      "basicInfo"
    );

    if (!user) {
      res.status(404);
      throw new Error("Candidate profile not found!`");
    }

    res.json({
      status: true,
      message: "Candidate information retrieved successfully.",
      data: user,
    });
  }
);

/**
 * Create education
 * @route POST /api/candidate/profile/education
 * @access Private
 **/
export const createEducation = asyncHandler(
  async (req: Request<{}, {}, IEducation>, res: Response) => {
    const {} = req.body;
  }
);

/**
 * Create experience (employment)
 * @route POST /api/candidate/profile/experience
 * @access Private
 **/
export const createExperience = asyncHandler(
  async (req: Request, res: Response) => {}
);

/**
 * Get employer
 * @route GET /api/employer/dashboard
 * @access Private
 **/
export const getEmployerInfo = asyncHandler(
  async (req: Request, res: Response) => {
    fetchUserInformation(req, res, Employer);
  }
);

/**
 * Update candidate
 * @route PUT /api/candidate/update
 * @access Private
 **/
export const candidateUpdate = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, email, password, role, ...others } = req.body;
    const userId = req.user.id;

    const candidate = await Candidate.findOneAndUpdate(
      { user: userId },
      others,
      { new: true }
    ).populate("user", "-password");
    res.json({
      status: true,
      message: "Candidate information updated successfully.",
      data: candidate,
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
