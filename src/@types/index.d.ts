import { ICandidate } from "@/models/Candidate";
import { IEmployer } from "@/models/Employer";

export {};

declare module "express-serve-static-core" {
  interface Request {
    user: IEmployer | ICandidate;
  }
}
