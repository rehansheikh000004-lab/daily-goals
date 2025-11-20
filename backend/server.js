import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";
import goalRoutes from "./routes/goals.js";

dotenv.config();
const app = express();
app.use(express.json());

// CORS FIX (100% works)
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
  })
);

// DB connect
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connected"))
  .catch((e) => console.error("DB Error:", e));

app.use("/api/auth", authRoutes);
app.use("/api/goals", goalRoutes);

app.get("/", (req, res) => res.send("Backend running"));
app.listen(5000, () => console.log("Server running on port 5000"));
