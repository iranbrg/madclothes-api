import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";
import { AppError } from "../utils/errors";
import UserDTO from "../dto/UserDTO";
import IUserRepository from "../repositories/IUserRepository";

@injectable()
export default class CreateUserService {
    constructor(
        @inject("UserRepository")
        private userRepository: IUserRepository
    ) {}

    public async execute({
        firstName,
        lastName,
        email,
        password,
        birthdate,
        phoneNumber,
        cpf,
        zipCode,
        isAdmin
    }: UserDTO): Promise<Omit<UserDTO, "password">> {
        const isCPFInUse = cpf
            ? await this.userRepository.findByCPF(cpf)
            : null;

        if (isCPFInUse && isCPFInUse.cpf === cpf) {
            throw new AppError("CPF already registered");
        }

        const isEmailInUse = await this.userRepository.findByEmail(email);

        if (isEmailInUse) {
            throw new AppError("Email address already in use");
        }

        const passwordHash = await hash(password, 8);

        const newUser = await this.userRepository.create({
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

        const { password: passwd, ...userWithoutPassword } = newUser;

        return userWithoutPassword;
    }
}
