import { getRepository, Repository } from "typeorm";
import User from "../../entities/User";
import IUserRepository from "../IUserRepository";
import UserDTO from "../../dto/UserDTO";

export default class UserRepository implements IUserRepository {
    private userRepository: Repository<User>;

    constructor() {
        this.userRepository = getRepository(User);
    }

    public async countCustomers(): Promise<number> {
        return this.userRepository.count({ isAdmin: false });
    }

    public async findAllCustomers(): Promise<User[]> {
        return this.userRepository.find({
            where: { isAdmin: false },
        });
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        return this.userRepository.findOne({ email });
    }

    public async findByCPF(cpf: string): Promise<User | undefined> {
        return this.userRepository.findOne({ cpf });
    }

    public async findById(id: string): Promise<User | undefined> {
        return this.userRepository.findOne({ id });
    }

    public async create(userProps: UserDTO): Promise<User> {
        const user = new User();
        Object.assign(user, userProps);
        return this.userRepository.save(user);
    }
}
