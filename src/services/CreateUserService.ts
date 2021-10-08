import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";
import { AppError } from "../utils/errors";
import UserDTO from "../dto/UserDTO";
import IUserRepository from "../repositories/IUserRepository";
import User from "../entities/User";
import ICacheProvider from "../providers/ICacheProvider";

@injectable()
export default class CreateUserService {
    constructor(
        @inject("UserRepository")
        private userRepository: IUserRepository,

        @inject("CacheProvider")
        private cacheProvider: ICacheProvider
    ) { }

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
    }: UserDTO): Promise<Omit<User, "password">> {
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

        if (!isAdmin) {
            await this.cacheProvider.delPrefix("users:customers");
        }

        const { password: passwd, ...userWithoutPassword } = newUser;

        return userWithoutPassword;
    }
}
