import { Response } from "express";
import mongoose from "mongoose";

const validateId = (id: string, res: Response) => {
  const isValid = mongoose.Types.ObjectId.isValid(id);
  if (!isValid) {
    res.status(400);
    throw new Error("Please provide valid education id");
  }
};

export default validateId;
