import request from "supertest";
import app from "../../src/app";
import UserDTO from "../../src/dto/UserDTO";
import db from "../../src/database";
import { HTTP } from "../../src/utils/constants";

describe("CustomerController", () => {
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

    describe("POST /v1/customers", () => {
        test("Should create a new customer and return his data without exposing his password", async () => {
            const customerData: UserDTO = {
                firstName: "John",
                lastName: "Doe",
                email: "jdoe@email.com",
                password: "bigboobs69",
                passwordConfirmation: "bigboobs69",
                isAdmin: false
            };

            const { password, passwordConfirmation, ...customerDataWithoutPassword } = customerData;

            const response = await request(app)
                .post("/v1/customers")
                .send(customerData);

            const { customer } = response.body.data;

            expect(response.status).toEqual(HTTP.Created);
            expect(customer).toMatchObject(customerDataWithoutPassword);
            expect(customer).not.toHaveProperty(
                "password",
                customerData.password
            );
        });

        test("Shouldn't create a customer that already exists", async () => {
            const userData1: UserDTO = {
                firstName: "John",
                lastName: "Doe",
                email: "jdoe@email.com",
                password: "bigboobs69",
                passwordConfirmation: "bigboobs69",
                isAdmin: false
            };

            const userData2: UserDTO = {
                firstName: "Jane",
                lastName: "Doe",
                email: "jdoe@email.com",
                password: "42069",
                passwordConfirmation: "42069",
                isAdmin: false
            };

            await request(app).post("/v1/customers").send(userData1);
            const response = await request(app)
                .post("/v1/customers")
                .send(userData2);

            expect(response.status).toEqual(HTTP.BadRequest);
            expect(response.body).toHaveProperty("status", "error");
            expect(response.body).toHaveProperty(
                "message",
                "Email address already in use"
            );
        });

        test("Shouldn't create a customer with an already registered CPF", async () => {
            const userData1: UserDTO = {
                firstName: "John",
                lastName: "Doe",
                email: "jdoe@email.com",
                password: "bigboobs69",
                passwordConfirmation: "bigboobs69",
                cpf: "123876123",
                isAdmin: false
            };

            const userData2: UserDTO = {
                firstName: "Jane",
                lastName: "Doe",
                email: "janedoe@email.com",
                password: "42069",
                passwordConfirmation: "42069",
                cpf: "123876123",
                isAdmin: false
            };

            await request(app).post("/v1/customers").send(userData1);
            const response = await request(app)
                .post("/v1/customers")
                .send(userData2);

            expect(response.status).toEqual(HTTP.BadRequest);
            expect(response.body).toHaveProperty("status", "error");
            expect(response.body).toHaveProperty(
                "message",
                "CPF already registered"
            );
        });
    });

    describe("GET /v1/customers", () => {
        test("Should list all registered customers without exposing their passwords", async () => {
            const customer1: UserDTO = {
                firstName: "John",
                lastName: "Doe",
                email: "jdoe@email.com",
                password: "bigboobs69",
                passwordConfirmation: "bigboobs69",
                isAdmin: false
            };

            const customer2: UserDTO = {
                firstName: "Jane",
                lastName: "Doe",
                email: "janedoe@email.com",
                password: "bigboobs69",
                passwordConfirmation: "bigboobs69",
                isAdmin: false
            };

            const admin: UserDTO = {
                firstName: "Mateo",
                lastName: "Doe",
                email: "mdoe@email.com",
                password: "bigboobs69",
                passwordConfirmation: "bigboobs69",
                isAdmin: true
            };

            const users = [customer1, customer2, admin];

            const customers = await Promise.all(
                users.map(async user => {
                    const response = await request(app)
                        .post("/v1/customers")
                        .send(user);
                    return response.body.data.customer;
                })
            );

            const response = await request(app).get("/v1/customers");

            const customersResponse = response.body.data.customers;

            expect(response.status).toEqual(HTTP.Ok);
            expect(customersResponse).toEqual(
                expect.arrayContaining([
                    expect.objectContaining(customers[0]),
                    expect.objectContaining(customers[1])
                ])
            );
            expect(customersResponse).not.toEqual(
                expect.arrayContaining([expect.objectContaining(customers[2])])
            );
        });
    });

    describe("GET /v1/customers/:customerId", () => {
        test("Should get a customer without exposing his password", async () => {
            const customer1: UserDTO = {
                firstName: "John",
                lastName: "Doe",
                email: "jdoe@email.com",
                password: "bigboobs69",
                passwordConfirmation: "bigboobs69",
                isAdmin: false
            };

            const customer2: UserDTO = {
                firstName: "Jane",
                lastName: "Doe",
                email: "janedoe@email.com",
                password: "bigboobs69",
                passwordConfirmation: "bigboobs69",
                isAdmin: false
            };

            const admin: UserDTO = {
                firstName: "Mateo",
                lastName: "Doe",
                email: "mdoe@email.com",
                password: "bigboobs69",
                passwordConfirmation: "bigboobs69",
                isAdmin: true
            };

            const users = [customer1, customer2, admin];

            const customers = await Promise.all(
                users.map(async user => {
                    const response = await request(app)
                        .post("/v1/customers")
                        .send(user);
                    return response.body.data.customer;
                })
            );

            const response = await request(app).get(
                `/v1/customers/${customers[0].id}`
            );

            const { customer } = response.body.data;

            expect(response.status).toEqual(HTTP.Ok);
            expect(customer).toEqual(expect.objectContaining(customers[0]));
            expect(customer).not.toEqual(expect.objectContaining(customers[1]));
            expect(customer).not.toEqual(expect.objectContaining(customers[2]));
            expect(customer).not.toHaveProperty("password");
        });
    });
});
