import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { UsersRepository } from "../../repositories/implementations/UsersRepository";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: {
        name: string;
        email: string;
    },
    token: string;
}

@injectable()
export class AuthenticateUserUseCase {
    constructor(
        @inject(UsersRepository)
        private usersRepository: IUsersRepository
    ) { }

    async execute({ email, password }: IRequest): Promise<IResponse> {
        const user = await this.usersRepository.findByEmail(email);
        if (!user) {
            throw new AppError('Email or password Incorrect!')
        };

        const passwordMatch = await compare(password, user.password);
        if (!passwordMatch) {
            throw new AppError('Email or password Incorrect!')
        };

        const token = sign({ email: user.email }, process.env.JSON_WEB_TOKEN_SECRET_KEY as string, {
            subject: user.id,
            expiresIn: '1d'
        });

        return {
            user: {
                name: user.name,
                email: user.email
            },
            token
        }
    }
}