import Candidate from "@/models/Candidate";
import Education, { IEducation } from "@/models/Education";
import { getCandidateByUserId } from "@/utils/getCandidateById";
import validateId from "@/utils/validateId";
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

// ============= Candidate education ============= //

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

/**
 * Create education
 * @route POST /api/candidate/profile/education
 * @access Private
 **/
export const createEducation = asyncHandler(
  async (req: Request<{}, {}, IEducation>, res: Response) => {
    const userId = req.user.id;
    const candidate = await getCandidateByUserId(userId, res, Candidate);
    const newEducation = new Education({
      candidate: candidate.id,
      ...req.body,
    });

    await newEducation.save();
    await Candidate.findByIdAndUpdate(candidate.id, {
      $push: { educations: newEducation.id },
    });

    res.json({
      status: true,
      message: "Education created successfully!",
      data: newEducation,
    });
  }
);

/**
 * Update education by id
 * @route POST /api/candidate/profile/education/:id
 * @access Private
 **/
export const updateEducation = asyncHandler(
  async (req: Request<{ id: string }, {}, IEducation>, res: Response) => {
    const educationId = req.params.id;
    validateId(educationId, res);
    const userId = req.user.id;
    const candidate = await getCandidateByUserId(userId, res, Candidate);

    const updatedEducation = await Education.findOneAndUpdate(
      {
        _id: educationId,
        candidate: candidate.id,
      },
      req.body,
      { new: true }
    );

    if (!updatedEducation) {
      res.status(500);
      throw new Error("Failed to update education.");
    }

    res.json({
      status: true,
      message: "Education updated successfully!",
      data: updatedEducation,
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
