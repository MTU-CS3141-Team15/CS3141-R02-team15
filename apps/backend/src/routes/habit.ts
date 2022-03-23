import express from "express";
import prisma from "../db";

const habitRouter = express.Router();

// Create a new habit
habitRouter.post("/create", async (req, res) => {
  const { user_id, name, frequency } = req.body; // Will set the var user_id to the user_id value in the JSON... I think?
  const newHabit = await prisma.habit.create({
    data: {
      name: name,
      frequency: frequency,
      creatorId: user_id,
      endDate: "TODO",
    },
  });
});

export default habitRouter;
