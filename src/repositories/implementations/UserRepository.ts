import User from "../../entities/User";
import IUserRepository from "../IUserRepository";
import UserDTO from "../../dto/UserDTO";
import { getRepository, Repository } from "typeorm";

export default class UserRepository implements IUserRepository {
    private userRepository: Repository<User> = getRepository(User);

    public async findByEmail(email: string): Promise<User | undefined> {
        return this.userRepository.findOne({ email });
    }

    public async findByCPF(cpf: string): Promise<User | undefined> {
        return this.userRepository.findOne({ cpf });
    }

    public async create(userProps: UserDTO): Promise<User> {
        const user = new User();
        Object.assign(user, userProps);
        return this.userRepository.save(user);
    }
}
