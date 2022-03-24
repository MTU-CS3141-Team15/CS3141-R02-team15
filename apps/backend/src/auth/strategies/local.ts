import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import * as argon2 from "argon2";

import prisma from "../../db";

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

        console.log(user);

        if (user && (await argon2.verify(user.password, password))) {
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
