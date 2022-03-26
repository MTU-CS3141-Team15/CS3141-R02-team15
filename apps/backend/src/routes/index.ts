import type { Application } from "express";
import authRouter from "./auth";
import habitRouter from "./habit";

/**
 * Sets up routes on the given express app
 *
 * @param app The express app to register routes on
 */
export function registerRoutes(app: Application): void {
  app.use("/user", authRouter);
  app.use("/habits", habitRouter);
}
