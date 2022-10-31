import { Category } from "../entities/Category";

interface ICreateCategoryDTO {
    name: string;
    description: string
}

interface ICategoriesRepository {
    findByName(name: string): Promise<Category | null>;
    list(): Promise<Category[]>;
    create({ name, description }: ICreateCategoryDTO): void;
}

export { ICategoriesRepository, ICreateCategoryDTO }