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
    async findById(user_id: string): Promise<User | null> {
        const user = await this.repository.findOne({ where: { id: user_id } });
        return user;
    }
    async findAll(): Promise<User[]> {
        const users = await this.repository.find({ select: { id: true, name: true, email: true, driver_license: true, created_at: true, isAdmin: false } });
        return users;
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = await this.repository.findOne({ where: { email } })
        return user;
    }

    async create({ name, email, driver_license, password, id, avatar }: ICreateUserDTO): Promise<void> {
        const user = this.repository.create({
            name, email, driver_license, password, avatar, id
        });
        await this.repository.save(user);
    }
}

export { UsersRepository }