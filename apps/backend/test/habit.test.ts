import request from "supertest";
import prismaMock from "./prisma-mock";
import app from "../src/app";

describe("/habits", () => {
  describe("GET", () => {
    const habit = {
      id: 1,
      name: "jog",
      dateCreated: new Date(Date.now()),
      endDate: new Date(Date.now()),
      frequency: "4",
      creator: "Bob",
      creatorId: 12345,
    };

    const habitRes = {
      ...habit,
      dateCreated: habit.dateCreated.getTime(),
      endDate: habit.endDate.getTime(),
    };

    test("standard request", () => {
      prismaMock.habit.findMany.mockResolvedValue([habit]);
      return request(app)
        .get("/habits/1")
        .then((response) => {
          expect(response.statusCode).toBe(200);
          expect(response.body).toStrictEqual([habitRes]);
        });
    });
  });
});
