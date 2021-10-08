import Redis, { RedisOptions, Redis as RedisClient } from "ioredis";
import ICacheProvider from "../ICacheProvider";

export default class RedisCacheProvider implements ICacheProvider {
    private redis: RedisClient;

    constructor() {
        this.redis = new Redis({
            port: process.env.REDIS_PORT,
            host: process.env.REDIS_HOST,
            password: process.env.REDIS_PASSWORD,
        } as RedisOptions);
    }

    public async set(key: string, value: any): Promise<void> {
        await this.redis.set(key, JSON.stringify(value));
    }

    public async get<T>(key: string): Promise<T | null> {
        const value = await this.redis.get(key);

        if (!value)
            return null;

        const parsedValue: T = JSON.parse(value);

        return parsedValue;
    }

    public async del(key: string): Promise<void> {
        await this.redis.del(key);
    }

    public async delPrefix(prefix: string): Promise<void> {
        const keys = await this.redis.keys(`${prefix}*`);
        const pipeline = this.redis.pipeline();

        keys.forEach(key => pipeline.del(key));

        await pipeline.exec();
    }
}
