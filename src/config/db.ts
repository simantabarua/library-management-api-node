import mongoose from "mongoose";
import { config } from "./env";

const connectDB = async () => {
  try {
    await mongoose.connect(config.databaseUrl);
    console.log("db connected");
  } catch {
    console.log("failed to connect");
  }
};
export default connectDB;
