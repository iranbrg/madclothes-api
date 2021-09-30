import { inject, injectable } from "tsyringe";
import PaginationDTO from "../dto/PaginationDTO";
import User from "../entities/User";
import IUserRepository from "../repositories/IUserRepository";

type CustomersWithoutPassword = Omit<User, "password">[];

@injectable()
export default class ListCustomersService {
    constructor(
        @inject("UserRepository")
        private userRepository: IUserRepository
    ) {}

    public async execute({
        limit,
        page
    }: PaginationDTO): Promise<CustomersWithoutPassword> {
        const customers = await this.userRepository.findAllCustomers(
            limit,
            page
        );

        const customersWithoutPassword = customers.map(customer => {
            const { password, ...customerWithoutPassword } = customer;
            return customerWithoutPassword;
        });

        return customersWithoutPassword;
    }
}
