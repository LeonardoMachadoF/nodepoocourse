import { Repository } from "typeorm";
import { AppDataSource } from "../../../../shared/infra/typeorm";
import { ICreateRentalDTO } from "../../dtos/ICreateRentalDTO";
import { IRentalsRepository } from "../../repositories/IRentalsRepository";
import { Rental } from "../typeorm/entities/Rental";


export class RentalsRepository implements IRentalsRepository {
    private repository: Repository<Rental>;

    constructor() {
        this.repository = AppDataSource.getRepository(Rental);
    }

    async findOpenRentalByCar(car_id: string): Promise<Rental | undefined> {
        return await this.repository.findOne({ where: { car_id } }) || undefined;
    }
    async findOpenRentalByUser(user_id: string): Promise<Rental | undefined> {
        return await this.repository.findOne({ where: { user_id } }) || undefined;
    }
    async create({ car_id, expected_return_date, user_id }: ICreateRentalDTO): Promise<Rental | undefined> {
        const rental = this.repository.create({ car_id, expected_return_date, user_id });

        await this.repository.save(rental);

        return rental;
    }
}