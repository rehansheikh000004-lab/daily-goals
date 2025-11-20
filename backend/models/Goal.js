import mongoose from "mongoose";

const goalSchema = new mongoose.Schema({
  text: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

export default mongoose.model("Goal", goalSchema);
