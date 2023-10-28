import mongoose, { InferSchemaType } from "mongoose";

const employerSchema = new mongoose.Schema({
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
    enum: ["employer"],
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  ownedDate: {
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

export type IEmployer = InferSchemaType<typeof employerSchema>;

const Employer = mongoose.model<IEmployer>("Employer", employerSchema);

export default Employer;
