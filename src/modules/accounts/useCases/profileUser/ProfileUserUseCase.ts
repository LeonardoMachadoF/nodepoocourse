import { inject, injectable } from "tsyringe";
import { IUserResponseDTO } from "../../dtos/IUserResponseDTO";
import { User } from "../../infra/typeorm/entities/User";
import { UserMap } from "../../mapper/UserMap";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
export class ProfileUserUseCase {
    constructor(
        @inject("UsersRepository")
        private userRepository: IUsersRepository
    ) { }

    async execute(id: string): Promise<IUserResponseDTO> {
        const user = await this.userRepository.findById(id);

        return UserMap.toDTO(user as User);
    }
}