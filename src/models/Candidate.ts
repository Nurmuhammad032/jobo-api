import mongoose, { InferSchemaType } from "mongoose";

const candidateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    enum: ["candidate"],
    type: String,
    required: true,
  },
  avatar: String,
  specialization: String,
  educationLevel: String,
  birthday: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  about: {
    type: String,
  },
});

export type ICandidate = InferSchemaType<typeof candidateSchema>;

const Candidate = mongoose.model<ICandidate>("Candidate", candidateSchema);

export default Candidate;
