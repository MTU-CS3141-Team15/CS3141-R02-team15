import { Router } from "express";
import prisma from "../db";
import { formatHabits } from "../util/dateFormating";

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

// View a habit by id
router.get("/:id", async (req, res) => {
  //const { user_id } = req.body; // TODO: Will need to change user_id to come from req.user
  const id = parseInt(req.params.id);
  const habits = await prisma.habit.findMany({
    where: {
      id: id,
    },
  });

  res.send(formatHabits(habits));
});

export default router;
