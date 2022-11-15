import { Repository } from "typeorm";
import { AppDataSource } from "../../../../shared/infra/typeorm";
import { Category } from "../typeorm/entities/Category";
import { ICategoriesRepository, ICreateCategoryDTO } from "../../repositories/ICategoriesRepository";

class CategoriesRepository implements ICategoriesRepository {
    private repository: Repository<Category>;

    constructor() {
        this.repository = AppDataSource.getRepository(Category);
    }

    async create({ name, description }: ICreateCategoryDTO): Promise<Category> {
        const category = this.repository.create({
            description, name
        })

        await this.repository.save(category);
        return category;
    };

    async list(): Promise<Category[]> {
        return await this.repository.find({});
    }

    async findByName(name: string): Promise<Category | null> {
        return await this.repository.findOne({ where: { name } });
    }

    async delete(name: string) {
        const categories = await this.repository.delete({ name })
    }
}

export { CategoriesRepository };