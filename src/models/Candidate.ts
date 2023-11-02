import mongoose, { InferSchemaType, Types } from "mongoose";

const candidateSchema = new mongoose.Schema({
  user: {
    type: Types.ObjectId,
    ref: "User",
  },
  avatar: String,
  specialization: String,
  educationLevel: String,
  birthday: {
    type: Date,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  about: String,
});

export type ICandidate = InferSchemaType<typeof candidateSchema>;

const Candidate = mongoose.model<ICandidate>("Candidate", candidateSchema);

export default Candidate;
