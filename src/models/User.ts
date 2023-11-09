import mongoose, { InferSchemaType } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
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

export interface IUser extends InferSchemaType<typeof userSchema> {
  matchPassword(enteredPassword: string): Promise<boolean>;
}

userSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model<IUser>("User", userSchema);

export default User;
