import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { NextFunction, Request, Response } from "express";

const checkRole = (role: "employer" | "candidate") => {
  return asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const authorization = req.headers.authorization;

      if (!authorization) {
        res.status(401);
        throw new Error(
          "Authorization header is not provided. Please include a valid 'Bearer' token."
        );
      } else if (!authorization?.startsWith("Bearer")) {
        res.status(401);
        throw new Error("Invalid token type. Expected 'Bearer'");
      }
      const token = authorization.split(" ")[1];
      try {
        const decoded = jwt.verify(
          token,
          process.env.JWT_SEC!
        ) as jwt.JwtPayload;
        if (!decoded || !decoded.role) {
          res.status(401);
          throw new Error("Invalid token or user role not found.");
        }

        const userRole = decoded.role;
        const user = {
          id: decoded.id,
          email: decoded.email,
          role: decoded.role,
        };

        if (userRole === role) {
          // Role matches, continue with the request.
          req.user = user;
          next();
        } else {
          const err = new Error(
            "Access denied. User doesn't have the required role."
          );
          res.status(403);
          next(err);
        }
      } catch {
        // Handle the JWT verification error and throw a custom error message.
        res.status(401);
        throw new Error(
          "Invalid token. Please provide a valid authentication token."
        );
      }
    }
  );
};
export default checkRole;
