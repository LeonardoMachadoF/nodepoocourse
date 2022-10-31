import { Repository } from "typeorm";
import { AppDataSource } from "../../../../database";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
    private repository: Repository<User>;

    constructor() {
        this.repository = AppDataSource.getRepository(User);
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = await this.repository.findOne({ where: { email } })
        return user;
    }

    async create({ name, email, driver_license, password }: ICreateUserDTO): Promise<void> {
        const user = this.repository.create({
            name, email, driver_license, password
        });
        await this.repository.save(user);
    }
}

export { UsersRepository }