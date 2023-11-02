import { errorConstants } from "@/constants";
import { NextFunction, Request, Response } from "express";

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode =
    res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
  console.log("errror--------------", err.message);
  console.log("statusCode-------", statusCode);
  switch (statusCode) {
    case errorConstants.VALIDATION_ERROR:
      res.json({
        status: false,
        title: "Validation error",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case errorConstants.NOT_FOUND:
      res.json({
        status: false,
        title: "Not found",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case errorConstants.UNAUTHORIZED:
      res.json({
        status: false,
        title: "Unauthorized",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case errorConstants.FORBIDDEN:
      res.json({
        status: false,
        title: "Forbidden",
        message: err.message,
        stackTrace: err.stack,
      });
    case errorConstants.SERVER_ERROR:
      res.json({
        status: false,
        title: "Server Error",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    default:
      console.log("No error, All good!");
      break;
  }
};

export default errorHandler;
