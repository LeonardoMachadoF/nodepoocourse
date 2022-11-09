import { NextFunction, Request, Response } from "express";
import { AppError } from "../../../../errors/AppError";
import { UsersRepository } from "../../../../modules/accounts/infra/repositories/UsersRepository";

export async function ensureAdmin(req: Request, res: Response, next: NextFunction) {
    const { id } = req.user;

    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(id);

    if (!user?.isAdmin) {
        throw new AppError('User is not an admin!')
    };

    return next();
}