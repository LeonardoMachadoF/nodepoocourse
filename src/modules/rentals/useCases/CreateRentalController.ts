import { container } from "tsyringe";
import { Request, Response } from "express";
import { CreateRentalUseCase } from "./CreateRentalUseCase";

export class CreateRentalController {
    async handle(req: Request, res: Response): Promise<Response> {
        const { id } = req.user;
        const { car_id, expected_return_date } = req.body;
        const createRentalUseCase = container.resolve(CreateRentalUseCase);

        const rental = await createRentalUseCase.execute({
            car_id,
            expected_return_date,
            user_id: id
        })

        return res.status(201).json({ rental });
    }
}