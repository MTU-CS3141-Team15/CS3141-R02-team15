import type { NextFunction, Request, Response } from "express";
import passport from "passport";
import { addAccessTokenCookie, signAccessToken } from "./jwt";

export function refreshAccessToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = signAccessToken(req.user);
  addAccessTokenCookie(res, token);
  next();
}

export default function requireAuth() {
  return (req: Request, res: Response, next: NextFunction) =>
    passport.authenticate("jwt", { session: false })(req, res, () =>
      refreshAccessToken(req, res, next)
    );
}
