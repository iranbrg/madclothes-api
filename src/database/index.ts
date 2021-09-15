import { Connection, createConnection } from "typeorm";

class Database {
    public async connect(): Promise<Connection> {
        let connection;

        try {
            connection = await createConnection();
        } catch (err) {
            throw err;
        }

        console.log("Succesfully connected to the database");

        return connection;
    }
}

export default new Database();
