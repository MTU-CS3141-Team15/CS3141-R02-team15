import type { RequestHandler } from "express";
import type { ParamsDictionary, Query } from "express-serve-static-core";

export default function asyncHandler<
  P = ParamsDictionary,
  ResBody = unknown,
  ReqBody = unknown,
  ReqQuery = Query,
  Locals extends Record<string, unknown> = Record<string, unknown>
>(
  handler: (
    ...args: Parameters<RequestHandler<P, ResBody, ReqBody, ReqQuery, Locals>>
  ) => Promise<void>
): RequestHandler<P, ResBody, ReqBody, ReqQuery, Locals> {
  return (req, res, next) => handler(req, res, next).catch(next);
}
