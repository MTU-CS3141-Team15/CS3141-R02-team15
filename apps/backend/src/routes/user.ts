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

    if (userInfo) {
      const { firstName, lastName, email, id } = userInfo;
      res.send({
        firstName: firstName,
        lastName: lastName,
        email: email,
        id: id,
      });
    } else {
      res.send(400);
    }
  })
);

export default router;
