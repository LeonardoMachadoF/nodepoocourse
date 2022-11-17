import { Request, Response } from "express";
import { container } from "tsyringe";
import { RefreshTokenUseCase } from "./RefreshTokenUseCase";

export class RefreshTokenController {
    async handle(req: Request, res: Response): Promise<Response> {
        const token = req.headers["x-access-token"] || req.body.token;

        const refreshTokenUseCase = container.resolve(RefreshTokenUseCase);

        const refresh_token = await refreshTokenUseCase.execute(token as string);

        return res.json({ token: refresh_token });
    }
}