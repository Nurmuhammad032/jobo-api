import { Response } from "express";
import { Model, Types } from "mongoose";

export async function getCandidateByUserId<T>(
  userId: Types.ObjectId,
  res: Response,
  Candidate: Model<T>
) {
  const candidate = await Candidate.findOne({ user: userId });

  if (!candidate) {
    res.status(404);
    throw new Error("Candidate not found.");
  }

  return candidate;
}
