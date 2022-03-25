import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

import prisma from "../../db";
import { verifyHash } from "../hash";

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
      try {
        const user = await prisma.user.findUnique({
          where: {
            email: email,
          },
        });

        if (user && (await verifyHash(user.password, password))) {
          return done(null, user);
        } else {
          return done("Incorrect email or password");
        }
      } catch {
        return done("An unexpected error occured");
      }
    }
  )
);
