import request from "supertest";
import app from "../../src/app";
import UserDTO from "../../src/dto/UserDTO";
import db from "../../src/database";
import { HTTP } from "../../src/utils/constants";

describe("POST /api/v1/customers", () => {
    beforeAll(async () => {
        const connection = await db.connect();
        await connection.runMigrations();
    })

    beforeEach(async () => {
        await db.truncate();
    });

    afterAll(async () => {
        await db.truncate();
        await db.close();
    })

    test("Should create a new customer", async () => {
        const userData: UserDTO = {
            firstName: "John",
            lastName: "Doe",
            email: "jdoe@email.com",
            password: "bigboobs69",
            isAdmin: false
        }

        const response = await request(app).post("/api/v1/customers").send(userData);

        expect(response.status).toEqual(HTTP.Created);
        expect(response.body).toHaveProperty("data.customer.id");
    })

    test("Shouldn't create a customer that already exists", async () => {
        const userData1: UserDTO = {
            firstName: "John",
            lastName: "Doe",
            email: "jdoe@email.com",
            password: "bigboobs69",
            isAdmin: false
        }

        const userData2: UserDTO = {
            firstName: "Jane",
            lastName: "Doe",
            email: "jdoe@email.com",
            password: "42069",
            isAdmin: false
        }

        await request(app).post("/api/v1/customers").send(userData1);
        const response = await request(app).post("/api/v1/customers").send(userData2);

        expect(response.status).toEqual(HTTP.BadRequest);
        expect(response.body).toHaveProperty("status", "error")
        expect(response.body).toHaveProperty("message", "Email address already in use")
    })

    test("Shouldn't create a customer with an already registered CPF", async () => {
        const userData1: UserDTO = {
            firstName: "John",
            lastName: "Doe",
            email: "jdoe@email.com",
            password: "bigboobs69",
            cpf: "123876123",
            isAdmin: false
        }

        const userData2: UserDTO = {
            firstName: "Jane",
            lastName: "Doe",
            email: "janedoe@email.com",
            password: "42069",
            cpf: "123876123",
            isAdmin: false
        }

        await request(app).post("/api/v1/customers").send(userData1);
        const response = await request(app).post("/api/v1/customers").send(userData2);

        expect(response.status).toEqual(HTTP.BadRequest);
        expect(response.body).toHaveProperty("status", "error")
        expect(response.body).toHaveProperty("message", "CPF already registered")
    })
})
