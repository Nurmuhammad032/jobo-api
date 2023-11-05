import { ICandidate } from "@/models/Candidate";
import { IEmployer } from "@/models/Employer";
import { IUser } from "@/models/User";

export {};

declare module "express-serve-static-core" {
  interface Request {
    user: any;
  }
}
