import { sign, verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import auth from "../../../../config/auth";
import { AppError } from "../../../../errors/AppError";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { DayjsDateProvider } from "../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { IUsersTokenRepository } from "../../repositories/IUsersTokenRepository";

interface IPayload {
    sub: string;
    email: string;
}

interface ITokenResponse {
    refresh_token: string;
    token: string;
}

@injectable()
export class RefreshTokenUseCase {
    constructor(
        @inject("UsersTokenRepository")
        private usersTokenRepository: IUsersTokenRepository,
        @inject("DayjsDateProvider")
        private dayjsDateProvider: IDateProvider
    ) { }

    async execute(token: string): Promise<ITokenResponse> {
        const decode = verify(token, auth.secret_refresh_token) as IPayload;
        const user_id = decode.sub;

        const userToken = await this.usersTokenRepository.findByUserIdAndRefreshToken(user_id, token);

        if (!userToken) {
            throw new AppError("Refresh token does'n exists.")
        }

        await this.usersTokenRepository.deleteById(userToken.id)

        const refresh_token = sign({ email: decode.email }, auth.secret_refresh_token, {
            subject: decode.sub, expiresIn: auth.expires_in_refresh_token
        })

        await this.usersTokenRepository.create({
            expires_date: this.dayjsDateProvider.addDays(auth.expires_in_refresh_token_days),
            refresh_token,
            user_id
        })

        const newToken = sign({ email: decode.email }, auth.secret_token, {
            subject: user_id,
            expiresIn: auth.expires_in_token
        });

        return { refresh_token, token: newToken }
    }
}