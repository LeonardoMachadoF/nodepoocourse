import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IUsersTokenRepository } from "../../repositories/IUsersTokenRepository";

interface IRequest {
    token: string;
    password: string;
}

injectable()
export class ResetPasswordUserUseCase {
    constructor(
        @inject('UsersTokenRepository')
        private usersTokenRepository: IUsersTokenRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider,
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) { }

    async execute({ token, password }: IRequest) {
        const userToken = await this.usersTokenRepository.findByRefreshToken(token);
        if (!userToken) {
            throw new AppError("Invalid token")
        }
        if (this.dateProvider.compareIfBefore(userToken.expires_date, this.dateProvider.dateNow())) {
            throw new AppError("Token expired!")
        }

        const user = await this.usersRepository.findById(userToken.user_id);
        if (!user) {
            throw new AppError("Invalid token")
        }

        user.password = await hash(password, 8);

        await this.usersRepository.create(user);

        await this.usersTokenRepository.deleteById(userToken.id)
    }
}