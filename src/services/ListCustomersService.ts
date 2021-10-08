import { inject, injectable } from "tsyringe";
import User from "../entities/User";
import ICacheProvider from "../providers/ICacheProvider";
import IUserRepository from "../repositories/IUserRepository";

@injectable()
export default class ListCustomersService {
    constructor(
        @inject("UserRepository")
        private userRepository: IUserRepository,

        @inject("CacheProvider")
        private cacheProvider: ICacheProvider
    ) { }

    public async execute(): Promise<Omit<User, "password">[]> {
        let customers = await this.cacheProvider.get<User[]>("users:customers");

        if (!customers) {
            customers = await this.userRepository.findAllCustomers();

            await this.cacheProvider.set("users:customers", customers);
        }

        const customersWithoutPassword = customers.map(customer => {
            const { password, ...customerWithoutPassword } = customer;
            return customerWithoutPassword;
        });

        return customersWithoutPassword;
    }
}
