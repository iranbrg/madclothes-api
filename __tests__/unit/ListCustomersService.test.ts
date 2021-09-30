import UserDTO from "../../src/dto/UserDTO";
import UserRepository from "../../src/repositories/fakes/UserRepository";
import ListCustomersService from "../../src/services/ListCustomersService";

describe("ListCustomersService", () => {
    let userRepository: UserRepository;
    let listCustomersService: ListCustomersService;

    beforeEach(() => {
        userRepository = new UserRepository();
        listCustomersService = new ListCustomersService(userRepository);
    });

    test("Should list all registered customers without exposing their passwords", async () => {
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

        const users = [customer1, customer2, admin];

        await Promise.all(users.map(async user => userRepository.create(user)));

        const customers = await listCustomersService.execute({ limit: 10, page: 1 });

        const usersWithoutPassword = users.map(user => {
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
        });

        expect(customers).toEqual(
            expect.arrayContaining([
                expect.objectContaining(usersWithoutPassword[0]),
                expect.objectContaining(usersWithoutPassword[1])
            ])
        );
        expect(customers).not.toEqual(
            expect.arrayContaining([
                expect.objectContaining(usersWithoutPassword[2])
            ])
        );
        expect(customers).toEqual(
            expect.arrayContaining([
                expect.not.objectContaining({ password: customer1.password }),
                expect.not.objectContaining({ password: customer2.password })
            ])
        );
    });
});
