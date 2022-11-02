import { inject, injectable } from "tsyringe";
import { User } from "../../entities/User";
import { UsersRepository } from "../../repositories/implementations/UsersRepository";

interface IRequest {
    user_id: string;
    avatarFile: string;
}

@injectable()
export class UpdateUserAvatarUseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepository: UsersRepository
    ) { }
    async execute({ user_id, avatarFile }: IRequest): Promise<void> {
        const user = await this.usersRepository.findById(user_id);
        user!.avatar = avatarFile;

        await this.usersRepository.create(user as User);
    }
}