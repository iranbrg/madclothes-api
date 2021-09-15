import User from "../../entities/User";
import IUserRepository from "../IUserRepository";
import UserDTO from "../../dto/UserDTO";

export default class UserRepository implements IUserRepository {
    public async findByEmail(email: string): Promise<User | undefined> {
        return User.findOne({ email });
    }

    public async findByCPF(cpf: string): Promise<User | undefined> {
        return User.findOne({ cpf });
    }

    public async create(userProps: UserDTO): Promise<User> {
        const user = User.create(userProps);
        return User.save(user);
    }
}
