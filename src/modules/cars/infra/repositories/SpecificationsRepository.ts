import { In, Repository } from "typeorm";
import { AppDataSource } from "../../../../shared/infra/typeorm";
import { Specification } from "../../infra/typeorm/entities/Specification";
import { ICreateSpecificationDTO, ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";


class SpecificationsRepository implements ISpecificationsRepository {
    private repository: Repository<Specification>;

    constructor() {
        this.repository = AppDataSource.getRepository(Specification);
    }

    async findByIds(ids: string[]): Promise<Specification[]> {
        const specifications = await this.repository.findBy({ id: In(ids) })
        return specifications;
    }

    async findByName(name: string): Promise<Specification | null> {
        return await this.repository.findOne({ where: { name } });
    }

    async create({ name, description }: ICreateSpecificationDTO): Promise<Specification> {
        const specification = this.repository.create({ name, description });

        await this.repository.save(specification);

        return specification
    }
};

export { SpecificationsRepository };