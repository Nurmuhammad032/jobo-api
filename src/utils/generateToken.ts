import jwt from "jsonwebtoken";
import { Types } from "mongoose";

interface Payload {
  id: Types.ObjectId;
  email: string;
  role: "employer" | "candidate";
}

const generateToken = ({ id, email, role }: Payload) => {
  return jwt.sign({ id, email, role }, process.env.JWT_SEC || "", {
    expiresIn: "30d",
  });
};

export default generateToken;
