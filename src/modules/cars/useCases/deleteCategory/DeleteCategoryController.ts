import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteCategoriesUseCase } from "./DeleteCategoriesUseCase";

class DeleteCategoryController {
    handle(req: Request, res: Response) {
        let { name } = req.params;
        const deleteCategoriesUseCase = container.resolve(DeleteCategoriesUseCase);
        deleteCategoriesUseCase.execute({ name });
        res.send();
    }
}

export { DeleteCategoryController }