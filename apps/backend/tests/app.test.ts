import request from "supertest";

import app from "../src/app";

describe("/", () => {
  describe("GET", () => {
    test("standard request", () => {
      return request(app)
        .get("/")
        .then((response) => {
          expect(response.statusCode).toBe(200);
          expect(response.body).toStrictEqual({ status: "success" });
        });
    });
  });
});
