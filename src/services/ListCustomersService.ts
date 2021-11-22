import { inject, injectable } from "tsyringe";
import PaginationDTO from "../dto/PaginationDTO";
import User from "../entities/User";
import ICacheProvider from "../providers/ICacheProvider";
import IUserRepository from "../repositories/IUserRepository";
import paginate from "../utils/pagination";

type CustomersWithoutPassword = Omit<User, "password">[];

@injectable()
export default class ListCustomersService {
    constructor(
        @inject("UserRepository")
        private userRepository: IUserRepository,

        @inject("CacheProvider")
        private cacheProvider: ICacheProvider
    ) { }

    public async execute({
        limit,
        page
    }: PaginationDTO): Promise<CustomersWithoutPassword> {
        let customers = await this.cacheProvider.get<User[]>("users:customers");

        if (!customers) {
            customers = await this.userRepository.findAllCustomers(
            );

            await this.cacheProvider.set("users:customers", customers);
        }

        const customersWithoutPassword = customers.map(customer => {
            const { password, ...customerWithoutPassword } = customer;
            return customerWithoutPassword;
        });

        console.log(customers);

        const paginatedResult = paginate(limit, page, customersWithoutPassword);

        console.log(paginatedResult);
        return paginatedResult;
    }
}
