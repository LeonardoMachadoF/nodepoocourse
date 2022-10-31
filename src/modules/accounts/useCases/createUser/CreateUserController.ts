import { Request, Response } from "express";
import { container } from "tsyringe";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { CreateUserUseCase } from "./CreateUserUseCase";

export class CreateUserController {
    async handle(req: Request, res: Response): Promise<Response> {
        const { name, email, driver_license, password }: ICreateUserDTO = req.body;
        const createUserUseCase = container.resolve(CreateUserUseCase);

        await createUserUseCase.execute({
            name, email, driver_license, password
        })

        return res.status(201).send();
    }
}