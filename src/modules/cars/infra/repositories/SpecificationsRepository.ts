import { Repository } from "typeorm";
import { AppDataSource } from "../../../../shared/infra/typeorm";
import { Specification } from "../../infra/typeorm/entities/Specification";
import { ICreateSpecificationDTO, ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";


class SpecificationsRepository implements ISpecificationsRepository {
    private repository: Repository<Specification>;

    constructor() {
        this.repository = AppDataSource.getRepository(Specification);
    }

    async findByName(name: string): Promise<Specification | null> {
        return await this.repository.findOne({ where: { name } });
    }

    async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
        const specification = this.repository.create({ name, description });

        await this.repository.save(specification);
    }
};

export { SpecificationsRepository };