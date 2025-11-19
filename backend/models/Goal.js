import mongoose from "mongoose";

const GoalSchema = new mongoose.Schema({
  text: String,
  completed: { type: Boolean, default: false },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

export default mongoose.model("Goal", GoalSchema);
