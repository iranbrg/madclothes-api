import UserDTO from "../../src/dto/UserDTO";
import UserRepository from "../../src/repositories/fakes/UserRepository";
import CreateUserService from "../../src/services/CreateUserService";
import { AppError } from "../../src/utils/errors";

describe("CreateUserService", () => {
    let userRepository: UserRepository;
    let createUserService: CreateUserService;

    beforeEach(() => {
        userRepository = new UserRepository();
        createUserService = new CreateUserService(userRepository);
    });

    test("Should create a new user", async () => {
        const userData: UserDTO = {
            firstName: "John",
            lastName: "Doe",
            email: "jdoe@email.com",
            password: "bigboobs69",
            isAdmin: false
        };

        const user = await createUserService.execute(userData);

        const { password, ...matchUser } = userData;

        expect(user).toHaveProperty("id");
        expect(user).toMatchObject(matchUser);
    });

    test("Shouldn't create a user that already exists", async () => {
        const userData: UserDTO = {
            firstName: "John",
            lastName: "Doe",
            email: "jdoe@email.com",
            password: "bigboobs69",
            isAdmin: false
        };

        await createUserService.execute(userData);

        await expect(createUserService.execute(userData)).rejects.toEqual(
            new AppError("Email address already in use")
        );
    });

    test("Shouldn't create a new user with an already registered CPF", async () => {
        const userData: UserDTO = {
            firstName: "John",
            lastName: "Doe",
            email: "jdoe@email.com",
            password: "bigboobs69",
            cpf: "123876123",
            isAdmin: false
        };

        await createUserService.execute(userData);

        await expect(createUserService.execute(userData)).rejects.toEqual(
            new AppError("CPF already registered")
        );
    });
});
