import { AppError } from "../../../../errors/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"

let usersRepositoryInMemory: UsersRepositoryInMemory;
let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory);
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory)
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