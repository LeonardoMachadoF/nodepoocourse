import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../infra/typeorm/entities/User";
import { IUsersRepository } from "../IUsersRepository";

export class UsersRepositoryInMemory implements IUsersRepository {
    users: User[] = [];

    async create({ name, email, password, driver_license }: ICreateUserDTO): Promise<void> {
        const user = new User();
        Object.assign(user, {
            name, email, password, driver_license
        })

        this.users.push(user)
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.users.find(user => user.email === email) || null;
    }

    async findAll(): Promise<User[]> {
        return this.users;
    }

    async findById(user_id: string): Promise<User | null> {
        return this.users.find(user => user.id === user_id) || null;
    }
}