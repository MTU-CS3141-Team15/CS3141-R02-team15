import request from "supertest";

import prismaMock from "./prisma-mock";

import app from "../src/app";
import { createHash } from "../src/auth/hash";

const user = {
  id: 1,
  firstName: "John",
  lastName: "Doe",
  email: "foo@example.com",
  password: "foo",
  lastLogin: new Date(),
};

describe("/user", () => {
  describe("/register", () => {
    test("POST", async () => {
      prismaMock.user.create.mockResolvedValue({
        ...user,
        password: await createHash(user.password),
      });

      const res = await request(app).post("/user/register").send({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
      });

      expect(res.status).toEqual(200);
      expect(res.body).toStrictEqual({ email: user.email });
    });
  });

  describe("/login", () => {
    test("POST", async () => {
      prismaMock.user.findUnique.mockResolvedValue({
        ...user,
        password: await createHash(user.password),
      });

      const res = await request(app).post("/user/login").send({
        email: user.email,
        password: user.password,
      });

      expect(res.status).toEqual(200);
      expect(res.headers["set-cookie"]).toContainEqual(
        expect.stringContaining("accesstoken=")
      );
    });
  });
});
