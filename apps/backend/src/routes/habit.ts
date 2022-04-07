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

// Update a habit
router.post(
  "/:id/progress",
  asyncHandler(async (req, res) => {
    const { taskMet } = req.body as { taskMet: boolean };
    const habitId = parseInt(req.params.id);
    const userId = req.user.id;

    // Check if the user is updating a habit associated with their account only
    const habit = await prisma.habit.findUnique({
      where: {
        id: habitId,
      },
    });

    if (habit?.creatorId == null || habit?.creatorId != userId) {
      console.log(habit?.creatorId);
      res.status(400).send();
      return;
    }

    const updateCheckIn = await prisma.checkIn.create({
      data: {
        taskMet: taskMet,
        habitId: habitId,
      },
    });

    res.send(updateCheckIn);
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
