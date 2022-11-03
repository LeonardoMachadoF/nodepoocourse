import { Repository } from "typeorm";
import { AppDataSource } from "../../../../shared/infra/typeorm";
import { ICarsRepository } from "../../repositories/ICarsRepository";
import { Car } from "../typeorm/entities/Car";

export class CarsRepository implements ICarsRepository {
    private repository: Repository<Car>;

    constructor() {
        this.repository = AppDataSource.getRepository(Car);
    }

    async create({ brand, category_id, daily_rate, description, fine_amount, license_plate, name }: ICreateCarDTO): Promise<Car> {
        let newCar = this.repository.create({ name, brand, category_id, daily_rate, description, fine_amount, license_plate })
        await this.repository.save(newCar);
        return newCar;

    }
    async findByLicensePlate(license_plate: string): Promise<null | Car> {
        let car = await this.repository.findOne({ where: { license_plate } });
        return car;
    }
}