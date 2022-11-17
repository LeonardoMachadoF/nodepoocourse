import { AppError } from "../../../../errors/AppError";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { DayjsDateProvider } from "../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "../../repositories/in-memory/UsersTokensRepositoryInMemory";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"

let dateProvider: DayjsDateProvider;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {
    beforeEach(() => {
        dateProvider = new DayjsDateProvider()
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory)
        usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
        authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory, usersTokensRepositoryInMemory, dateProvider);
    })

    it("Should be able to authenticate an user", async () => {
        const user: ICreateUserDTO = {
            driver_license: '000123',
            email: "user@test.com",
            password: '1234',
            name: 'user test'
        };

        await createUserUseCase.execute(user);

        let result = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password
        });

        expect(result).toHaveProperty('token');
    })

    it("Should not be able to authenticate an nonexistent user", async () => {
        await expect(async () => {
            await authenticateUserUseCase.execute({
                email: 'false@email.com',
                password: '1234'
            });
        }).rejects.toBeInstanceOf(AppError);
    })

    it("Should not be able to authenticate with incorrect password", async () => {
        await expect(async () => {
            const user: ICreateUserDTO = {
                driver_license: '999999',
                email: "user@test.com",
                password: '1234',
                name: 'user test error'
            };

            await createUserUseCase.execute(user);

            await authenticateUserUseCase.execute({
                email: user.email,
                password: 'wrongPassword'
            });
        }).rejects.toBeInstanceOf(AppError);
    })
})