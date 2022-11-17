import 'reflect-metadata';
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: process.env.NODE_ENV === 'test' ? 5500 : 5000,
    username: "rentex",
    password: "1234",
    database: process.env.NODE_ENV === 'test' ? "rentx_test" : "rentx",
    entities: ['./src/modules/**/infra/typeorm/entities/*.{ts,js}'],
    migrations: ["./src/shared/infra/typeorm/migrations/*.ts"],
});