import { Router } from "express";
import prisma from "../db";

const router = Router();

// Create a new habit
router.post("/", async (req, res) => {
  const { user_id, name, frequency } = req.body; // TODO: Will need to change user_id to come from req.user
  const newHabit = await prisma.habit.create({
    data: {
      name: name,
      frequency: frequency,
      creatorId: user_id,
      endDate: "TODO",
    },
  });
});

// View Habit
router.get("/", async (req, res) => {
  const { user_id } = req.body; // TODO: Will need to change user_id to come from req.user
  const habit = await prisma.habit.findMany({
    where: {
      creatorId: user_id,
    },
  });
});

export default router;
