import { AppError } from "../../../../errors/AppError";
import { DayjsDateProvider } from "../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "../../../../shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory"
import { UsersTokensRepositoryInMemory } from "../../repositories/in-memory/UsersTokensRepositoryInMemory";
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase"

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase
let usersRepositoryInMemory: UsersRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let mailProvider: MailProviderInMemory


describe("send forgot mail", () => {
    beforeEach(() => {
        dateProvider = new DayjsDateProvider()
        mailProvider = new MailProviderInMemory()
        usersRepositoryInMemory = new UsersRepositoryInMemory()
        usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory()
        sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
            usersRepositoryInMemory,
            usersTokensRepositoryInMemory,
            dateProvider,
            mailProvider
        )
    })


    it('should be able to send forgot password mail to user', async () => {
        const sendMail = jest.spyOn(mailProvider, 'sendMail');

        await usersRepositoryInMemory.create({
            driver_license: '6666344',
            email: 'dasikhda@gmail.com',
            name: 'dasijdas dasda',
            password: 'myspecialpassword'
        })

        await sendForgotPasswordMailUseCase.execute('dasikhda@gmail.com')

        expect(sendMail).toHaveBeenCalled();
    })

    it('should not be able to send forgot password mail to an unexistent user', async () => {
        await expect(
            sendForgotPasswordMailUseCase.execute('nonexistent@gmail.com')
        ).rejects.toEqual(new AppError("User does not exists!"))
    })

    it('should not be able to create an user token', async () => {
        const generateTokenMail = jest.spyOn(usersRepositoryInMemory, 'create');

        await usersRepositoryInMemory.create({
            driver_license: '666344',
            email: 'ttestes@gmail.com',
            name: 'dasidas dasda',
            password: 'mysecialpassword'
        })

        await sendForgotPasswordMailUseCase.execute('ttestes@gmail.com')

        expect(generateTokenMail).toHaveBeenCalled();
    })
})