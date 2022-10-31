import { Request, Response } from "express";
import { container } from "tsyringe";
import { ImportCategoryUseCase } from "./ImportCategoryUseCase";

class ImportCategoryController {
    handle(req: Request, res: Response) {
        const { file } = req;

        const importCategoryUseCase = container.resolve(ImportCategoryUseCase);

        importCategoryUseCase.execute(file as Express.Multer.File);

        return res.status(201).send()
    }
}

export { ImportCategoryController }