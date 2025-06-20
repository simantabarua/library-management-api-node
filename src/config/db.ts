import mongoose from "mongoose";
import { config } from "./env";

const connectDB = async () => {
  try {
    await mongoose.connect(config.databaseUrl);
    console.log("✅ DB connected");
  } catch (err) {
    console.log("❌ Failed to connect:", err);
  }
};

export default connectDB;
