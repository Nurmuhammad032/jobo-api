import "module-alias/register";
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import authRoute from "@/routes/authRoute";
import candidateRoute from "@/routes/candidateRoute";
import employerRoute from "@/routes/employerRoute";
import { notFound, errorHandler } from "@/middleware/errorHandler";
import connectDb from "@/db/mongodb";
dotenv.config();

const app = express();
connectDb();
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/employer", employerRoute);
app.use("/api/candidate", candidateRoute);

app.use(notFound);
app.use(errorHandler);
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log("Server is running at " + PORT);
});
