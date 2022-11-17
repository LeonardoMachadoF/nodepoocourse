import { UserTokens } from "../infra/typeorm/entities/UserTokens";

export interface IUsersTokenRepository {
    create({ expires_date, refresh_token, user_id }: ICreateUserTokenDTO): Promise<UserTokens>;
    findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UserTokens | null>;
    deleteById(id: string): Promise<void>;
    findByRefreshToken(refresh_token: string): Promise<UserTokens | null>;
}