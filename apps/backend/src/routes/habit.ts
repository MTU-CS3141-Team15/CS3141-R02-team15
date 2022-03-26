import { Router } from "express";
import requireAuth from "../auth/middleware";
import prisma from "../db";
import asyncHandler from "../util/asyncHandler";
import { formatHabits, formatHabit } from "../util/dateFormating";

const router = Router();

router.use(requireAuth());

// Create a new habit
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const creatorId = req.user.id;
    const { name, endDate } = req.body as any;

    const newHabit = await prisma.habit.create({
      data: {
        name: name,
        frequency: 0,
        endDate: endDate,
        creatorId: creatorId,
      },
    });
    res.send(newHabit);
  })
);

// View a habit by id
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const habitId = parseInt(req.params.id);
    const creatorId = req.user.id;
    const habit = await prisma.habit.findUnique({
      where: {
        id: habitId,
      },
    });

    if (habit) {
      res.send(habit);
    } else {
      res.status(400).send();
    }
  })
);

export default router;
