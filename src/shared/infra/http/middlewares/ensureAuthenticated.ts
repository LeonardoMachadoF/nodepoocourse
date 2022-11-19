import 'dotenv/config';
import { verify } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { AppError } from '../../../../errors/AppError';
import auth from '../../../../config/auth';

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
        let { sub }: IPayload = verify(token, auth.secret_token) as IPayload;

        req.user = { id: sub };

        next();
    } catch {
        throw new AppError('Invalid token!', 401)
    }

} 