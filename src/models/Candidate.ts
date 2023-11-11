import mongoose, { InferSchemaType, Types } from "mongoose";

const candidateSchema = new mongoose.Schema({
  user: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
    immutable: true,
  },
  basicInfo: {
    type: Types.ObjectId,
    ref: "BasicInfo",
  },
  educations: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Education",
    },
  ],
  experiences: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Experience",
    },
  ],
});

export type ICandidate = InferSchemaType<typeof candidateSchema>;

const Candidate = mongoose.model("Candidate", candidateSchema);

export default Candidate;
