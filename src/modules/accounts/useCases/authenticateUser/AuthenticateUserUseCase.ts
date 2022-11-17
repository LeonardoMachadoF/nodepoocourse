import 'dotenv/config';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../errors/AppError';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { UsersTokenRepository } from '../../infra/repositories/UsersTokenRepository';
import auth from '../../../../config/auth';
import { IDateProvider } from '../../../../shared/container/providers/DateProvider/IDateProvider';
import { IUsersTokenRepository } from '../../repositories/IUsersTokenRepository';

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
    refresh_token: string;
}

@injectable()
export class AuthenticateUserUseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        @inject('UsersTokenRepository')
        private usersTokenRepository: IUsersTokenRepository,
        @inject("DayjsDateProvider")
        private dayjsDateProvider: IDateProvider
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

        const token = sign({ email: user.email }, auth.secret_token, {
            subject: user.id,
            expiresIn: auth.expires_in_token
        });

        const refresh_token = sign({ email }, auth.secret_refresh_token, {
            subject: user.id, expiresIn: auth.expires_in_refresh_token
        })

        await this.usersTokenRepository.create({
            expires_date: this.dayjsDateProvider.addDays(auth.expires_in_refresh_token_days),
            refresh_token: refresh_token,
            user_id: user.id
        })

        return {
            user: {
                name: user.name,
                email: user.email
            },
            token,
            refresh_token
        }
    }
}