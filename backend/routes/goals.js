import express from "express";
import Goal from "../models/Goal.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.get("/", auth, async (req, res) => {
  const goals = await Goal.find({ user: req.user });
  res.json(goals);
});

router.post("/", auth, async (req, res) => {
  const goal = await Goal.create({
    text: req.body.text,
    user: req.user
  });
  res.json(goal);
});

router.put("/:id", auth, async (req, res) => {
  const updated = await Goal.findByIdAndUpdate(
    req.params.id,
    { completed: req.body.completed },
    { new: true }
  );
  res.json(updated);
});

router.delete("/:id", auth, async (req, res) => {
  await Goal.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
});

export default router;
