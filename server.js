import mongoose from "mongoose";

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("🟢 Connected to MongoDB"))
  .catch((err) => console.error("🔴 MongoDB connection error:", err));
