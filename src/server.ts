import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import authRoute from "./routes/auth";
dotenv.config();

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Hello world" });
});
app.use("/api/auth", authRoute);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log("Server is running at " + PORT);
});
