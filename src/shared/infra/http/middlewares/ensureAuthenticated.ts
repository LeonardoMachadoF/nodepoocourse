import 'dotenv/config';
import { verify } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { AppError } from '../../../../errors/AppError';
import { UsersRepository } from '../../../../modules/accounts/infra/repositories/UsersRepository';

interface IPayload {
    sub: string;
}

export async function ensureAuthenticated(req: Request, response: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        throw new AppError("Token missing", 401);
    };
    const [, token] = authHeader.split(" ");

    try {
        let { sub }: IPayload = verify(token, process.env.JSON_WEB_TOKEN_SECRET_KEY as string) as IPayload;


        const usersRepository = new UsersRepository();
        const user = await usersRepository.findById(sub);
        if (!user) {
            throw new AppError('User does not exists!', 401)
        };

        req.user = { id: sub };

        next();
    } catch {
        throw new AppError('Invalid token!', 401)
    }

} 