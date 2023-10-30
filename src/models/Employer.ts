import mongoose, { InferSchemaType, Types } from "mongoose";

const employerSchema = new mongoose.Schema({
  user: {
    type: Types.ObjectId,
    ref: "User",
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
