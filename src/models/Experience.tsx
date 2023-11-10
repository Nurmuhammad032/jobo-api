import mongoose, { InferSchemaType, Types } from "mongoose";

const experienceSchema = new mongoose.Schema({
  position: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: Date,
  currentEmployment: {
    type: Boolean,
    default: false,
  },
  description: String,
  employmentLength: {
    type: String,
    required: true,
  },
});

export type IExperience = InferSchemaType<typeof experienceSchema>;

const Experience = mongoose.model("Experience", experienceSchema);

export default Experience;
