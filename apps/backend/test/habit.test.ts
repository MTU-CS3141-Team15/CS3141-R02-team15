import request from "supertest";
import prismaMock from "./prisma-mock";
import app from "../src/app";

describe("/habits", () => {
  const habit = {
    id: 1,
    name: "jog",
    dateCreated: new Date(Date.now()),
    endDate: new Date(Date.now()),
    frequency: "4",
    creator: "Bob",
    creatorId: 12345,
  };

  // Format habit correctly
  const habitRes = {
    ...habit,
    dateCreated: habit.dateCreated.getTime(),
    endDate: habit.endDate.getTime(),
  };

  describe("GET", () => {
    test("View a single habit", () => {
      prismaMock.habit.findMany.mockResolvedValue([habit]);
      console.log(prismaMock.habit.findMany.mock);
      return request(app)
        .get("/habits/1")
        .then((response) => {
          expect(response.statusCode).toBe(200);
          expect(response.body).toStrictEqual([habitRes]);
        });
    });
  });

  describe("POST", () => {
    test("Create a single habit", () => {
      prismaMock.habit.create.mockResolvedValue(habit);
      return request(app)
        .post("/habits/")
        .send({
          id: habit.id,
          name: habit.name,
          dateCreated: habit.dateCreated,
          endDate: habit.endDate,
          frequency: habit.frequency,
          creater: habit.creator,
          creatorId: habit.creatorId,
        })
        .expect(200);
    });
  });
});
