import { Router } from "express";
import prisma from "../db";
import { formatHabits, formatHabit } from "../util/dateFormating";

const router = Router();

// Create a new habit
router.post("/", async (req, res) => {
  const creatorId = req.body.creatorId;
  const { name, endDate } = req.body; // TODO: Will need to change user_id to come from req.user

  const newHabit = await prisma.habit.create({
    data: {
      name: name,
      frequency: 0,
      endDate: endDate,
      creatorId: creatorId,
    },
  });
  res.send(formatHabit(newHabit));
});

// View a habit by id
router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const habits = await prisma.habit.findMany({
    where: {
      id: id,
    },
  });
  res.send(formatHabits(habits));
});

export default router;
