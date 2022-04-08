import type { User } from "@prisma/client";

import { Router } from "express";

import "../auth/strategies/local";
import "../auth/strategies/jwt";
import prisma from "../db";
import asyncHandler from "../util/asyncHandler";
import passport from "passport";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import requireAuth, { refreshAccessToken } from "../auth/middleware";
import { createHash } from "../auth/hash";

const router = Router();

type RegisterReqBody = Pick<
  User,
  "firstName" | "lastName" | "password" | "email"
>;

router.post<unknown, unknown, RegisterReqBody>(
  "/register",
  asyncHandler(async (req, res) => {
    const { email, password, firstName, lastName } = req.body;

    try {
      const hash = await createHash(password);
      await prisma.user.create({
        data: {
          email: email,
          password: hash,
          firstName: firstName,
          lastName: lastName,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code == "P2002") {
          res.status(400).send({ error: "Email is alreay in use" });
        } else {
          res.status(500).send({ error: `Prisma Error: ${error.code}` });
        }
      }
      res.status(500).send({ error: "An unexpected error has occurred" });
    }

    res.status(200).send({ email });
  })
);

router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  refreshAccessToken,
  (req, res) => {
    res.send();
  }
);

export default router;
