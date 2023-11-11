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
  currentEducate: {
    type: Boolean,
    default: false,
  },
  endDate: {
    type: Date,
    default: null,
  },
  description: {
    type: String,
    default: null,
  },
});

type IEducationSchema = InferSchemaType<typeof educationSchema>;
export interface IEducation extends Omit<IEducationSchema, "candidate"> {
  candidateId: string;
}

const Education = mongoose.model<IEducation>("Education", educationSchema);

export default Education;
