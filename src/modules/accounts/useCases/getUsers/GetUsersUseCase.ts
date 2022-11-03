import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
export class GetUsersUseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ) { }


    async execute() {
        let users = await this.usersRepository.findAll();

        return users;
    }
}