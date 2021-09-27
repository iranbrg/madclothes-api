import UserDTO from "../../src/dto/UserDTO";
import User from "../../src/entities/User";
import UserRepository from "../../src/repositories/fakes/UserRepository";
import GetCustomerService from "../../src/services/GetCustomerService";
import { AppError } from "../../src/utils/errors";

describe("GetCustomerService", () => {
    let userRepository: UserRepository;
    let getCustomerService: GetCustomerService;

    beforeEach(() => {
        userRepository = new UserRepository();
        getCustomerService = new GetCustomerService(userRepository);
    });

    test("Should get a customer without exposing his password", async () => {
        const customer1: UserDTO = {
            firstName: "John",
            lastName: "Doe",
            email: "jdoe@email.com",
            password: "bigboobs69",
            isAdmin: false
        };

        const customer2: UserDTO = {
            firstName: "Jane",
            lastName: "Doe",
            email: "janedoe@email.com",
            password: "bigboobs69",
            isAdmin: false
        };

        const admin: UserDTO = {
            firstName: "Mateo",
            lastName: "Doe",
            email: "mdoe@email.com",
            password: "bigboobs69",
            isAdmin: true
        };

        let users = [customer1, customer2, admin];

        users = await Promise.all(
            users.map(async user => userRepository.create(user))
        );

        const customer = await getCustomerService.execute({
            customerId: (users[0] as User).id
        });

        const usersWithoutPassword = users.map(user => {
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
        });

        expect(customer).toEqual(
            expect.objectContaining(usersWithoutPassword[0])
        );
        expect(customer).not.toHaveProperty("password");
        expect(customer).not.toEqual(expect.objectContaining(customer2));
        expect(customer).not.toEqual(expect.objectContaining(admin));
    });

    test("Shouldn't get a customer with an invalid id", async () => {
        const customerData: UserDTO = {
            firstName: "John",
            lastName: "Doe",
            email: "jdoe@email.com",
            password: "bigboobs69",
            isAdmin: false
        };

        await userRepository.create(customerData);

        const badId = String(Math.floor(Math.random() * 1000000));

        await expect(
            getCustomerService.execute({ customerId: badId })
        ).rejects.toEqual(new AppError("User not found"));
    });
});
