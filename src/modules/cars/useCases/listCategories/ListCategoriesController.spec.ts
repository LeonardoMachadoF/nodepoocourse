import request from "supertest";
import { DataSource } from "typeorm";
import { app } from "../../../../shared/infra/http/app";
import { AppDataSource } from "../../../../shared/infra/typeorm";
import { v4 as uuid } from 'uuid'
import { hash } from "bcrypt";

let con: DataSource;

describe("Create Category Controller", () => {

    beforeAll(async () => {
        con = await AppDataSource.initialize();
        await con.runMigrations();

        const id = uuid();
        const password = await hash('admin', 8);

        await con.query(`
            INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
            values('${id}', 'admin', 'admin@admin.com', '${password}', true, 'now()', 'XXXXXX')
        `);
    })

    afterAll(async () => {
        await con.dropDatabase();
        await con.destroy();
    })

    it('should be able to list all categories', async () => {
        const responseToken = await request(app).post('/sessions')
            .send({
                email: 'admin@admin.com',
                password: 'admin'
            })

        const token = responseToken.body.token

        await request(app).post('/categories')
            .send({ name: 'Cat', description: 'Category Desc Teste list' })
            .set({ Authorization: `Bearer ${token}` })

        const response = await request(app).get('/categories');

        expect(response.body.all.length).toBe(1);
        expect(response.body.all[0]).toHaveProperty('id');
        expect(response.body.all[0].name).toEqual('Cat');
        expect(response.status).toBe(200);
    })
})   