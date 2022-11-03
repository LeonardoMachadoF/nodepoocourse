import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../infra/typeorm/entities/User";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { UpdateUserAvatarUseCase } from "./UpdateUserAvatarUseCase";


let usersRepositoryInMemory: UsersRepositoryInMemory;
let updateUserAvatarUseCase: UpdateUserAvatarUseCase;
let createUserUseCase: CreateUserUseCase

describe('', () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        updateUserAvatarUseCase = new UpdateUserAvatarUseCase(usersRepositoryInMemory);
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory)
    })

    it('Should update the User Avatar', async () => {
        const user: ICreateUserDTO = {
            driver_license: '000123',
            email: "user@test.com",
            password: '1234',
            name: 'user test'
        };

        await createUserUseCase.execute(user);
        const newUser = await usersRepositoryInMemory.findByEmail(user.email);

        await updateUserAvatarUseCase.execute({ user_id: newUser!.id, avatarFile: './tmp/fakepath' })

        expect(newUser).toHaveProperty('avatar');
    })
})

