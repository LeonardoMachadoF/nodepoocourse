import { AppError } from "../../../../errors/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "./CreateUserUseCase";

let usersRepository: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {
    beforeEach(() => {
        usersRepository = new UsersRepositoryInMemory();
        createUserUseCase = new CreateUserUseCase(usersRepository);
    })

    it('Should be able to create a User', async () => {
        const user: ICreateUserDTO = {
            driver_license: '000123',
            email: "user@test.com",
            password: '1234',
            name: 'user test'
        };

        await createUserUseCase.execute(user);

        let result = await usersRepository.findByEmail(user.email);

        expect(result).toHaveProperty('id');
    })

    it('Should not be able to create a User with existing email', async () => {
        const user: ICreateUserDTO = {
            driver_license: '000123',
            email: "user@test.com",
            password: '1234',
            name: 'user test'
        };

        await createUserUseCase.execute(user);

        expect(async () => {
            await createUserUseCase.execute(user);
        }).rejects.toBeInstanceOf(AppError);
    })
})