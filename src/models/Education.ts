import mongoose, { InferSchemaType } from "mongoose";

const educationSchema = new mongoose.Schema({
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
  endDate: Date,
  description: String,
});

export type IEducation = InferSchemaType<typeof educationSchema>;

const Education = mongoose.model<IEducation>("Education", educationSchema);

export default Education;
