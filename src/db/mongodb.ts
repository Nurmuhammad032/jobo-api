import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(`${process.env.CONNECTION_STRING}`);
    console.log("Database is connected successfully!");
  } catch (error) {
    console.log(`Error connecting to databse: ${error}`);
  }
};
