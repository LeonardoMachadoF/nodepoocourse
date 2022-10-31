import { inject, injectable } from "tsyringe";
import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";

interface IRequest {
    name: string;
}

@injectable()
class DeleteCategoriesUseCase {
    constructor(
        @inject('CategoriesRepository')
        private categoriesRepository: CategoriesRepository) { }

    execute({ name }: IRequest) {
        let category = this.categoriesRepository.findByName(name);
        if (!category) {
            throw new Error('Categoria inexistente!')
        };
        this.categoriesRepository.delete(name);
    }
}

export { DeleteCategoriesUseCase }