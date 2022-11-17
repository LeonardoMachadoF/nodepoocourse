import 'dotenv/config';
import { verify } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { AppError } from '../../../../errors/AppError';
import { UsersTokenRepository } from '../../../../modules/accounts/infra/repositories/UsersTokenRepository';
import auth from '../../../../config/auth';

interface IPayload {
    sub: string;
}

export async function ensureAuthenticated(req: Request, response: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    const userTokensRepository = new UsersTokenRepository();
    if (!authHeader) {
        throw new AppError("Token missing", 401);
    };
    const [, token] = authHeader.split(" ");

    try {
        let { sub }: IPayload = verify(token, auth.secret_refresh_token) as IPayload;

        const user = await userTokensRepository.findByUserIdAndRefreshToken(sub, token);
        if (!user) {
            throw new AppError('User does not exists!', 401)
        };

        req.user = { id: sub };

        next();
    } catch {
        throw new AppError('Invalid token!', 401)
    }

} 