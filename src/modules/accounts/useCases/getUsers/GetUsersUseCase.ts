import { inject, injectable } from "tsyringe";
import { UsersRepository } from "../../repositories/implementations/UsersRepository";

@injectable()
export class GetUsersUseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepository: UsersRepository
    ) { }


    async execute() {
        let users = await this.usersRepository.findAll();

        return users;
    }
}