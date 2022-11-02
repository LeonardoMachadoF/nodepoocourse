import 'reflect-metadata';
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5000,
    username: "rentex",
    password: "1234",
    database: "rentx",
    entities: [`./src/modules/**/entities/*.{ts,js}`],
    migrations: ["./src/database/migrations/*.ts"]
})



