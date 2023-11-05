import "module-alias/register";
import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import authRoute from "@/routes/auth";
import userRoute from "@/routes/user";
import { notFound, errorHandler } from "@/middleware/errorHandler";
import connectDb from "@/db/mongodb";
dotenv.config();

const app = express();
connectDb();
app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Hello world" });
});

app.use("/api/auth", authRoute);
app.use("/api", userRoute);

app.use(notFound);
app.use(errorHandler);
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log("Server is running at " + PORT);
});
