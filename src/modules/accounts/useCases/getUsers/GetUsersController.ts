import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetUsersUseCase } from "./GetUsersUseCase";

export class GetUsersController {
    async handle(req: Request, res: Response) {
        const getUsersUseCase = container.resolve(GetUsersUseCase);

        let response = await getUsersUseCase.execute();
        return res.json(response)
    }
}