import { inject, injectable } from "tsyringe";
import User from "../entities/User";
import IUserRepository from "../repositories/IUserRepository";

@injectable()
export default class ListCustomersService {
    constructor(
        @inject("UserRepository")
        private userRepository: IUserRepository
    ) { }

    public async execute(): Promise<Omit<User, "password">[]> {
        const customers = await this.userRepository.findAllCustomers();

        const customersWithoutPassword = customers.map(customer => {
            const { password, ...customerWithoutPassword } = customer;
            return customerWithoutPassword
        });

        return customersWithoutPassword;
    }
}
