import { UserTokens } from "../../infra/typeorm/entities/UserTokens";
import { IUsersTokenRepository } from "../IUsersTokenRepository";

export class UsersTokensRepositoryInMemory implements IUsersTokenRepository {
    users: UserTokens[] = [];
    async create({ expires_date, refresh_token, user_id }: ICreateUserTokenDTO): Promise<UserTokens> {
        const userToken = new UserTokens();
        Object.assign(userToken, {
            expires_date, refresh_token, user_id
        })
        this.users.push(userToken)
        return userToken;
    }
    async findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UserTokens | null> {
        const userToken = this.users.find(ut => ut.user_id === user_id && ut.refresh_token === refresh_token);

        return userToken || null
    }
    async deleteById(id: string): Promise<void> {
        const userToken = this.users.find(ut => ut.id === id)
        this.users.splice(this.users.indexOf(userToken as UserTokens))
    }
    async findByRefreshToken(refresh_token: string): Promise<UserTokens | null> {
        const userToken = this.users.find(ut => ut.refresh_token === refresh_token);

        return userToken || null
    }

}