import request from "supertest";
import app from "../../src/app";
import UserDTO from "../../src/dto/UserDTO";
import db from "../../src/database";
import { HTTP } from "../../src/utils/constants";

describe("POST /api/v1/admins", () => {
    beforeAll(async () => {
        const connection = await db.connect();
        await connection.runMigrations();
    });

    beforeEach(async () => {
        await db.truncate();
    });

    afterAll(async () => {
        await db.truncate();
        await db.close();
    });

    test("Should create a new admin", async () => {
        const userData: UserDTO = {
            firstName: "John",
            lastName: "Doe",
            email: "jdoe@email.com",
            password: "bigboobs69",
            isAdmin: true
        };

        const response = await request(app)
            .post("/api/v1/admins")
            .send(userData);

        expect(response.status).toEqual(HTTP.Created);
        expect(response.body).toHaveProperty("data.admin.id");
    });

    test("Shouldn't create an admin that already exists", async () => {
        const userData1: UserDTO = {
            firstName: "John",
            lastName: "Doe",
            email: "jdoe@email.com",
            password: "bigboobs69",
            isAdmin: true
        };

        const userData2: UserDTO = {
            firstName: "Jane",
            lastName: "Doe",
            email: "jdoe@email.com",
            password: "42069",
            isAdmin: true
        };

        await request(app).post("/api/v1/admins").send(userData1);
        const response = await request(app)
            .post("/api/v1/admins")
            .send(userData2);

        expect(response.status).toEqual(HTTP.BadRequest);
        expect(response.body).toHaveProperty("status", "error");
        expect(response.body).toHaveProperty(
            "message",
            "Email address already in use"
        );
    });
});
