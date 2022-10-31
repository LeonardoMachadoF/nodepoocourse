import 'reflect-metadata';
import { DataSource } from "typeorm";
import { Category } from "../modules/cars/entities/Category";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "1234",
    database: "postgres",
    entities: [`./src/modules/**/entities/*.{ts,js}`],
    migrations: ["./src/database/migrations/*.ts"]
})



