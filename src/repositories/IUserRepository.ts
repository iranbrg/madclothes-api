import UserDTO from "../dto/UserDTO";
import User from "../entities/User";

export default interface IUserRepository {
    findByEmail(email: string): Promise<User | undefined>;
    findByCPF(cpf: string): Promise<User | undefined>;
    create(userProps: UserDTO): Promise<User>;
}
