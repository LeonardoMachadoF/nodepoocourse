import { IUserResponseDTO } from "../dtos/IUserResponseDTO";
import { User } from "../infra/typeorm/entities/User";
import { instanceToInstance } from 'class-transformer';

export class UserMap {
    static toDTO({ email, avatar, name, id, driver_license, avatar_url }: User): IUserResponseDTO {
        const user = instanceToInstance({
            email, avatar, name, id, driver_license, avatar_url
        })

        return user;
    }
}