import { AppDataSource } from "..";
import { v4 as uuid } from "uuid";
import { hash } from "bcrypt";


export const createSeed = async () => {
    let con = await AppDataSource.initialize();

    const id = uuid();
    const password = await hash('admin', 8);

    await con.query(`
        INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
        values('${id}', 'admin', 'admin@admin.com', '${password}', true, 'now()', 'XXXXXX')
    `);

    await con.destroy();
}
createSeed()