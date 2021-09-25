module.exports = {
    type: "postgres",
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    logging: process.env.NODE_ENV !== "test",
    entities: [process.env.TYPEORM_ENTITIES],
    migrations: [process.env.TYPEORM_MIGRATIONS],
    "ssl": {
        "rejectUnauthorized": false
    },
    cli: {
        entitiesDir: "src/entities",
        migrationsDir: "src/database/migrations"
    }
};
