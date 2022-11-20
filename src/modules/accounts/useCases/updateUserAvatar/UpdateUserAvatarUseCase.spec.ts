import { container } from "tsyringe";
import { LocalStorageProvider } from "../../../../shared/container/providers/StorageProvider/implementations/LocalStorageProvider";
import { S3StorageProvider } from "../../../../shared/container/providers/StorageProvider/implementations/S3StorageProvider";
import { IStorageProvider } from "../../../../shared/container/providers/StorageProvider/IStorageProvider";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../infra/typeorm/entities/User";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { UpdateUserAvatarUseCase } from "./UpdateUserAvatarUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let updateUserAvatarUseCase: UpdateUserAvatarUseCase;
let createUserUseCase: CreateUserUseCase;
let storageProvider: IStorageProvider

describe('', () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        storageProvider = new LocalStorageProvider()
        updateUserAvatarUseCase = new UpdateUserAvatarUseCase(usersRepositoryInMemory, storageProvider);
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

