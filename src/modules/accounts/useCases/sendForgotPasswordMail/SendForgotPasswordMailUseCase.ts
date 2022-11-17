import { inject, injectable } from "tsyringe";
import { v4 as uuid } from "uuid";
import { AppError } from "../../../../errors/AppError";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { IMailProvider } from "../../../../shared/container/providers/MailProvider/IMailProvider";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IUsersTokenRepository } from "../../repositories/IUsersTokenRepository";
import { resolve } from 'path';

@injectable()
export class SendForgotPasswordMailUseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        @inject('UsersTokenRepository')
        private usersTokensRepositoy: IUsersTokenRepository,
        @inject("DayjsDateProvider")
        private dayjsDateProvider: IDateProvider,
        @inject("EtherealMailProvider")
        private mailProvider: IMailProvider
    ) { }

    async execute(email: string) {
        const user = await this.usersRepository.findByEmail(email);
        if (!user) {
            throw new AppError("User does not exists!")
        }

        const templatePath = resolve(__dirname, '..', '..', 'views', 'emails', 'forgotPassword.hbs')

        const token = uuid();
        const expires_date = this.dayjsDateProvider.addHours(3);

        const variables = {
            name: user.name,
            link: `${process.env.FORGOT_MAIL_URL}${token}`
        }

        await this.usersTokensRepositoy.create({
            user_id: user.id,
            refresh_token: token,
            expires_date
        })

        await this.mailProvider.sendMail(email, 'Recuperação de senha', variables, templatePath)
    }
} 