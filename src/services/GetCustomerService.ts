import { inject, injectable } from "tsyringe";
import CustomerRequestDTO from "../dto/CustomerRequestDTO";
import User from "../entities/User";
import IUserRepository from "../repositories/IUserRepository";
import { HTTP } from "../utils/constants";
import { AppError } from "../utils/errors";

@injectable()
export default class GetCustomerService {
    constructor(
        @inject("UserRepository")
        private userRepository: IUserRepository
    ) {}

    public async execute({
        customerId
    }: CustomerRequestDTO): Promise<Omit<User, "password">> {
        const customer = await this.userRepository.findById(customerId);

        if (!customer) {
            throw new AppError("User not found", HTTP.NotFound);
        }

        const { password, ...customerWithoutPassword } = customer;

        return customerWithoutPassword;
    }
}
