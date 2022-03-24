import type { User } from "@prisma/client";
import type { Response } from "express";

import jwt from "jsonwebtoken";

export interface JWTPayload {
  id: User["id"];
}

export function signAccessToken(user: Pick<User, "id">) {
  const payload = {
    id: user.id,
  };

  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRATION,
  });
}

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: true,
  signed: true,
};

export function addAccessTokenCookie(res: Response, token: string) {
  res.cookie("accesstoken", token, COOKIE_OPTIONS);
}
