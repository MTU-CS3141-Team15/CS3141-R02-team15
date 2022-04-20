import { agent, SuperAgentTest } from "supertest";
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

const habit = {
  id: 1,
  name: "jog",
  dateCreated: new Date(Date.now()),
  endDate: new Date(Date.now()),
  frequency: 4,
  creator: user,
  creatorId: 1,
};

const checkIn = {
  id: 1,
  date: new Date(Date.now()),
  taskMet: true,
  habitId: 1,
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

describe("/habits", () => {
  describe("GET", () => {
    test("View a single habit", async () => {
      prismaMock.habit.findUnique.mockResolvedValue(habit);

      const res = await request.get("/habits/1");

      expect(res.statusCode).toBe(200);
      expect(res.body).toStrictEqual(JSON.parse(JSON.stringify(habit)));
    });

    test("View all habit", async () => {
      prismaMock.habit.findMany.mockResolvedValue([habit]);

      const res = await request.get("/habits/");

      expect(res.statusCode).toBe(200);
      expect(res.body).toStrictEqual(JSON.parse(JSON.stringify([habit])));
    });

    test("View habit progress", async () => {
      prismaMock.habit.findUnique.mockResolvedValue(habit);
      prismaMock.checkIn.findMany.mockResolvedValue([checkIn]);

      const res = await request.get("/habits/1/progress");

      expect(res.statusCode).toBe(200);
      expect(res.body).toStrictEqual(JSON.parse(JSON.stringify([checkIn])));
    });
  });

  describe("POST", () => {
    test("Create a single habit", async () => {
      prismaMock.habit.create.mockResolvedValue(habit);

      const res = await request.post("/habits/").send({
        name: habit.name,
        endDate: habit.endDate,
      });

      expect(res.status).toEqual(200);
    });
  });

  describe("DELETE", () => {
    test("Delete a single habit", async () => {
      prismaMock.habit.delete.mockResolvedValue(habit);

      const res = await request.delete("/habits/1").send({
        name: habit.name,
        endDate: habit.endDate,
      });
      expect(res.status).toBe(200);
      expect(res.body).toStrictEqual(JSON.parse(JSON.stringify(habit)));
    });
  });

  describe("PUT", () => {
    test("Edit a habit", async () => {
      const newChanges = {
        name: "not Jog",
        endDate: new Date("2022-05-31"),
      };

      prismaMock.habit.findFirst.mockResolvedValue(habit);
      prismaMock.habit.update({
        where: {
          id: habit.id,
          // description: description,
        },
        data: {
          name: newChanges.name,
          endDate: newChanges.endDate,
        },
      });

      const res = await request.put("/habits/1").send({
        name: newChanges.name,
        endDate: newChanges.endDate,
      });

      expect(res.status).toEqual(200);
    });
  });
});

describe("/habits/update", () => {
  describe("POST", () => {
    test("Update a habits progress", async () => {
      prismaMock.habit.findFirst.mockResolvedValue(habit);
      prismaMock.checkIn.create.mockResolvedValue(checkIn);

      const res = await request.post("/habits/1/progress").send({
        taskMet: checkIn.taskMet,
        endDate: checkIn.habitId,
      });

      expect(res.status).toEqual(200);
    });
  });
});
