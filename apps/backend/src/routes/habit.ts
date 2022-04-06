import { Router } from "express";
import { userInfo } from "os";
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

router.post(
  "/:id/progress",
  asyncHandler(async (req, res) => {
    const { taskMet } = req.body as { taskMet: boolean };
    const habitId = parseInt(req.params.id);
    const userId = req.user.id;

    // Check if the user is updating a habit associated with their account only
    const habit = await prisma.habit.findFirst({
      where: {
        id: habitId,
        creatorId: userId,
      },
    });

    if (!habit) {
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

router.get(
  "/:id/progress",
  asyncHandler(async (req, res) => {
    const habitId = parseInt(req.params.id);

    const checkIns = await prisma.checkIn.findMany({
      where: {
        habitId: habitId,
        habit: {
          creatorId: req.user.id,
        },
      },
    });

    res.send(checkIns);
  })
);

// Delete a habit
router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    //First identify the id
    const habitId = parseInt(req.params.id); //This should paras the string id to int.

    /* This query should deletes a specific habit and
         it uses select to return the name and end date of the deleted habit.
         Not sure if this is userful but I'll keep it in for now.*/
    const habit = await prisma.habit.delete({
      where: {
        id: habitId,
      },
      select: {
        name: true,
        endDate: true,
      },
    });

    if (habit) {
      res.send(habit); //res here should return the select
    } else {
      res.status(400).send(); //res return error
    }
  })
);

/**
// Delete many habits - Notes: will need further development after we implement select features
router.delete('/',
      asyncHandler(async(req, res) =>{
        const habitId = parseInt(req.params.id); //Find id

        /** 
         * Tihs functions will first have to find all the selected habits and their ids.
         * Then it will then delete all of the habits that contain that id.
         * For now I am thinking it might have something to do with findMany() and deleteMany().
        
        const habit = await prisma.habit.deleteMany({
          where:{
            id: habitId,
          }
        });
      })
);
*/
export default router;
