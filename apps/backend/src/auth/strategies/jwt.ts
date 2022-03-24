import type { Request } from "express";
import passport from "passport";
import { Strategy as JWTStrategy } from "passport-jwt";

import prisma from "../../db";
import type { JWTPayload } from "../jwt";

passport.use(
  new JWTStrategy(
    {
      secretOrKey: process.env.ACCESS_TOKEN_SECRET,
      jwtFromRequest: (req: Request) => req.signedCookies.accesstoken,
      jsonWebTokenOptions: {
        maxAge: process.env.ACCESS_TOKEN_EXPIRATION,
      },
    },
    async (payload: JWTPayload, done) => {
      const user = await prisma.user.findUnique({
        where: {
          id: payload.id,
        },
      });

      if (user) {
        return done(null, user);
      } else {
        return done("Invalid Token");
      }
    }
  )
);
