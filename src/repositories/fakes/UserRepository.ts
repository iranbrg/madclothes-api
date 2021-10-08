import User from "../../entities/User";
import IUserRepository from "../IUserRepository";
import UserDTO from "../../dto/UserDTO";

export default class UserRepository implements IUserRepository {
    private users: User[] = [];

    public async countCustomers(): Promise<number> {
        return this.users.reduce(counter => ++counter, 0);
    }

    public async findAllCustomers(): Promise<User[]> {
        return this.users.filter(user => !user.isAdmin);
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        return this.users.find(user => user.email === email);
    }

    public async findByCPF(cpf: string): Promise<User | undefined> {
        return this.users.find(user => user.cpf === cpf);
    }

    public async findById(id: string): Promise<User | undefined> {
        return this.users.find(user => user.id === id);
    }

    public async create(userProps: UserDTO): Promise<User> {
        const user = new User();
        Object.assign(
            user,
            { id: Math.floor(Math.random() * 1000000) },
            userProps
        );

        this.users.push(user);

        return user;
    }
}
