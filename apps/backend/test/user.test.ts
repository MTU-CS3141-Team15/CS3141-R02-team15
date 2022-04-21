import { agent, SuperAgentTest } from "supertest";
import prismaMock from "./prisma-mock";
import app from "../src/app";
import { createHash } from "../src/auth/hash";
import { User } from "@prisma/client";

const user = {
  id: 1,
  firstName: "John",
  lastName: "Doe",
  email: "foo@example.com",
  password: "foo",
  lastLogin: new Date(),
};

let request: SuperAgentTest;

beforeEach(async () => {
  request = agent(app);

  prismaMock.user.findUnique.mockResolvedValue({
    ...user,
    password: await createHash(user.password),
  });

  const res = await request.post("/user/login").send({
    email: user.email,
    password: user.password,
  });

  expect(res.status).toEqual(200);

  request.set("Cookie", res.headers["set-cookie"]);
});

describe("/user", () => {
  describe("/", () => {
    test("GET", async () => {
      const userInfo = {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        id: user.id,
      };

      prismaMock.user.findUnique.mockResolvedValue(user);
      const res = await request.get("/user");

      expect(res.status).toEqual(200);
      expect(res.body).toStrictEqual(userInfo);
    });

    test("PUT", async () => {
      const userInfo = {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        id: user.id,
      };

      const reqBody = {
        emai: userInfo.email,
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
      };

      prismaMock.user.update.mockResolvedValue(
        userInfo as User /* Hack to trick prisma into mocking */
      );
      const res = await request.put("/user").send(reqBody);

      expect(res.status).toEqual(200);
      expect(res.body).toStrictEqual(userInfo);
    });
  });
});
