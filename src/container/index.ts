import { container } from "tsyringe";

import UserRepository from "../repositories/implementations/UserRepository";
import IUserRepository from "../repositories/IUserRepository";

import ICacheProvider from "../providers/ICacheProvider";
import RedisCacheProvider from "../providers/implementations/RedisCacheProvider";

container.registerSingleton<IUserRepository>("UserRepository", UserRepository);

container.registerSingleton<ICacheProvider>("CacheProvider", RedisCacheProvider);
