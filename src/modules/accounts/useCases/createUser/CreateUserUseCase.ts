import { hash } from 'bcrypt';
import { inject, injectable } from "tsyringe";
import { AppError } from '../../../../errors/AppError';
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
export class CreateUserUseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ) { }

    async execute({ name, email, driver_license, password }: ICreateUserDTO): Promise<void> {
        const passwordHash = await hash(password, 8);

        let userAlreadyExists = await this.usersRepository.findByEmail(email);
        if (userAlreadyExists) {
            throw new AppError('User already exists!')
        }

        await this.usersRepository.create({
            name, email, driver_license, password: passwordHash
        })
    }
};