import mongoose, { InferSchemaType } from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    enum: ["candidate", "employer"],
    type: String,
    required: true,
  },
});

export type IUser = InferSchemaType<typeof userSchema>;

const User = mongoose.model<IUser>("User", userSchema);

export default User;
