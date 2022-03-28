import { Router } from "express";
import requireAuth from "../auth/middleware";
import prisma from "../db";
import asyncHandler from "../util/asyncHandler";

const router = Router();

router.use(requireAuth());

// Create a new habit
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const creatorId = req.user.id;
    const { name, endDate } = req.body as { name: string; endDate: string };

    const newHabit = await prisma.habit.create({
      data: {
        name: name,
        frequency: 0,
        endDate: new Date(endDate),
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

// View all habit
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const habit = await prisma.habit.findMany({
      where: {
        creatorId: userId,
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
