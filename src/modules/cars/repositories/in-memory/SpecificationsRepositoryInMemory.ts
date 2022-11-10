import { Specification } from "../../infra/typeorm/entities/Specification";
import { ICreateSpecificationDTO, ISpecificationsRepository } from "../ISpecificationsRepository";

export class SpecificationsRepositoryInMemory implements ISpecificationsRepository {
    specifications: Specification[] = []

    async findByName(name: string): Promise<Specification | null> {
        return this.specifications.find(specification => specification.name === name) || null;
    }

    async create({ name, description }: ICreateSpecificationDTO): Promise<Specification> {
        const specification = new Specification();
        Object.assign(specification, {
            description, name
        })
        this.specifications.push(specification)
        return specification
    }

    async findByIds(ids: string[]): Promise<Specification[]> {
        const allSpecification = this.specifications.filter(specification => ids.includes(specification.id));

        return allSpecification
    }

}