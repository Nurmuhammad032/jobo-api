import mongoose, { InferSchemaType } from "mongoose";

const educationSchema = new mongoose.Schema({
  candidate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Candidate",
    required: true,
    immutable: true,
  },
  school: {
    type: String,
    required: true,
  },
  degree: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    default: null,
  },
  currentEducate: {
    type: Boolean,
    default: false,
  },
  description: {
    type: String,
    default: null,
  },
});

type IEducationSchema = InferSchemaType<typeof educationSchema>;
export type IEducation = Omit<IEducationSchema, "candidate">;

const Education = mongoose.model<IEducation>("Education", educationSchema);

export default Education;
