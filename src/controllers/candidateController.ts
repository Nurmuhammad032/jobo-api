import Candidate from "@/models/Candidate";
import Education, { IEducation } from "@/models/Education";
import validateId from "@/utils/validateId";
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { Types } from "mongoose";

/**
 * Get candidate
 * @route GET /api/candidate/profile
 * @access Private
 **/
export const getCandidateInfo = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user.id;
    const user = await Candidate.findOne({ user: userId }).populate(
      "educations"
    );

    if (!user) {
      res.status(404);
      throw new Error("Candidate profile not found!`");
    }

    res.status(201).json({
      status: true,
      message: "Candidate information retrieved successfully.",
      data: user,
    });
  }
);

// ============= Candidate education ============= //

/**
 * Create education
 * @route POST /api/candidate/profile/education
 * @access Private
 **/
export const createEducation = asyncHandler(
  async (req: Request<{}, {}, IEducation>, res: Response) => {
    const { candidateId, ...others } = req.body;
    const newEducation = new Education({
      candidate: candidateId,
      ...others,
    });

    await newEducation.save();
    await Candidate.findByIdAndUpdate(candidateId, {
      $push: { educations: newEducation.id },
    });

    res.json({
      status: true,
      message: "Education created successfully!",
      data: newEducation,
    });
  }
);

export const updateEducation = asyncHandler(
  async (req: Request<{ id: string }, {}, IEducation>, res: Response) => {
    const educationId = req.params.id;
    validateId(educationId, res);
    const { candidateId, ...others } = req.body;
    const education = await Education.findByIdAndUpdate(
      educationId,
      {
        $set: others,
      },
      { new: true }
    );

    if (!education) {
      res.status(500);
      throw new Error("Failed to update education.");
    }

    res.json({
      status: true,
      message: "Education updated successfully!",
      data: education,
    });
  }
);

// ============= Candidate experience ============= //
/**
 * Create experience (employment)
 * @route POST /api/candidate/profile/experience
 * @access Private
 **/
export const createExperience = asyncHandler(
  async (req: Request, res: Response) => {}
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
