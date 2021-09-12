import { getCustomRepository } from "typeorm";
import UserRepository from "../repositories/UserRepository";
import { hash } from "bcryptjs";
import { AppError } from "../utils/errors";

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

        const isEmailInUse = await userRepository.findOne({ email });
        const isCPFInUse = await userRepository.findOne({ cpf });

        if (isCPFInUse && isCPFInUse.cpf === cpf) {
            throw new AppError("CPF already registerd");
        }

        if (isEmailInUse) {
            throw new AppError("Email address already in use");
        }

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
