import express from "express";
import Goal from "../models/Goal.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// Middleware to check token
function auth(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.userId = user.id;
    next();
  });
}

// GET Goals
router.get("/", auth, async (req, res) => {
  const goals = await Goal.find({ userId: req.userId });
  res.json(goals);
});

// Add Goal
router.post("/", auth, async (req, res) => {
  const goal = await Goal.create({
    text: req.body.text,
    userId: req.userId
  });
  res.json(goal);
});

// Delete Goal
router.delete("/:id", auth, async (req, res) => {
  await Goal.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

export default router;
