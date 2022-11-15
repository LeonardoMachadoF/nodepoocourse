import { Category } from "../../infra/typeorm/entities/Category";
import { ICategoriesRepository, ICreateCategoryDTO } from "../ICategoriesRepository";

export class CategoriesRepositoryInMemory implements ICategoriesRepository {
    categories: Category[] = [];

    async findByName(name: string): Promise<Category | null> {
        const category = this.categories.find(category => category.name === name);
        if (!category) {
            return null;
        }
        return category;
    }
    async list(): Promise<Category[]> {
        const categories = this.categories;

        return categories;
    }
    async create({ name, description }: ICreateCategoryDTO): Promise<Category> {
        const category = new Category();

        Object.assign(category, { name, description });

        this.categories.push(category);

        return category
    }
}