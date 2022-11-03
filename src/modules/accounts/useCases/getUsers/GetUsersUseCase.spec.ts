import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../infra/typeorm/entities/User";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { GetUsersUseCase } from "./GetUsersUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let getUsersUseCase: GetUsersUseCase;
let createUserUseCase: CreateUserUseCase

describe('', () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        getUsersUseCase = new GetUsersUseCase(usersRepositoryInMemory);
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory)
    })

    it('Should list all Users', async () => {
        let users = 0;
        while (users < 10) {
            const user: ICreateUserDTO = {
                driver_license: '000123',
                email: `user${users}@test.com`,
                password: '1234',
                name: 'user test'
            };


            await createUserUseCase.execute(user);
            users++
        }


        let result = await getUsersUseCase.execute();
        expect(result).toHaveLength(10);
        expect(result[5]).toBeInstanceOf(User);
    })
})

