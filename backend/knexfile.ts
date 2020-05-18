require("dotenv-safe").config();

module.exports = {
    development: {
        client: process.env.DB_CONNECTION,
        connection: {
            charset: "utf8",
            timezone: "UTC",
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            database: process.env.DB_NAME,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            directory: "database/migrations",
            tableName: "migrations",
            stub: "database/stubs/migration.stub",
        },
        seeds: {
            directory: "database/seeds",
            stub: "database/stubs/seed.stub",
        },
    },
    production: {
        client: "pg",
        // The next line is where the application will read that environment variable to connect to the database
        connection: process.env.DATABASE_URL,
        migrations: {
            directory: __dirname + "/database/migrations",
        },
        seeds: {
            directory: __dirname + "/database/seeds/production",
        },
    },
    test: {
        client: process.env.DB_CLIENT,
        connection: {
            charset: "utf8",
            timezone: "UTC",
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            port: process.env.DB_PORT,
            password: process.env.DB_PASSWORD,
            database: process.env.TEST_DB_NAME,
        },
        migrations: {
            directory: "src/database/migrations",
            tableName: "migrations",
        },
        seeds: {
            directory: "src/database/seeds",
        },
    },
};
