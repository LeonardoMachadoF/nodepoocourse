import { Specification } from "../infra/typeorm/entities/Specification";

interface ICreateSpecificationDTO {
    name: string;
    description: string
}

interface ISpecificationsRepository {
    findByName(name: string): Promise<Specification | null>;
    create({ name, description }: ICreateSpecificationDTO): Promise<void>;
    findByIds(ids: string[]): Promise<Specification[]>
}

export { ISpecificationsRepository, ICreateSpecificationDTO }