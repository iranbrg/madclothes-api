import { Connection, createConnection, getConnection } from "typeorm";

class Database {
    public async connect(): Promise<Connection> {
        return createConnection();
    }

    public async close(): Promise<void> {
        await this.getConnection().close();
    }

    public getConnection(): Connection {
        return getConnection();
    }

    public async truncate(): Promise<void> {
        const connection = this.getConnection();
        const entities = connection.entityMetadatas;

        for (const entity of entities) {
            const repository = connection.getRepository(entity.name);
            await repository.clear();
        }
    }
}

export default new Database();
