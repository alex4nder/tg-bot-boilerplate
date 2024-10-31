import request from "supertest";
import app from "../src/app";
import { AppDataSource } from "@repo/db";

beforeAll(async () => {
  await AppDataSource.initialize();
});

afterAll(async () => {
  await AppDataSource.destroy();
});

describe("User API", () => {
  it("POST /users - should create a new user", async () => {
    const newUser = {
      name: "John Doe",
      email: "john.doe@example.com",
      password: "securePassword123",
    };

    const response = await request(app).post("/users").send(newUser);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.name).toBe(newUser.name);
    expect(response.body.email).toBe(newUser.email);
  });

  it("POST /users - should fail with invalid data", async () => {
    const response = await request(app).post("/users").send({});

    expect(response.status).toBe(500);
    expect(response.body.message).toBe("Failed to create user");
  });
});
