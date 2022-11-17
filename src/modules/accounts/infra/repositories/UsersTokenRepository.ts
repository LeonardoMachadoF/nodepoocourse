import { Repository } from "typeorm";
import { AppDataSource } from "../../../../shared/infra/typeorm";
import { IUsersTokenRepository } from "../../repositories/IUsersTokenRepository";
import { UserTokens } from "../typeorm/entities/UserTokens";

export class UsersTokenRepository implements IUsersTokenRepository {
    private repository: Repository<UserTokens>

    constructor() {
        this.repository = AppDataSource.getRepository(UserTokens);
    }
    async findByRefreshToken(refresh_token: string): Promise<UserTokens | null> {
        const userToken = await this.repository.findOne({
            where: {
                refresh_token
            }
        });

        return userToken
    }
    async deleteById(id: string): Promise<void> {
        await this.repository.delete(id)
    }

    async findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UserTokens | null> {
        const user = await this.repository.findOne({
            where: {
                user_id,
                refresh_token
            }
        })

        return user;
    }

    async findByUserId(user_id: string): Promise<UserTokens[]> {
        const users = await this.repository.find({
            where: { user_id }
        })

        return users;
    }

    async create({ expires_date, refresh_token, user_id }: ICreateUserTokenDTO): Promise<UserTokens> {
        const userToken = this.repository.create({
            expires_date,
            refresh_token,
            user_id
        });

        await this.repository.save(userToken);

        return userToken;
    }

}