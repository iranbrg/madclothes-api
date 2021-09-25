import { container } from "tsyringe";
import UserRepository from "../repositories/implementations/UserRepository";
import IUserRepository from "../repositories/IUserRepository";

container.registerSingleton<IUserRepository>("UserRepository", UserRepository);
