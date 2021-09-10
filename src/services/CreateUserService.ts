import { getCustomRepository } from "typeorm";
import UserRepository from "../repositories/UserRepository";
import { hash } from "bcryptjs";

interface RequestDTO {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    birthdate?: Date,
    phoneNumber?: string,
    cpf?: string,
    zipCode?: string,
    isAdmin: boolean,
}

export default class CreateUserService {
    async execute({
        firstName,
        lastName,
        email,
        password,
        birthdate,
        phoneNumber,
        cpf,
        zipCode,
        isAdmin
    }: RequestDTO): Promise<Omit<RequestDTO, "password">> {
        const userRepository = getCustomRepository(UserRepository);

        const checkUserExists = await userRepository.findOne({ email });

        const passwordHash = await hash(password, 8)

        const newUser = userRepository.create({
            firstName,
            lastName,
            email,
            password: passwordHash,
            birthdate,
            phoneNumber,
            cpf,
            zipCode,
            isAdmin
        });

        await userRepository.save(newUser);

        const { password: passwd, ...userWithoutPassword } = newUser;

        return userWithoutPassword;
    }
}
