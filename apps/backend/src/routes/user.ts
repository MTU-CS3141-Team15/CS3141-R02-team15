import { User } from "@prisma/client";
import { Router } from "express";
import requireAuth from "../auth/middleware";
import prisma from "../db";
import asyncHandler from "../util/asyncHandler";

const router = Router();

router.use(requireAuth());

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const userInfo = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
    });

    if (!userInfo) {
      res.send(400);
      return;
    }

    const { firstName, lastName, email, id } = userInfo;
    res.send({
      firstName: firstName,
      lastName: lastName,
      email: email,
      id: id,
    });
  })
);

router.put(
  "/",
  asyncHandler(async (req, res) => {
    const data = req.body as Partial<User>;

    // Delete any invalid fields from the data
    delete data.id;
    delete data.lastLogin;

    const userInfo = await prisma.user.update({
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
      },
      where: {
        id: req.user.id,
      },
      data: data,
    });

    res.send(userInfo);
  })
);

export default router;
