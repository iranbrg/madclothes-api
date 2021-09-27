import UserDTO from "../dto/UserDTO";
import User from "../entities/User";

export default interface IUserRepository {
    findAllCustomers(): Promise<User[]>
    findByEmail(email: string): Promise<User | undefined>;
    findByCPF(cpf: string): Promise<User | undefined>;
    findById(id: string): Promise<User | undefined>;
    create(userProps: UserDTO): Promise<User>;
}
